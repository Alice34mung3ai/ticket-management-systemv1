from sqlalchemy.orm import Session
from app.models.ticket import Ticket
from app.schemas import TicketCreate, TicketUpdate

def get(db: Session, id: int):
    return db.query(Ticket).filter(Ticket.id == id).first()

def get_multi(db: Session, skip: int = 0, limit: int = 100):
    return db.query(Ticket).offset(skip).limit(limit).all()

def create(db: Session, obj_in: TicketCreate):
    db_obj = Ticket(**obj_in.dict())
    db.add(db_obj)
    db.commit()
    db.refresh(db_obj)
    return db_obj

def update(db: Session, db_obj: Ticket, obj_in: TicketUpdate):
    for field, value in obj_in.dict(exclude_unset=True).items():
        setattr(db_obj, field, value)
    db.commit()
    db.refresh(db_obj)
    return db_obj

def remove(db: Session, id: int):
    obj = db.query(Ticket).get(id)
    if obj:
        db.delete(obj)
        db.commit()
    return obj