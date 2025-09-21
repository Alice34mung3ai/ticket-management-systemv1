from sqlalchemy.orm import Session
from app.models.user import User
from app.schemas import UserCreate, UserUpdate

def get(db: Session, id: int):
    return db.query(User).filter(User.id == id).first()

def get_by_email(db: Session, email: str):
    return db.query(User).filter(User.email == email).first()

def get_multi(db: Session, skip: int = 0, limit: int = 100):
    return db.query(User).offset(skip).limit(limit).all()

def create(db: Session, obj_in: UserCreate):
    db_obj = User(**obj_in.dict())
    db.add(db_obj)
    db.commit()
    db.refresh(db_obj)
    return db_obj

def update(db: Session, db_obj: User, obj_in: UserUpdate):
    for field, value in obj_in.dict(exclude_unset=True).items():
        setattr(db_obj, field, value)
    db.commit()
    db.refresh(db_obj)
    return db_obj

def remove(db: Session, id: int):
    obj = db.query(User).get(id)
    if obj:
        db.delete(obj)
        db.commit()
    return obj