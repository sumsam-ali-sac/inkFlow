import os
from langchain_openai import AzureChatOpenAI


deployment_name = os.environ.get("AZURE_OPENAI_DEPLOYMENT")
api_version = os.environ.get("AZURE_API_VERSION")

llm = AzureChatOpenAI(
    azure_deployment=deployment_name,
    api_version=api_version,
)
