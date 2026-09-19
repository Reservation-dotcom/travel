from typing import Optional

from pydantic import BaseModel, Field


class InquiryCreate(BaseModel):
    name: str = Field(..., min_length=2, max_length=120)
    email: str = Field(..., min_length=3, max_length=200)
    phone: str = Field(..., min_length=5, max_length=40)
    passengers: Optional[str] = ""
    travelDate: Optional[str] = ""
    numberOfDays: Optional[str] = ""
    pageType: str = Field(..., min_length=2, max_length=60)
