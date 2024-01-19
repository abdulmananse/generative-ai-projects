from fastapi import FastAPI, HTTPException, Depends
from sqlalchemy import desc
from sqlalchemy.orm import Session
from .database import SessionLocal, Todo
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class TodoCreate(BaseModel):
    title: str
    description: str | None = None


# Dependency
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@app.get("/api/todos")
def get_todos(db: Session = Depends(get_db)):
    todos = db.query(Todo).order_by(desc(Todo.id)).all()
    return todos

@app.post("/api/todos")
def create_todo(todo: TodoCreate, db: Session = Depends(get_db)):
    todo = Todo(title=todo.title, description=todo.description)
    db.add(todo)
    db.commit()
    db.refresh(todo)
    return todo

@app.put("/api/todos/{todo_id}")
def update_todo(todo_id: int, updated_todo: TodoCreate, db: Session = Depends(get_db)):
    db_todo = db.query(Todo).filter(Todo.id == todo_id).first()
    if db_todo is None:
        raise HTTPException(status_code=404, detail="Todo not found")

    db_todo.title = updated_todo.title
    db_todo.description = updated_todo.description
    db.commit()
    db.refresh(db_todo)
    return db_todo

@app.get("/api/todos/{todo_id}")
def update_status(todo_id: int, db: Session = Depends(get_db)):
    db_todo = db.query(Todo).filter(Todo.id == todo_id).first()
    if db_todo is None:
        raise HTTPException(status_code=404, detail="Todo not found")

    db_todo.done = not db_todo.done
    db.commit()
    db.refresh(db_todo)
    return db_todo

@app.delete("/api/todos/{todo_id}")
def delete_todo(todo_id: int, db: Session = Depends(get_db)):
    db_todo = db.query(Todo).filter(Todo.id == todo_id).first()
    if db_todo is None:
        raise HTTPException(status_code=404, detail="Todo not found")
    db.delete(db_todo)
    db.commit()
    return {"message": "Todo deleted"}