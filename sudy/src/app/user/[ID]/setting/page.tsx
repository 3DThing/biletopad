'use client'

import Header from '@/components/Header'
import Footer from '@/components/Footer'

export default function Setting() {
    const handleDeleteAccount = () => {
        if (window.confirm('Вы уверены, что хотите удалить аккаунт? Это действие нельзя отменить.')) {
            // Здесь логика удаления аккаунта
            console.log('Удаление аккаунта...');
        }
    };

    return (
        <div className="min-h-screen flex flex-col bg-gray-200">
            <Header />
            <main className="flex-grow pt-[72px]">
                <div className="container mx-auto px-4 py-4">
                    <div className="flex justify-center w-full">
                        <div className="w-full md:w-[70%]">
                            <div className="flex flex-col bg-white rounded-lg shadow-md overflow-hidden">
                                <div className="relative p-8">
                                    <div className="flex flex-col items-center mb-8">
                                        <div className="w-24 h-24 md:w-32 md:h-32 rounded-full overflow-hidden border-4 border-gray-200 mb-4">
                                            <img 
                                                src="/default-avatar.png" 
                                                alt="Аватар пользователя" 
                                                className="w-full h-full object-cover"
                                            />
                                        </div>
                                        <div className="flex flex-col sm:flex-row items-center gap-3">
                                            <input 
                                                type="file" 
                                                accept="image/*"
                                                className="hidden" 
                                                id="avatar-upload" 
                                            />
                                            <label 
                                                htmlFor="avatar-upload" 
                                                className="bg-blue-500 text-white px-4 py-2 rounded-md cursor-pointer hover:bg-blue-600 active:bg-blue-700 transition-colors duration-200 text-center w-full sm:w-auto"
                                            >
                                                Выбрать новый аватар
                                            </label>
                                            <button className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 active:bg-green-700 transition-colors duration-200 w-full sm:w-auto">
                                                Сохранить аватар
                                            </button>
                                        </div>
                                    </div>

                                    <h1 className="text-3xl font-bold mb-8 text-gray-500">
                                        Настройки пользователя
                                    </h1>
                                    
                                    <form className="space-y-6">
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8">
                                            {/* Левая колонка */}
                                            <div className="space-y-6">
                                                <div className="space-y-4">
                                                    <h2 className="text-xl font-bold text-gray-500">Сменить ФИО:</h2>
                                                    <div className="flex flex-col sm:flex-row gap-4">
                                                        <input type="text" className="flex-1 p-2 border border-gray-300 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 text-gray-500 rounded-md outline-none" placeholder="Введите новое Имя" />
                                                        <button className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 active:bg-blue-700 transition-colors duration-200 w-full sm:w-auto">Изменить</button>
                                                    </div>
                                                    <div className="flex flex-col sm:flex-row gap-4">
                                                        <input type="text" className="flex-1 p-2 border border-gray-300 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 text-gray-500 rounded-md outline-none" placeholder="Введите новую Фамилию" />
                                                        <button className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 active:bg-blue-700 transition-colors duration-200 w-full sm:w-auto">Изменить</button>
                                                    </div>
                                                    <div className="flex flex-col sm:flex-row gap-4">
                                                        <input type="text" className="flex-1 p-2 border border-gray-300 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 text-gray-500 rounded-md outline-none" placeholder="Введите новое Отчество" />
                                                        <button className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 active:bg-blue-700 transition-colors duration-200 w-full sm:w-auto">Изменить</button>
                                                    </div>
                                                    <h2 className="text-xl font-bold text-gray-500">Сменить почту:</h2>
                                                    <div className="flex flex-col sm:flex-row gap-4">
                                                        <input type="text" className="flex-1 p-2 border border-gray-300 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 text-gray-500 rounded-md outline-none" placeholder="Введите новую почту" />
                                                        <button className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 active:bg-blue-700 transition-colors duration-200 w-full sm:w-auto">Изменить</button>
                                                    </div>
                                                </div>
                                            </div>

                                            {/* Правая колонка */}
                                            <div className="space-y-6">
                                                <div className="space-y-4">
                                                    <h2 className="text-xl font-bold text-gray-500">Сменить логин:</h2>
                                                    <div className="flex flex-col sm:flex-row gap-4">
                                                        <input type="text" className="flex-1 p-2 border border-gray-300 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 text-gray-500 rounded-md outline-none" placeholder="Введите новый логин" />
                                                        <button className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 active:bg-blue-700 transition-colors duration-200 w-full sm:w-auto">Изменить</button>
                                                    </div>
                                                </div>

                                                <div className="space-y-4">
                                                    <h2 className="text-xl font-bold text-gray-500">Сменить пароль:</h2>
                                                    <div className="space-y-2">
                                                        <input type="password" className="w-full p-2 border border-gray-300 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 text-gray-500 rounded-md outline-none" placeholder="Введите новый пароль" />
                                                        <div className="flex flex-col sm:flex-row gap-4">
                                                            <input type="password" className="flex-1 p-2 border border-gray-300 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 text-gray-500 rounded-md outline-none" placeholder="Подтвердите новый пароль" />
                                                            <button className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 active:bg-blue-700 transition-colors duration-200 w-full sm:w-auto">Изменить</button>
                                                        </div>
                                                    </div>
                                                </div>

                                                <div className="space-y-4">
                                                    <h2 className="text-xl font-bold text-gray-500">Сменить адрес:</h2>
                                                    <div className="flex flex-col gap-4">
                                                        <input 
                                                            type="text" 
                                                            className="w-full p-2 border border-gray-300 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 text-gray-500 rounded-md outline-none" 
                                                            placeholder="Введите город" 
                                                        />
                                                        <div className="flex flex-col sm:flex-row gap-4">
                                                            <input 
                                                                type="text" 
                                                                className="flex-1 p-2 border border-gray-300 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 text-gray-500 rounded-md outline-none" 
                                                                placeholder="Введите адрес" 
                                                            />
                                                            <button className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 active:bg-blue-700 transition-colors duration-200 w-full sm:w-auto">
                                                                Изменить
                                                            </button>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </form>

                                    {/* Кнопка удаления аккаунта */}
                                    <div className="mt-12 border-t pt-8">
                                        <div className="flex justify-center">
                                            <button 
                                                className="bg-red-500 text-white px-6 py-3 rounded-md hover:bg-red-600 active:bg-red-700 transition-colors duration-200 font-medium"
                                                onClick={handleDeleteAccount}
                                            >
                                                Удалить аккаунт
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    )
}