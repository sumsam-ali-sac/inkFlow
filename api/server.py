from fastapi import FastAPI, HTTPException
from backend.graph_components.state import BlogState
from backend.mr_supervisour import MrSupervisor
from fastapi.middleware.cors import CORSMiddleware
import uvicorn

app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Use specific domains in production
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.post("/Generateblog-v1")
async def generate_blog(request: BlogState):
    try:
        supervisor = MrSupervisor()
        resulting_blog_state = supervisor.run(request) 
        finalized_blog_content = resulting_blog_state.get("finalized_blog") 
        print(finalized_blog_content)
        return resulting_blog_state 
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
    
@app.get("/hello")
async def hello():
    return {"message": "Hello World"}

if __name__ == "__main__":
    uvicorn.run("server:app", host="0.0.0.0", port=8000)
