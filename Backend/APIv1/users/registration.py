from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from database.db import get_db_connection
from pydantic import BaseModel
from datetime import datetime, timezone
from database.db import User  # Импортируем модель User из правильного места
from fastapi.responses import JSONResponse

router = APIRouter()

# Определяем модель Pydantic прямо здесь вместо импорта
class UserRegistration(BaseModel):
    username: str
    password: str
    email: str
    phone: str
    first_name: str
    last_name: str
    second_name: str
    city: str
    address: str

@router.post("/register")
async def register_user(user: UserRegistration, db: Session = Depends(get_db_connection)):
    # Проверяем существующего пользователя
    existing_user = db.query(User).filter(
        (User.email == user.email) | 
        (User.username == user.username) |
        (User.phone == user.phone)
    ).first()
    
    if existing_user:
        raise HTTPException(
            status_code=400,
            detail="Пользователь с таким email, username или телефоном уже существует"
        )

    new_user = User(
        username=user.username,
        password=user.password,  # TODO: добавить хеширование пароля
        email=user.email,
        phone=user.phone,
        first_name=user.first_name,
        last_name=user.last_name,
        second_name=user.second_name,
        city=user.city,
        address=user.address,
        date_created=datetime.now(timezone.utc),
        access_level="user"
    )
    
    try:
        db.add(new_user)
        db.commit()
        return {"message": "Пользователь успешно зарегистрирован"}
    except Exception as e:
        db.rollback()
        raise HTTPException(status_code=500, detail=f"Ошибка при регистрации: {str(e)}")

@router.get("/users")
async def get_users(db: Session = Depends(get_db_connection)):
    try:
        users = db.query(User).all()
        users_list = []
        for user in users:
            user_dict = {
                "id": user.id,
                "username": user.username,
                "password": user.password,
                "email": user.email,
                "phone": user.phone,
                "first_name": user.first_name,
                "second_name": user.second_name,
                "last_name": user.last_name,
                "city": user.city,
                "address": user.address,
                "date_created": str(user.date_created),
                "access_level": user.access_level
            }
            users_list.append(user_dict)
        
        return JSONResponse(content={"users": users_list})
    except Exception as e:
        print(f"Ошибка при получении пользователей: {str(e)}")  # Добавляем отладочный вывод
        raise HTTPException(status_code=500, detail=f"Ошибка при получении списка пользователей: {str(e)}")
