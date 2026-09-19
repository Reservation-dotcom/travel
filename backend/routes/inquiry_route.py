from fastapi import APIRouter, HTTPException

from config.database import db_connection
from controller.inquiry_controller import InquiryCreate

inquiry_router = APIRouter()

def get_collection_for_category(category: str):
    safe_category = (category or "").strip().lower()
    category_map = {
        "umrah": "umrah_inquiries",
        "hajj": "hajj_inquiries",
        "schengen visa": "schengen_inquiries",
        "schengen": "schengen_inquiries",
        "other visa": "visa_inquiries",
        "visa": "visa_inquiries",
    }

    collection_name = category_map.get(safe_category)
    if not collection_name:
        raise HTTPException(status_code=400, detail="Unsupported inquiry category")

    db = db_connection()
    if db is None:
        raise HTTPException(status_code=500, detail="Database connection failed")

    return db[collection_name]


collection = None


@inquiry_router.post("/submit")
async def submit_inquiry(payload: InquiryCreate | dict):
    try:
        if isinstance(payload, dict):
            payload = InquiryCreate(**payload)

        category = payload.pageType.strip()
        inquiry_collection = get_collection_for_category(category)
        inquiry_payload = {
            "name": payload.name.strip(),
            "email": payload.email.strip().lower(),
            "phone": payload.phone.strip(),
            "passengers": payload.passengers.strip() if payload.passengers else "",
            "travelDate": payload.travelDate.strip() if payload.travelDate else "",
            "numberOfDays": payload.numberOfDays.strip() if payload.numberOfDays else "",
            "category": category,
        }

        result = inquiry_collection.insert_one(inquiry_payload)
        return {
            "status": "success",
            "message": "Inquiry submitted successfully",
            "data": {
                "id": str(result.inserted_id),
                "category": category,
                "email": inquiry_payload["email"],
            },
        }
    except HTTPException:
        raise
    except Exception as exc:
        raise HTTPException(status_code=500, detail=f"Inquiry submission failed: {str(exc)}")
