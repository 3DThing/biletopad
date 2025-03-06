import Header from '@/components/Header'
import Footer from '@/components/Footer'
import Link from 'next/link'

export default function User({
    params
}: {
    params: { ID: string }
}) {
    return (
        <div className="min-h-screen flex flex-col bg-gray-200">
            <Header />

            <main className="flex-grow pt-[72px]">
                <div className="container mx-auto px-2 sm:px-4 py-4">
                    <div className="flex justify-center w-full">
                        <div className="w-full md:w-[70%]">
                            <div className="flex flex-col bg-white rounded-lg shadow-md overflow-hidden">
                                <div className="relative">
                                    <div className="flex flex-col md:flex-row items-center md:items-start p-4 md:p-8">
                                        <img 
                                            src="https://cm.author.today/content/2023/01/30/8093317ce09f4b26a4de893fe9f5bb83.jpg"
                                            alt="Аватар пользователя"
                                            className="w-40 h-40 md:w-64 md:h-64 rounded-full object-cover"
                                            style={{
                                                border: '2px solid gray-700',
                                                boxShadow: '0 10px 10px -5px rgba(0, 0, 0, 0.5)',
                                            }}
                                        />
                                        <div className="flex flex-col items-center md:items-start">
                                            <h1 className="text-2xl md:text-3xl font-bold mt-4 md:mt-0 md:ml-8 text-gray-500 text-center md:text-left">
                                                Фамилия Имя Отчество
                                            </h1>
                                            <div className="flex flex-col sm:flex-row items-center md:items-start gap-2 sm:gap-4 mt-4 md:ml-8">
                                                <Link href={`/user/${params.ID}/setting`} className="w-full sm:w-auto">
                                                    <button className="w-full bg-gray-700 text-white px-4 py-2 rounded-md hover:bg-gray-800">Настройки</button>
                                                </Link>
                                                <button className="w-full sm:w-auto bg-gray-700 text-white px-4 py-2 rounded-md hover:bg-gray-800">Выйти</button>
                                            </div>
                                            <div className="flex flex-row items-start mt-4 md:ml-8">
                                                <h2 className="text-xl md:text-2xl font-bold text-gray-500">История покупок:</h2>
                                            </div>
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