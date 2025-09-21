from typing import List
from fastapi import FastAPI, Depends, HTTPException
from sqlalchemy.orm import Session
from .database import engine, get_db
from . import models, schemas
from .routers import users, tickets, comments

app = FastAPI(title="Ticket Management System API")
models.Base.metadata.create_all(bind=engine)
app.include_router(users.router, prefix="/users", tags=["Users"])
app.include_router(tickets.router, prefix="/tickets", tags=["Tickets"])