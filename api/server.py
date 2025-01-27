from fastapi import FastAPI, HTTPException
from backend.graph_components.state import BlogState
from backend.mr_supervisour import MrSupervisor

inkFlowBackend = FastAPI()


@inkFlowBackend.post("/Generateblog-v1")
async def generate_blog(request: BlogState):
    try:
        supervisor = MrSupervisor()
        resulting_blog_state = supervisor.run(request) 
        finalized_blog_content = resulting_blog_state.get("finalized_blog") 
        print(finalized_blog_content)
        return resulting_blog_state 
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
