# Import relevant functionality
from langchain_openai import AzureChatOpenAI
from langchain_community.tools.tavily_search import TavilySearchResults
from langchain.agents import AgentType
from langchain_core.messages import HumanMessage
from langchain.agents import AgentExecutor
from langchain.agents import create_openai_functions_agent
import os
from langchain import hub

from dotenv import load_dotenv


load_dotenv()

deployment_name = os.environ.get("AZURE_OPENAI_DEPLOYMENT")
api_version = os.environ.get("AZURE_API_VERSION")


# Create the agent
llm = AzureChatOpenAI(
    azure_deployment=deployment_name,
    api_version=api_version,
)
search = TavilySearchResults(max_results=2)
tools = [search]
prompt = hub.pull("hwchase17/openai-functions-agent")
agent_executor = AgentExecutor(
    agent=create_openai_functions_agent(llm, tools, prompt), tools=tools, verbose=True
)


print(agent_executor.invoke({"input": "What is current weather in San Francisco?"}))
