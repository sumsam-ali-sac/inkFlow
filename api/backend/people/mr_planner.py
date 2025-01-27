from langchain_core.messages import HumanMessage, SystemMessage
from ..graph_components.state import BlogState, Sections
from langchain_core.runnables import RunnableConfig
from langchain.output_parsers import PydanticOutputParser
from ..graph_components import configuration as dynamic_configuration
from ..graph_components.prompts import blogPlannerInstructions
from ..graph_components.llm import llm


class MrPlanner:
    def __init__(self):
        pass

    def run(self, blog: BlogState, config: RunnableConfig) -> None:
        configurable = dynamic_configuration.Configuration.from_runnable_config(config)
        system_prompt = blogPlannerInstructions.format(
            userInstructions=blog.title,
            blogStructure=configurable.blog_structure,
            sources=blog.sources,
            images=blog.images,
        )
        parser = PydanticOutputParser(pydantic_object=Sections)
        response = llm.invoke(
            [
                SystemMessage(
                    content=system_prompt
                ),  # System message with the system prompt
                HumanMessage(
                    content=(
                        "Generate the sections of the blog. Your response must include a 'sections' field containing "
                        "a list of sections. Each section should have the following fields: "
                        f"{parser.get_format_instructions()}"
                    )
                ),
            ]
        )

        blog_sections = parser.invoke(response)
        # print(sections)
        return {"sections": blog_sections.sections}
