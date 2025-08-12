from fastapi import APIRouter, Response
from ..services.envvar_service import ApiService

router = APIRouter()


@router.get("/get-app-pass")
def get_app_pass_route():
    return Response(
        content=ApiService.get_app_pass(),
        media_type="text/plain",
    )
