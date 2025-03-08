"use client";

import { useState } from 'react'
import Header from '@/components/Header'
import Footer from '@/components/Footer'

export default function Reg() {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [secondName, setSecondName] = useState('');
    const [phone, setPhone] = useState('');
    const [city, setCity] = useState('');
    const [address, setAddress] = useState('');
    const [showModal, setShowModal] = useState(false);
    const [isAgreementAccepted, setIsAgreementAccepted] = useState(false);
    const [verbose, setVerbose] = useState(true);
    const [toast, setToast] = useState({ show: false, message: '', type: '' });

    const showToast = (message: string, type: string) => {
        if (!verbose) return;
        setToast({ show: true, message, type });
        setTimeout(() => {
            setToast({ show: false, message: '', type: '' });
        }, 5000);
    };

    const handleSubmit = async () => {
        if (!isAgreementAccepted) {
            alert('Необходимо принять условия публичной оферты');
            return;
        }

        if (password !== confirmPassword) {
            alert('Пароли не совпадают');
            return;
        }

        const userData = {
            username,
            password,
            email,
            phone,
            first_name: firstName,
            last_name: lastName,
            second_name: secondName,
            city,
            address
        };

        try {
            showToast('Отправка данных...', 'info');
            const response = await fetch('http://localhost:8000/api/v1/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(userData)
            });

            const data = await response.json();
            showToast(`Код: ${response.status} - ${data.detail || 'OK'}`, response.ok ? 'success' : 'error');

            if (response.ok) {
                setTimeout(() => {
                    window.location.href = '/login';
                }, 1000);
            }
        } catch (error) {
            showToast(`Ошибка: ${error}`, 'error');
        }
    };
    
    return (
        <div className="min-h-screen flex flex-col bg-gradient-to-b from-gray-100 to-gray-200">
            <Header />
            <main className="flex-grow pt-[72px]">
                <div className="container mx-auto px-4 py-8">
                    <div className="flex justify-center w-full">
                        <div className="w-full md:w-[70%]">
                            <div className="flex flex-col bg-white rounded-xl shadow-lg overflow-hidden backdrop-blur-sm bg-opacity-90">
                                <div className="p-8 space-y-6">
                                    <h1 className="text-2xl font-bold text-gray-800 text-center mb-8">Регистрация нового пользователя</h1>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div className="space-y-2">
                                            <label className="text-sm font-medium text-gray-700">Логин</label>
                                            <input 
                                                type="text" 
                                                placeholder="Придумайте логин" 
                                                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent text-gray-800 transition-all duration-200"
                                                value={username}
                                                onChange={(e) => setUsername(e.target.value)}
                                            />
                                        </div>

                                        <div className="space-y-2">
                                            <label className="text-sm font-medium text-gray-700">Электронная почта</label>
                                            <input 
                                                type="email" 
                                                placeholder="example@mail.ru" 
                                                className={`w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent text-gray-800 transition-all duration-200 ${email && !email.includes('@') ? 'border-red-500' : 'border-gray-300'}`}
                                                value={email}
                                                onChange={(e) => setEmail(e.target.value)}
                                            />
                                            {email && !email.includes('@') && (
                                                <p className="text-red-500 text-sm">Введите корректный email адрес</p>
                                            )}
                                            {email && !email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/) && (
                                                <p className="text-red-500 text-sm">Email должен содержать домен (например: mail.ru)</p>
                                            )}
                                        </div>

                                        <div className="space-y-2">
                                            <label className="text-sm font-medium text-gray-700">Пароль</label>
                                            <input 
                                                type="password" 
                                                placeholder="Минимум 8 символов" 
                                                className={`w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent text-gray-800 transition-all duration-200 ${password.length > 0 && password.length < 8 ? 'border-red-500' : 'border-gray-300'}`}
                                                value={password}
                                                onChange={(e) => setPassword(e.target.value)}
                                            />
                                            {password.length > 0 && password.length < 8 && (
                                                <p className="text-red-500 text-sm">Пароль должен содержать минимум 8 символов</p>
                                            )}
                                        </div>

                                        <div className="space-y-2">
                                            <label className="text-sm font-medium text-gray-700">Подтверждение пароля</label>
                                            <input 
                                                type="password" 
                                                placeholder="Повторите пароль" 
                                                className={`w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent text-gray-800 transition-all duration-200 ${confirmPassword.length > 0 && password !== confirmPassword ? 'border-red-500' : 'border-gray-300'}`}
                                                value={confirmPassword}
                                                onChange={(e) => setConfirmPassword(e.target.value)}
                                            />
                                            {confirmPassword.length > 0 && password !== confirmPassword && (
                                                <p className="text-red-500 text-sm">Пароли не совпадают</p>
                                            )}
                                        </div>

                                        <div className="space-y-2">
                                            <label className="text-sm font-medium text-gray-700">Имя</label>
                                            <input 
                                                type="text" 
                                                placeholder="Ваше имя" 
                                                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent text-gray-800 transition-all duration-200"
                                                value={firstName}
                                                onChange={(e) => setFirstName(e.target.value)}
                                            />
                                        </div>

                                        <div className="space-y-2">
                                            <label className="text-sm font-medium text-gray-700">Фамилия</label>
                                            <input 
                                                type="text" 
                                                placeholder="Ваша фамилия" 
                                                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent text-gray-800 transition-all duration-200"
                                                value={lastName}
                                                onChange={(e) => setLastName(e.target.value)}
                                            />
                                        </div>

                                        <div className="space-y-2">
                                            <label className="text-sm font-medium text-gray-700">Отчество</label>
                                            <input 
                                                type="text" 
                                                placeholder="Ваше отчество (при наличии)" 
                                                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent text-gray-800 transition-all duration-200"
                                                value={secondName}
                                                onChange={(e) => setSecondName(e.target.value)}
                                            />
                                        </div>

                                        <div className="space-y-2">
                                            <label className="text-sm font-medium text-gray-700">Телефон</label>
                                            <input 
                                                type="tel" 
                                                placeholder="+7 (___) ___-__-__" 
                                                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent text-gray-800 transition-all duration-200"
                                                value={phone}
                                                onChange={(e) => setPhone(e.target.value)}
                                            />
                                        </div>

                                        <div className="space-y-2">
                                            <label className="text-sm font-medium text-gray-700">Город</label>
                                            <input 
                                                type="text" 
                                                placeholder="Ваш город" 
                                                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent text-gray-800 transition-all duration-200"
                                                value={city}
                                                onChange={(e) => setCity(e.target.value)}
                                            />
                                        </div>

                                        <div className="space-y-2">
                                            <label className="text-sm font-medium text-gray-700">Адрес</label>
                                            <input 
                                                type="text" 
                                                placeholder="Ваш адрес" 
                                                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent text-gray-800 transition-all duration-200"
                                                value={address}
                                                onChange={(e) => setAddress(e.target.value)}
                                            />
                                        </div>
                                    </div>

                                    <div className="space-y-2">
                                        <div className="flex items-center space-x-2">
                                            <input 
                                                type="checkbox" 
                                                id="agreement" 
                                                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                                                checked={isAgreementAccepted}
                                                onChange={() => setShowModal(true)}
                                            />
                                            <label htmlFor="agreement" className="text-sm text-gray-700">
                                                Я принимаю условия публичной оферты
                                            </label>
                                        </div>
                                    </div>

                                    {showModal && (
                                        <div className="fixed inset-0 bg-white/30 backdrop-blur-sm flex items-center justify-center z-50">
                                            <div className="bg-white rounded-lg p-6 w-[90%] max-w-2xl max-h-[80vh] overflow-y-auto shadow-xl">
                                                <h2 className="text-xl font-bold mb-4 text-center text-gray-800">Публичная оферта</h2>
                                                <div className="text-gray-700 mb-6">
                                                    <p className="mb-4">
                                                        1. Общие положения
                                                    </p>
                                                    <p>[Здесь должен быть текст публичной оферты]</p>
                                                    <br />
                                                    <p>[Здесь должен быть текст публичной оферты]</p>
                                                    <br />
                                                    <p>[Здесь должен быть текст публичной оферты]</p>
                                                    <br />
                                                    <p>[Здесь должен быть текст публичной оферты]</p>
                                                    <br />
                                                    <p>[Здесь должен быть текст публичной оферты]</p>
                                                    <p>[Здесь должен быть текст публичной оферты]</p>
                                                    <br />
                                                    <p>[Здесь должен быть текст публичной оферты]</p>
                                                    <br />
                                                    <p>[Здесь должен быть текст публичной оферты]</p>
                                                    <br />
                                                    <p>[Здесь должен быть текст публичной оферты]</p>
                                                    <br />
                                                    <p>[Здесь должен быть текст публичной оферты]</p>
                                                    <p>[Здесь должен быть текст публичной оферты]</p>
                                                    <br />
                                                    <p>[Здесь должен быть текст публичной оферты]</p>
                                                    <br />
                                                    <p>[Здесь должен быть текст публичной оферты]</p>
                                                    <br />
                                                    <p>[Здесь должен быть текст публичной оферты]</p>
                                                    <br />
                                                    <p>[Здесь должен быть текст публичной оферты]</p>
                                                    <p>[Здесь должен быть текст публичной оферты]</p>
                                                    <br />
                                                    <p>[Здесь должен быть текст публичной оферты]</p>
                                                    <br />
                                                    <p>[Здесь должен быть текст публичной оферты]</p>
                                                    <br />
                                                    <p>[Здесь должен быть текст публичной оферты]</p>
                                                    <br />
                                                    <p>[Здесь должен быть текст публичной оферты]</p>
                                                    <p>[Здесь должен быть текст публичной оферты]</p>
                                                    <br />
                                                    <p>[Здесь должен быть текст публичной оферты]</p>
                                                    <br />
                                                    <p>[Здесь должен быть текст публичной оферты]</p>
                                                    <br />
                                                    <p>[Здесь должен быть текст публичной оферты]</p>
                                                    <br />
                                                    <p>[Здесь должен быть текст публичной оферты]</p>
                                                    {/* Добавьте остальной текст оферты здесь */}
                                                </div>
                                                <div className="flex justify-end space-x-4">
                                                    <button 
                                                        onClick={() => setShowModal(false)}
                                                        className="px-4 py-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400"
                                                    >
                                                        Отказаться
                                                    </button>
                                                    <button 
                                                        onClick={() => {
                                                            setIsAgreementAccepted(true);
                                                            setShowModal(false);
                                                        }}
                                                        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                                                    >
                                                        Принять
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    )}

                                    <div className="pt-6">
                                        <button 
                                            onClick={handleSubmit}
                                            className="w-full p-2 bg-red-400 text-white rounded-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        >
                                            Зарегистрироваться
                                        </button>
                                    </div>

                                    <p className="text-center text-sm text-gray-600 mt-4">
                                        Уже есть аккаунт? <a href="/login" className="text-blue-500 hover:text-blue-600 font-medium">Войти</a>
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
            <Footer />
            {toast.show && (
                <div className={`fixed bottom-4 right-4 px-4 py-2 rounded shadow-lg transition-opacity duration-300 ${
                    toast.type === 'error' ? 'bg-red-500' :
                    toast.type === 'success' ? 'bg-green-500' :
                    'bg-blue-500'
                } text-white text-sm opacity-75`}>
                    {toast.message}
                </div>
            )}
        </div>
    );
}