from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from backend.supervisour_agent import SupervisourAgent

inkFlowBackend = FastAPI()

class BlogRequest(BaseModel):
    title: str
    
@inkFlowBackend.post("/Generateblog-v1")
async def generate_blog(request: BlogRequest):
    try:
        agent = SupervisourAgent()
        response = agent.run(request.title)
        return response
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
