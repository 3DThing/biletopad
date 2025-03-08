from database.db import Base, engine
import pytest
from fastapi.testclient import TestClient
from main import app 

client = TestClient(app)

@pytest.fixture(autouse=True)
def setup_database():
    # Создаем все таблицы перед каждым тестом
    Base.metadata.create_all(bind=engine)
    yield
    # Удаляем все таблицы после каждого теста
    Base.metadata.drop_all(bind=engine)

#Чисто тестирование теста xD
def test_api():
    response = client.get("/tables")
    assert response.status_code == 200
    assert "users" and "sessions" in response.json()["tables"]

#тестирование /register
def test_register():
    user_data = {
        "username": "testuser",
        "password": "testpassword",
        "email": "test@test.com",
        "phone": "+79991234567",
        "first_name": "Test",
        "second_name": "Testovich", 
        "last_name": "User",
        "city": "Moscow",
        "address": "Test Street 1"
    }
    response = client.post("/api/v1/register", json=user_data)
    assert response.status_code == 200
    assert "message" in response.json()
    assert response.json()["message"] == "Пользователь успешно зарегистрирован"

#тестирование /register с уже зарегистрированным пользователем
def test_register_existing_user():
    # Сначала регистрируем пользователя
    user_data = {
        "username": "testuser",
        "password": "testpassword",
        "email": "test@test.com",
        "phone": "+79991234567",
        "first_name": "Test",
        "second_name": "Testovich", 
        "last_name": "User",
        "city": "Moscow",
        "address": "Test Street 1"
    }
    # Первая регистрация
    first_response = client.post("/api/v1/register", json=user_data)
    assert first_response.status_code == 200

    # Пытаемся зарегистрировать того же пользователя снова
    second_response = client.post("/api/v1/register", json=user_data)
    assert second_response.status_code == 400
    assert "detail" in second_response.json()
    assert second_response.json()["detail"] == "Пользователь с таким email, username или телефоном уже существует"

#тестирование /register с неправильными данными
def test_register_invalid_data():
    user_data = {
        "username": "testuser1",
        "password": "testpassword1",
        "city": "Moscow",
        "address": "Test Street 1"
    }
    response = client.post("/api/v1/register", json=user_data)
    assert response.status_code == 422
