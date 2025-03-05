import Header from '@/components/Header'
import Footer from '@/components/Footer'

export default function About() {
    return (
        <div className="min-h-screen flex flex-col bg-gray-200">
            <Header />
            <main className="flex-grow pt-[72px]">
                <div className="container mx-auto px-4 py-4">
                    <div className="flex justify-center w-full">
                        <div className="w-full md:w-[70%]">
                            <div className="flex flex-col bg-white rounded-lg shadow-md overflow-hidden">
                                <div className="p-4 space-y-3">
                                    <h1 className="text-xl font-bold text-gray-800">Пара слов о БилетОПад</h1>
                                    
                                    <div className="relative mb-4">
                                        <img 
                                            src="https://img.gazeta.ru/files3/489/7772489/ded_0-pic905-895x505-69260.jpg"
                                            alt="О нас"
                                            className="w-full rounded-lg object-contain"
                                        />
                                    </div>

                                    <p className="text-gray-600 text-sm">
                                        <strong>БилетОПад</strong> — потому что мечтать о театре гораздо дешевле, чем туда пойти.<br/>
                                        <br/>
                                        Мы не продаём билеты. Мы продаём вам оправдание для того, чтобы остаться дома. Ведь зачем тратить время на спектакли, если можно просто сказать, что вы их "поддерживаете"?<br/>
                                        <br/>
                                        <strong>Почему мы собираем деньги?</strong><br/>
                                        Потому что кто-то должен оплачивать нашу жизнь в мире, где искусство — это не про зрителей, а про красивые слова. Ваши деньги идут на:<br/>
                                        <br/>
                                        • Наш офис в центре города (чтобы мы могли смотреть на театр из окна и вздыхать).<br/>
                                        • Разработку этого сайта с бюджетом бутылки светого нефильтрованного и пачки кириешек.<br/>
                                        • Нашу коллекцию оправданий (ведь кто-то должен объяснять, почему мы до сих пор не закрылись).<br/>
                                    </p>

                                    <div className="relative mb-4">
                                        <img 
                                            src="https://news.store.rambler.ru/img/5d795dfee648312ffdc6e01c5ee7fd48?img-format=auto&img-1-resize=height:350,fit:max&img-2-filter=sharpen"
                                            alt="О нас"
                                            className="w-full rounded-lg object-contain"
                                        />
                                    </div>

                                    <p className="text-gray-600 text-sm">
                                        <strong>Что вы получаете взамен?</strong><br/>
                                        Ничего. Абсолютно ничего. Но разве это не прекрасно?<br/>
                                        <br/>
                                        • Возможность гордиться собой, ведь вы "поддержали культуру" (хотя на самом деле вы просто оплатили наш скромный ужин с пивом и закуской).<br/>
                                        • Чувство лёгкого превосходства над теми, кто всё-таки пошёл в театр и теперь мучается в неудобном кресле.<br/>
                                        <br/>
                                        БилетОПад — ваш шанс стать частью театральной жизни, не вставая с дивана. Мы не просто сервис, мы — ваше оправдание.<br/>
                                        <br/>
                                        <em>P.S. Если вы вдруг решите, что хотите всё-таки пойти в театр, просто закройте этот сайт. Но зачем вам реальность, когда есть наши красивые слова и кириешки? 😏</em>
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