import os

class ApiService:
    @staticmethod
    def get_app_pass() -> str:
        return os.getenv("APP_PASS", "not-authenticated")