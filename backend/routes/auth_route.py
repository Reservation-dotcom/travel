from fastapi import APIRouter, Depends, HTTPException

from config.database import db_connection
from controller.auth_controller import UserCreate, UserLogin
from utils.auth_utils import create_access_token, hash_password, verify_password, verify_token


auth_router = APIRouter()

db = db_connection()
if db is not None:
    collection = db["user"]
    print("MongoDB Connection Successfully")
else:
    collection = None
    print("Error MongoDB Connection")


@auth_router.post("/register")
async def register(user: UserCreate):
    if collection is None:
        raise HTTPException(status_code=500, detail="Database connection failed")

    email = user.email.lower().strip()
    user_exists = collection.find_one({"email": email})
    if user_exists:
        raise HTTPException(status_code=400, detail="Email already exists")

    user_data = {
        "firstName": user.firstName.strip(),
        "email": email,
        "password": hash_password(user.password),
    }

    result = collection.insert_one(user_data)
    return {
        "status": "success",
        "message": "User registered successfully",
        "data": {
            "id": str(result.inserted_id),
            "email": user_data["email"],
            "firstName": user_data["firstName"],
        },
    }


@auth_router.post("/login")
async def login(user: UserLogin):
    if collection is None:
        raise HTTPException(status_code=500, detail="Database connection failed")

    email = user.email.lower().strip()
    db_user = collection.find_one({"email": email})
    if not db_user:
        raise HTTPException(status_code=400, detail="Invalid email or password")

    if not verify_password(user.password, db_user.get("password", "")):
        raise HTTPException(status_code=400, detail="Invalid email or password")

    token = create_access_token(
        data={
            "email": db_user["email"],
            "firstName": db_user.get("firstName", ""),
            "id": str(db_user["_id"]),
        }
    )

    if not token:
        raise HTTPException(status_code=500, detail="Token creation failed")

    return {
        "status": "success",
        "message": "Login successful",
        "data": {
            "id": str(db_user["_id"]),
            "email": db_user["email"],
            "firstName": db_user.get("firstName", ""),
        },
        "token": token,
    }


@auth_router.get("/profile")
def get_profile(user_data: dict = Depends(verify_token)):
    print('user_data',user_data)
    return {"status": "success", "data": user_data}