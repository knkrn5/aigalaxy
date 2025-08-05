from fastapi import APIRouter
from ..services.envvar_service import ApiService

router = APIRouter()

@router.get("/get-app-pass")
def get_app_pass_route():
    return {"app_pass": ApiService.get_app_pass()}