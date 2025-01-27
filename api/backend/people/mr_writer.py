from langgraph.types import Send
from langchain_core.messages import HumanMessage, SystemMessage
from ..graph_components.state import BlogState, SectionState
from langchain_core.runnables import RunnableConfig
from langchain.output_parsers import PydanticOutputParser
from ..graph_components import configuration as dynamic_configuration
from ..graph_components.prompts import (
    mainBodySectionWriterInstructions,
    introConclusionInstructions,
)
from ..graph_components.llm import llm


class MrWriter:
    def __init__(self):
        pass

    def write_main(self, state: SectionState):
        section = state.section
        system_instructions = mainBodySectionWriterInstructions.format(
            sectionName=section.name,
            sectionDescription=section.description,
            title=state.title,
            sources=state.sources,
            imageUrl=section.image,
        )
        section_content = llm.invoke(
            [SystemMessage(content=system_instructions)]
            + [
                HumanMessage(
                    content="Generate a blog section based on the provided information."
                )
            ]
        ).content
        section.content = section_content
        return {"finalized_sections": [section]}

    def write_not_main(self, state: SectionState):
        section = state.section

        system_instructions = introConclusionInstructions.format(
            sectionName=section.name,
            sectionDescription=section.description,
            title=state.title,
            mainBodySections=state.main_sections,
            sources=state.sources,
            imageUrl=section.image,
        )

        section_content = llm.invoke(
            [SystemMessage(content=system_instructions)]
            + [
                HumanMessage(
                    content="Generate a blog section based on the provided information."
                )
            ]
        ).content

        section.content = section_content
        return {"finalized_sections": [section]}
