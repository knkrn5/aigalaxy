from .configs.env_config import load_dotenv
from contextlib import asynccontextmanager
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from .routes.aichats_routes import router as aichatsroutes
from .routes.envvar_routes import router as apiroutes
import os

is_production = os.getenv("ENV") == "PRODUCTION"


origins = (
    [
        "http://localhost:5173",
    ]
    if not is_production
    else [
        "https://aigalaxy.tech",
        "https://www.aigalaxy.tech",
        "https://aigalaxy-3cwr.onrender.com",
    ]
)


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

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/")
def read_root():
    return {"Hello": "World"}


@app.get("/health")
def read_health():
    return {"status": "healthy"}


app.include_router(aichatsroutes, prefix="/aichats", tags=["AI Chat"])
app.include_router(apiroutes, prefix="/envvar", tags=["Environment Variables"])