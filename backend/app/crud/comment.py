from sqlalchemy.orm import Session
from app.models.comment import Comment
from app.schemas import CommentCreate, CommentUpdate

def get(db: Session, id: int):
    return db.query(Comment).filter(Comment.id == id).first()

def get_multi(db: Session, skip: int = 0, limit: int = 100):
    return db.query(Comment).offset(skip).limit(limit).all()

def create(db: Session, obj_in: CommentCreate):
    db_obj = Comment(**obj_in.dict())
    db.add(db_obj)
    db.commit()
    db.refresh(db_obj)
    return db_obj

def update(db: Session, db_obj: Comment, obj_in: CommentUpdate):
    for field, value in obj_in.dict(exclude_unset=True).items():
        setattr(db_obj, field, value)
    db.commit()
    db.refresh(db_obj)
    return db_obj

def remove(db: Session, id: int):
    obj = db.query(Comment).get(id)
    if obj:
        db.delete(obj)
        db.commit()
    return obj