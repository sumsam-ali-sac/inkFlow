from graph_components.state import BlogState, Section


class MrCompiler:
    def __init__(self):
        pass

    def format_sections(self, sections: list[Section]) -> str:
        """Format a list of sections into a string, skipping main_body"""
        formatted_str = ""
        for idx, section in enumerate(sections, 1):
            formatted_str += f"""
            {'=' * 50}
            📖 Section {idx}: {section.name}
            {'=' * 50}
            📝 Description:
            {section.description}

            📂 Content:
            {section.content if section.content else '[Not yet written]'}
            """
        return formatted_str

    def compile_main_sections(self, blog: BlogState) -> None:
        finalized_sections = blog.finalized_sections
        completed_report_sections = self.format_sections(finalized_sections)
        return {"main_sections": completed_report_sections}

    def compile_blog(self, blog: BlogState) -> None:
        sections = blog.sections
        finalized_sections = {s.name: s.content for s in blog.finalized_sections}

        for section in sections:
            section.content = finalized_sections[section.name]

        all_sections = "\n\n".join([s.content for s in sections])
        # print(all_sections)
        return {"finalized_blog": all_sections}
