from langgraph.graph import StateGraph, START, END
from langgraph.types import Send
from graph_components.configuration import (
    Configuration as dynamic_configuration,
)
from graph_components.state import (
    BlogState,
    BlogStateInput,
    BlogStateOutput,
    SectionState,
)
import graph_components.configuration as dynamic_configuration
from people import MrSearch, MrCurator, MrPlanner, MrCompiler, MrWriter
from dotenv import load_dotenv

load_dotenv()


class MrSupervisor:
    def __init__(self):
        pass

    def write_main_sections(self, blog: BlogState) -> None:
        results = []
        for section in blog.sections:
            if section.isMainBody:
                results.append(
                    Send(
                        "write_main",
                        SectionState(
                            section=section,
                            title=blog.title,
                            sources=blog.sources,
                            finalized_sections=[],
                        ),
                    )
                )
        return results

    def write_not_main_sections(self, blog: BlogState) -> None:
        results = []
        for section in blog.sections:
            if not section.isMainBody:
                results.append(
                    Send(
                        "write_not_main",
                        SectionState(
                            section=section,
                            title=blog.title,
                            sources=blog.sources,
                            finalized_sections=[],
                        ),
                    )
                )
        return results

    def run(self, blog: BlogState) -> BlogState:
        search_agent = MrSearch()
        curator_agent = MrCurator()
        planner_agent = MrPlanner()
        writer_agent = MrWriter()
        compiler_agent = MrCompiler()

        builder = StateGraph(
            BlogState,
            # input=BlogStateInput,
            # output=BlogStateOutput,
            config_schema=dynamic_configuration.Configuration,
        )
        builder.add_node("search", search_agent.run)
        builder.add_node("curate", curator_agent.run)
        builder.add_node("plan", planner_agent.run)
        builder.add_node("write_main", writer_agent.write_main)
        builder.add_node("write_not_main", writer_agent.write_not_main)
        builder.add_node("compile_main", compiler_agent.compile_main_sections)
        builder.add_node("compile_blog", compiler_agent.compile_blog)

        builder.add_edge("search", "curate")
        builder.add_edge("curate", "plan")
        builder.add_conditional_edges("plan", self.write_main_sections, ["write_main"])
        builder.add_edge("write_main", "compile_main")
        builder.add_conditional_edges(
            "compile_main", self.write_not_main_sections, ["write_not_main"]
        )
        builder.add_edge("write_not_main", "compile_blog")

        builder.set_entry_point("search")
        builder.set_finish_point("compile_blog")

        chain = builder.compile()
        return chain.invoke(blog)


sample_title = "The Future of AI in Healthcare: Transforming Patient Care"
blog_input = BlogState(
    title=sample_title,
    finalized_sections=[],
    sources=[],
    images=[],
    sections=[],
    main_sections=None,
    finalized_blog=None,
)
supervisor = MrSupervisor()
resulting_blog_state = supervisor.run(blog_input)
finalized_blog_content = resulting_blog_state.get("finalized_blog")
print(finalized_blog_content)
