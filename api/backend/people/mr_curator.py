from datetime import datetime
import os
from langchain_core.prompts import ChatPromptTemplate
from graph_components.state import BlogState
from langchain_openai import AzureChatOpenAI
from pydantic import BaseModel
from langchain.output_parsers import PydanticOutputParser
from typing import List

import ast


class SourceURLs(BaseModel):
    source_urls: List[str]


class MrCurator:
    def __init__(self):
        """
        Initializes MrCurator class with Azure Chat OpenAI LLM and a prompt template.

        The class is responsible for curating content by selecting the two most relevant, insightful,
        and credible articles from a list. It uses Azure Chat OpenAI LLM to generate prompts and
        evaluate the articles based on the provided criteria.

        Raises:
            EnvironmentError: If Azure OpenAI deployment details are missing in the environment variables.

        Attributes:
            llm (AzureChatOpenAI): Azure Chat OpenAI LLM for generating and evaluating prompts.
            prompt_template (PromptTemplate): Prompt template for curating content.
        """
        deployment_name = os.environ.get("AZURE_OPENAI_DEPLOYMENT")
        api_version = os.environ.get("AZURE_API_VERSION")

        if not deployment_name or not api_version:
            raise EnvironmentError("Azure OpenAI deployment details are missing.")

        self.llm = AzureChatOpenAI(
            azure_deployment=deployment_name, api_version=api_version, max_retries=1
        )

        self.prompt_template = ChatPromptTemplate(
            [
                (
                    "system",
                    """
                    You are a content curator with the task of selecting the two most relevant, 
                    insightful, and credible articles from a list. Your focus is on ensuring that 
                    each article aligns with current trends, offers valuable information, and 
                    maintains a high standard of quality. The goal is to provide a well-rounded 
                    selection of content that engages readers and enhances the overall value of the blog.
                    """,
                ),
                (
                    "human",
                    """
                    Today's date is {date}
                    Topic: {title}
                    Your task is to identify and provide only two most relevant and high-quality articles related to 
                    the given topic or query. These articles should be well-researched, credible, and offer 
                    valuable insights for a content-focused blog or publication.
                    Here is a list of articles:
                    {sources}
                    Please return only a list of the two URLs in the following structure: 
                    {schema}
                    """,
                ),
            ]
        )

    def curate(self, title: str, sources: list) -> list:
        """
        Curates a list of articles based on the provided title and sources.

        The function uses Azure Chat OpenAI LLM to generate a prompt and evaluate the articles.
        It selects the two most relevant, insightful, and credible articles from the given list.

        Parameters:
        - title (str): The title of the blog or publication.
        - sources (list): A list of URLs representing the articles to be curated.

        Returns:
        - list: A list of URLs representing the two most relevant and high-quality articles.

        Raises:
        - EnvironmentError: If Azure OpenAI deployment details are missing in the environment variables.
        """

        parser = PydanticOutputParser(pydantic_object=SourceURLs)
        schema = parser.get_format_instructions()
        formatted_prompt = self.prompt_template.format(
            date=datetime.now().strftime("%d/%m/%Y"),
            title=title,
            sources=sources,
            schema=schema,
        )

        response = self.llm.invoke(formatted_prompt)
        filtered_sources = parser.invoke(response)
        filtered_source_urls = [
            i for i in sources if i["url"] in filtered_sources.source_urls
        ]
        return filtered_source_urls

    def run(self, blog: BlogState):
        blog.sources = self.curate(blog.title, blog.sources)
        return blog


# blog = {
#     "title": "Artificial Intelligence",
#     "sources": [
#         {
#             "title": "What is Artificial Intelligence? - GeeksforGeeks",
#             "url": "https://www.geeksforgeeks.org/what-is-artificial-intelligence/",
#             "content": "Artificial Intelligence is a study to make computers, robots, generally, machines think how the intellect of humans works, think, learn when it solves any problem. This will affect software systems that are more intelligent than usual. The main objective of Artificial Intelligence is to enhance comp",
#             "score": 0.8921218,
#             "raw_content": None,
#         },
#         {
#             "title": "Artificial intelligence (AI) | Definition, Examples, Types ...",
#             "url": "https://www.britannica.com/technology/artificial-intelligence",
#             "content": "For example, a program that learns the past tense of regular English verbs by rote will not be able to produce the past tense of a word such as jump unless it previously had been presented with jumped, whereas a program that is able to generalize can learn the “add ed” rule and so form the past tense of jump based on experience with similar verbs. The real nature of the wasp’s instinctual behaviour is revealed if the food is moved a few inches away from the entrance to her burrow while she is inside: on emerging, she will repeat the whole procedure as often as the food is displaced. The program might then store the solution with the position so that the next time the computer encountered the same position it would recall the solution. Artificial intelligence is the ability of a computer or computer-controlled robot to perform tasks that are commonly associated with the\xa0intellectual\xa0processes characteristic of humans, such as the ability to reason. The term is frequently applied to the project of developing systems endowed with the intellectual processes characteristic of humans, such as the ability to reason, discover meaning, generalize, or learn from past experience.",
#             "score": 0.8512743,
#             "raw_content": None,
#         },
#         {
#             "title": "What is Artificial Intelligence? - NASA",
#             "url": "https://www.nasa.gov/what-is-artificial-intelligence/",
#             "content": "Artificial intelligence refers to computer systems that can perform complex tasks normally done by human-reasoning, decision making, creating, etc. There is no single, simple definition of artificial intelligence because AI tools are capable of a wide range of tasks and outputs,",
#             "score": 0.8380581,
#             "raw_content": None,
#         },
#         {
#             "title": "What Is Artificial Intelligence? Definition, Uses, and Types",
#             "url": "https://www.coursera.org/articles/what-is-artificial-intelligence",
#             "content": "Learners are advised to conduct additional research to ensure that courses and other credentials pursued meet their personal, professional, and financial goals.\n$1 unlocks unlimited opportunities\nCoursera Footer\nPopular AI Content\nPopular Programs\nPopular Skills\nPopular Career Resources\nCoursera\nCommunity\nMore Yet, despite the many philosophical disagreements over whether “true” intelligent machines actually exist, when most people use the term AI today, they’re referring to a suite of machine learning-powered technologies, such as Chat GPT or computer vision, that enable machines to perform tasks that previously only humans can do like generating written content, steering a car, or analyzing data.\n For Everyone course, you’ll learn what AI can realistically do and not do, how to spot opportunities to apply AI to problems in your own organization, and what it feels like to build machine learning and data science projects.\n Regardless of how far we are from achieving AGI, you can assume that when someone uses the term artificial general intelligence, they’re referring to the kind of sentient computer programs and machines that are commonly found in popular science fiction.\n Some of the most common examples of AI in use today include:\nChatGPT: Uses large language models (LLMs) to generate text in response to questions or comments posed to it.\n",
#             "score": 0.69274646,
#             "raw_content": None,
#         },
#     ],
#     "images": [
#         "https://techdigitalnow.com/wp-content/uploads/2022/10/Artificial-Intelligence-scaled.jpg",
#         "https://connectjaya.com/wp-content/uploads/2020/08/cropped-AdobeStock_20-1.jpg",
#         "https://www.strunkmedia.com/wp-content/uploads/2018/03/artifical-intelligence.jpg",
#         "https://itchronicles.com/wp-content/uploads/2020/11/where-is-ai-used.jpg",
#         "https://miro.medium.com/max/7728/1*Ab8SnQ0cKCO7SUmTuqLKMg.jpeg",
#     ],
# }
