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
#     res = aichatservice.aichat(question)
#     return StreamingResponse(
#         res,
#         media_type="text/event-stream",
#         headers={
#             "Cache-Control": "no-cache",
#             "Connection": "keep-alive",
#             "Transfer-Encoding": "chunked",
#         },
#     )


@router.get("/aichat-res")
def aichat_sse(question: str = Query(..., min_length=1)):
    def generate():
        try:
            for chunk in aichatservice.aichat(question):  # Use async for
                yield chunk
        except Exception as e:
            # Send error message in SSE format
            yield f"data: Error: {str(e)}\n\n"
            yield "data: [END]\n\n"
    
    return StreamingResponse(
        generate(), 
        media_type="text/event-stream",
        headers={
            "Cache-Control": "no-cache",
            "Connection": "keep-alive",
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
            "Access-Control-Allow-Headers": "Content-Type",
        }
    )
