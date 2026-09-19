from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from routes.auth_route import auth_router
from routes.inquiry_route import inquiry_router


app=FastAPI()



app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Replace "*" with your frontend origin for production
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


app.include_router(auth_router,prefix='/auth')
app.include_router(inquiry_router,prefix='/inquiry')



