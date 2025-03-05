import Header from '@/components/Header'
import Footer from '@/components/Footer'

export default function Contacts() {
    return (
        <div className="min-h-screen flex flex-col bg-gray-200">
            <Header />
            <main className="flex-grow pt-[72px]">
                <div className="container mx-auto px-4 py-4">
                    <div className="flex justify-center w-full">
                        <div className="w-full md:w-[70%]">
                            <div className="flex flex-col bg-white rounded-lg shadow-md overflow-hidden">
                                <div className="p-4 space-y-3">
                                    <h1 className="text-xl font-bold text-gray-800">Наши контакты</h1>
                                    <p className="text-gray-600 text-sm">
                                        <strong>Больше всего нас напрягает то что вы хотите с нами связаться</strong><br/>
                                        Но если вы не за возвратом денег, не желаете подать на нас в суд, не хотите сказать, что мы не хорошие люди, то вы можете написать нам на почту или позвонить нам по телефону.<br/>
                                        <br/>

                                        <strong>Кредиты не выдаем, недвижимость не интересует!</strong><br/>
                                        <br/>



                                        <strong>Телефон:</strong> +7 (999) 999-99-99<br/>
                                        <strong>Email:</strong> bletopad@s.mfua.ru<br/>
                                        <strong>Адрес:</strong> Москва, ул. Введенского, 1А<br/>
                                    </p>
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