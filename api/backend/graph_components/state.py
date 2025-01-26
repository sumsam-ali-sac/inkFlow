import operator
from pydantic import BaseModel, Field
from dataclasses import dataclass, field
from typing import List, Annotated


class Section(BaseModel):
    name: str = Field(description="The name of the section of the blog.")
    description: str = Field(
        description="A brief overview of the main topics and concepts to be covered in this section",
    )
    image: str = Field(description="The image to be included in the section.")
    content: str = Field(description="The content of the section in markdown format.")
    isMainBody: bool = Field(
        description="A boolean value indicating whether this section is the main body of the blog post.",
    )


class Sections(BaseModel):
    sections: List[Section] = Field(
        description="A list of sections that make up the blog post."
    )


@dataclass(kw_only=True)
class BlogState:
    title: str
    sources: list = Field(
        default_factory=list,
        description="A list of URLs along with content representing the search results according to title to be curated.",
    )
    images: list = Field(
        default_factory=list, description="A list of images to be included in the blog."
    )
    sections: Sections = Field(
        default_factory=Sections,
        description="The sections that make up the blog post.",
    )
    finalized_sections: Annotated[list, operator.add]
    main_sections: str = Field(
        default=None, description="The main sections of the blog post."
    )
    finalized_blog: str = Field(default=None, description="The finalized blog post.")


@dataclass(kw_only=True)
class BlogState:
    title: str
    sources: List[dict] = field(default_factory=list)
    images: List[str] = field(default_factory=list)
    sections: List[Section] = field(default_factory=list)
    finalized_sections: Annotated[List[str], operator.add]
    main_sections: str = field(default=None)
    finalized_blog: str = field(default=None)


class BlogStateInput(BaseModel):
    title: str = Field(description="The title of the blog post.")


class BlogStateOutput(BaseModel):
    finalized_blog: str = Field(default=None, description="The finalized blog post.")


@dataclass(kw_only=True)
class SectionState:
    section: Section
    title: str
    sources: List[dict] = field(default_factory=list)
    image: str = field(default=None)
    main_sections: str = field(default=None)
    finalized_sections: list[Section] = field(default_factory=list)


class SectionOutputState(BaseModel):
    finalized_sections: Sections = Field(
        "", description="The finalized sections of the blog post."
    )
