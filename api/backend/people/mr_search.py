from tavily import TavilyClient
from ..graph_components.state import BlogState
import os
from dotenv import load_dotenv

load_dotenv()
_TavilyClient = TavilyClient(api_key=os.environ.get("TAVILY_API_KEY"))


class MrSearch:
    """
    A class to perform a search using TavilyClient and retrieve results.

    Attributes
    ----------
    None

    Methods
    -------
    search(search_query: str) -> Tuple[List[Dict[str, Any]], List[str]]:
        Performs a search using TavilyClient and returns the search results.

    run(blog: dict) -> None:
        Runs a search and updates the blog dictionary with the search results.
    """

    def __init__(self):
        """
        Initializes the mr_search class.
        """
        pass

    def search(self, search_query: str):
        """
        Performs a search using TavilyClient and returns the search results.

        Parameters
        ----------
        search_query : str
            The search query to be used.

        Returns
        -------
        Tuple[List[Dict[str, Any]], List[str]]
            A tuple containing the search results (sources) and images.
        """
        results = _TavilyClient.search(
            search_query, topic="general", include_images=True
        )
        sources = results["results"]
        try:
            images = results["images"]
        except:
            images = ["https://placehold.co/600x400/png"]
        return sources, images

    def run(self, blog: BlogState) -> None:
        """
        Runs a search and updates the blog dictionary with the search results.

        Parameters
        ----------
        blog : dict
            The blog dictionary to be updated.
        """
        res = self.search(blog.title)
        return {"sources": res[0], "images": res[1]}
