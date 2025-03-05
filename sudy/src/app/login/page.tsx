import Header from '@/components/Header'
import Footer from '@/components/Footer'

export default function Login() {
    return (
        <div className="min-h-screen flex flex-col bg-gray-200">
            <Header />
            <main className="flex-grow pt-[72px]">
                <div className="container mx-auto px-4 py-4">
                    <div className="flex justify-center w-full">
                        <div className="w-full md:w-[70%]">
                            <div className="flex flex-col bg-white rounded-lg shadow-md overflow-hidden">
                                <div className="p-4 space-y-3">
                                    <h1 className="text-xl font-bold text-gray-800">Авторизация</h1>

                                    <input type="text" placeholder="Логин" className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-800" />
                                    
                                    <input type="password" placeholder="Пароль" className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-800" />

                                    <div className="flex justify-end mb-2">
                                        <a href="/login/recpass" className="text-sm text-blue-500 hover:text-blue-600">Забыли пароль?</a>
                                    </div>
                                    <button className="w-full p-2 bg-blue-400 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500">Авторизоваться</button>
                                    <a href="/reg" className="w-full">
                                        <button className="w-full p-2 bg-red-400 text-white rounded-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-blue-500">Зарегистрироваться</button>
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    );
}