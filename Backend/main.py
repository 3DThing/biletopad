from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from APIv1.users.registration import router as registration_router
from database.db import Base, engine
app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
    expose_headers=["*"],
)


app.include_router(registration_router, prefix="/api/v1")
