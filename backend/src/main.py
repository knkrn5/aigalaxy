from .configs.env_config import load_dotenv
from contextlib import asynccontextmanager
from fastapi import FastAPI

from .routes.aichats_routes import router as aichatsroutes


@asynccontextmanager
async def onstartupandshutdown():
    """on startup"""
    yield
    """ on shutdown """


app = FastAPI(
    title="FastAPI Example",
    description="A simple FastAPI application with startup and shutdown events.",
    version="1.0.0",
)


@app.get("/")
def read_root():
    return {"Hello": "World"}


app.include_router(aichatsroutes, prefix="/aichats", tags=["AI Chat"])


# def main():
#     uvicorn.run(app, host="0.0.0.0", port=int(os.getenv("PORT", 9000)), reload=True)
#     print(f"Server is running at http://localhost:{os.getenv('PORT', 9000)}")


# if __name__ == "__main__":
#     main()
