from fastapi import APIRouter, Body, Query
from fastapi.responses import StreamingResponse

from ..services.aichat_service import aichatservice


router = APIRouter()


# @router.post("/aichat-res")
# def aichat(question: str = Body(embed=True)):
#     res = aichatservice.aichat(question)
#     return StreamingResponse(res, media_type="text/event-stream")


# @router.get("/aichat-res")
# def aichat(question: str = Query(..., min_length=1)):
#     return StreamingResponse(
#         aichatservice.aichat(question),
#         media_type="text/event-stream",
#     )


# @router.get("/aichat-res")
# def aichat(question: str = Query(min_length=1)):
#     return StreamingResponse(
#         aichatservice.aichat(question),
#         media_type="text/event-stream",
#         headers={
#             "Cache-Control": "no-cache",
#             "Connection": "keep-alive",
#             "Access-Control-Allow-Origin": "*",
#             "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
#             "Access-Control-Allow-Headers": "Content-Type",
#         },
#     )


# You had this WRONG setup:
# @router.get("/aichat-res")
# def aichat_sse(question: str = Query(..., min_length=1)):
#     def generate():  # <-- This wrapper was unnecessary and problematic
#         try:
#             for chunk in aichatservice.aichat(question):
#                 yield chunk
#         except Exception as e:
#             yield f"data: Error: {str(e)}\n\n"
#             yield "data: [END]\n\n"

#     return StreamingResponse(generate(), media_type="text/event-stream")