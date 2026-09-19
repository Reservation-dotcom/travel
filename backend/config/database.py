from os import getenv
from pymongo import MongoClient

from dotenv import load_dotenv

load_dotenv()

url = getenv("DATABASE_URL") or getenv("Database_URL")
db_name = getenv("MONGO_DB_NAME")
collection_name = getenv("MONGO_DB_COLLECTION")

print("url", url)


def db_connection():
    try:
        if not url:
            raise ValueError("MongoDB connection URL is not configured.")

        client = MongoClient(url)
        db = client[db_name]
        return db
    except Exception as e:
        print("Connection Error: ", e)
        return None