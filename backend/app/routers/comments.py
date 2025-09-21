from typing import List
from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from app.db.session import get_db
from app import crud, schemas

router = APIRouter(prefix="/comments", tags=["comments"])

@router.post("/", response_model=schemas.Comment, status_code=status.HTTP_201_CREATED)
def create_comment(comment_in: schemas.CommentCreate, db: Session = Depends(get_db)):
    comment = crud.comment.create(db, obj_in=comment_in)
    return comment

@router.get("/", response_model=List[schemas.Comment])
def list_comments(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    comments = crud.comment.get_multi(db, skip=skip, limit=limit)
    return comments

@router.get("/{comment_id}", response_model=schemas.Comment)
def get_comment(comment_id: int, db: Session = Depends(get_db)):
    comment = crud.comment.get(db, id=comment_id)
    if not comment:
        raise HTTPException(status_code=404, detail="Comment not found")
    return comment

@router.put("/{comment_id}", response_model=schemas.Comment)
def update_comment(comment_id: int, comment_in: schemas.CommentCreate, db: Session = Depends(get_db)):
    comment = crud.comment.get(db, id=comment_id)
    if not comment:
        raise HTTPException(status_code=404, detail="Comment not found")
    comment = crud.comment.update(db, db_obj=comment, obj_in=comment_in)
    return comment

@router.delete("/{comment_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_comment(comment_id: int, db: Session = Depends(get_db)):
    comment = crud.comment.get(db, id=comment_id)
    if not comment:
        raise HTTPException(status_code=404, detail="Comment not found")
    crud.comment.remove(db, id=comment_id)
    return None