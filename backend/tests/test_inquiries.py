import asyncio

from routes import inquiry_route


class FakeInquiryCollection:
    def __init__(self):
        self.data = []

    def insert_one(self, document):
        self.data.append(document)
        return type("InsertResult", (), {"inserted_id": "inquiry-id"})()


def test_submit_umrah_inquiry_uses_umrah_collection():
    fake_collection = FakeInquiryCollection()
    inquiry_route.collection = fake_collection

    async def run_flow():
        result = await inquiry_route.submit_inquiry(
            {
                "name": "Ali Khan",
                "email": "ali@example.com",
                "phone": "+923001234567",
                "passengers": "2 Adults",
                "travelDate": "2026-10-15",
                "numberOfDays": "7",
                "pageType": "Umrah",
            }
        )
        assert result["status"] == "success"
        assert result["data"]["category"] == "Umrah"
        assert fake_collection.data[0]["category"] == "Umrah"
        assert fake_collection.data[0]["email"] == "ali@example.com"
        return result

    asyncio.run(run_flow())
