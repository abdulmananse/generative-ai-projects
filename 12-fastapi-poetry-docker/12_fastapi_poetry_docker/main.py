from fastapi import FastAPI

app : FastAPI = FastAPI()

@app.get("/")
def index() -> str:
    return "Hello World12"