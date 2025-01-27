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
@dataclass
class BlogState:
    title: str
    finalized_sections: Annotated[List[str], operator.add]  # Non-default field
    sources: List[dict] = field(
        default_factory=list,
        metadata={"description": "A list of URLs along with content representing the search results according to the title to be curated."},
    )
    images: List[str] = field(
        default_factory=list, 
        metadata={"description": "A list of images to be included in the blog."},
    )
    sections: List[Section] = field(
        default_factory=list,
        metadata={"description": "The sections that make up the blog post."},
    )
    main_sections: str = field(
        default=None, 
        metadata={"description": "The main sections of the blog post."},
    )
    finalized_blog: str = field(
        default=None, 
        metadata={"description": "The finalized blog post."},
    )


class BlogStateInput(BaseModel):
    title: str = Field(description="The title of the blog post.")

class BlogStateOutput(BaseModel):
    finalized_blog: str = Field(default=None, description="The finalized blog post.")

@dataclass
class SectionState:
    section: Section
    title: str
    sources: List[dict] = field(
        default_factory=list, 
        metadata={"description": "Sources related to this section."},
    )
    image: str = field(
        default=None, 
        metadata={"description": "The image associated with this section."},
    )
    main_sections: str = field(
        default=None, 
        metadata={"description": "Main sections of this section."},
    )
    finalized_sections: List[Section] = field(
        default_factory=list, 
        metadata={"description": "Finalized sections for the blog."},
    )

class SectionOutputState(BaseModel):
    finalized_sections: Sections = Field(
        ..., description="The finalized sections of the blog post."
    )
