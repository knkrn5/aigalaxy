from fastapi import APIRouter, Body, Query
from fastapi.responses import StreamingResponse

from ..services.aichat_service import aichatservice


router = APIRouter()


@router.get("/aichat-res")
def aichat(question: str = Query(min_length=1)):
    return StreamingResponse(
        aichatservice.aichat(question),
        media_type="text/event-stream",
        headers={
            "Cache-Control": "no-cache",
            "Connection": "keep-alive",
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
            "Access-Control-Allow-Headers": "Content-Type",
        },
    )
