from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy import Column, Integer, String, ForeignKey, DateTime
import os
from datetime import datetime

# Создаем engine один раз на уровне модуля
engine = create_engine("sqlite:///database.db", echo=True)
Base = declarative_base()

#Создание таблицы users
class User(Base):
    __tablename__ = "users"
    id = Column(Integer, primary_key=True)
    username = Column(String(50), unique=True, nullable=False)
    password = Column(String(256), nullable=False)  # Для хеша пароля
    email = Column(String(100), unique=True, nullable=False)
    phone = Column(String(20), unique=True, nullable=False)
    first_name = Column(String(50), nullable=False)
    second_name = Column(String(50), nullable=False)
    last_name = Column(String(50), nullable=False)
    city = Column(String(100), nullable=False)
    address = Column(String(200), nullable=False)
    date_created = Column(DateTime, default=datetime.now, nullable=False)
    access_level = Column(String(20), nullable=False)

#Создание таблицы sessions
class Session(Base):
    __tablename__ = "sessions"
    id = Column(Integer, primary_key=True)
    user_id = Column(Integer, ForeignKey("users.id", ondelete="CASCADE"), nullable=False)
    session_id = Column(String(100), unique=True, nullable=False)
    date_created = Column(DateTime, default=datetime.now, nullable=False)
    last_activity = Column(DateTime, default=datetime.now, onupdate=datetime.now, nullable=False)
    ip_address = Column(String(45), nullable=False)  # Для поддержки IPv6
    user_agent = Column(String(200), nullable=False)
    status = Column(String(20), nullable=False)
    jwt_token = Column(String(500), nullable=False)  # Для JWT токенов



# Создаем фабрику сессий один раз
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

# Функция для получения соединения с базой данных
def get_db_connection():
    db = SessionLocal()
    try:
        return db
    finally:
        db.close()

# Создаем все таблицы при импорте модуля
Base.metadata.create_all(bind=engine)