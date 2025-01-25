import os
import datetime
from langchain_core.prompts import ChatPromptTemplate
from langchain_core.runnables import RunnableConfig, chain
from langchain_community.tools import TavilySearchResults
from langchain_openai import AzureChatOpenAI
from dotenv import load_dotenv
load_dotenv()

api_key = os.environ.get("AZURE_API_KEY")
deployment_name = os.environ.get("AZURE_DEPLOYMENT_NAME")
api_version = os.environ.get("AZURE_API_VERSION")
tavily_api_key = os.environ.get("TAVILY_API_KEY")

tool = TavilySearchResults(
    tavily_api_key=tavily_api_key,
    max_results=5,
    search_depth="advanced",
    include_answer=True,
    include_raw_content=True,
    include_images=True,
)

llm = AzureChatOpenAI(
    azure_deployment=deployment_name,
    api_version=api_version,
)

today = datetime.datetime.today().strftime("%D")

prompt = ChatPromptTemplate(
    [
        ("system", f"You are a helpful assistant. The date today is {today}."),
        ("human", "{user_input}"),
        ("placeholder", "{messages}"),
    ]
)

llm_with_tools = llm.bind_tools([tool])

llm_chain = prompt | llm_with_tools


@chain
def tool_chain(user_input: str, config: RunnableConfig):
    input_ = {"user_input": user_input}
    ai_msg = llm_chain.invoke(input_, config=config)
    tool_msgs = tool.batch(ai_msg.tool_calls, config=config)
    return llm_chain.invoke({**input_, "messages": [ai_msg, *tool_msgs]}, config=config)


tool_chain.invoke("who won the last womens singles wimbledon")
