import asyncio
from types import SimpleNamespace

from controller.auth_controller import UserCreate, UserLogin
from routes import auth_route


class FakeCollection:
    def __init__(self):
        self.data = {}

    def find_one(self, query):
        key = query.get("email")
        if not key:
            return None
        return self.data.get(key)

    def insert_one(self, document):
        email = document["email"]
        self.data[email] = document
        return SimpleNamespace(inserted_id="fake-id")


def test_hash_password_round_trip():
    password = "StrongPass123!"
    hashed = auth_route.hash_password(password)
    assert hashed != password
    assert auth_route.verify_password(password, hashed) is True
    assert auth_route.verify_password("wrong-password", hashed) is False


def test_create_and_verify_token():
    token = auth_route.create_access_token({"email": "user@example.com", "firstName": "Test"})
    assert token
    decoded = auth_route.jwt.decode(token, auth_route.SECRET_KEY, algorithms=[auth_route.ALGORITHM])
    assert decoded["email"] == "user@example.com"


def test_register_and_login_work_with_fake_collection():
    auth_route.collection = FakeCollection()

    async def run_flow():
        register_result = await auth_route.register(UserCreate(firstName="Alice", email="alice@example.com", password="StrongPass123!"))
        assert register_result["status"] == "success"

        login_result = await auth_route.login(UserLogin(email="alice@example.com", password="StrongPass123!"))
        assert login_result["status"] == "success"
        assert login_result["token"]
        return login_result

    result = asyncio.run(run_flow())
    assert result["data"]["email"] == "alice@example.com"
