import Header from '@/components/Header'
import Footer from '@/components/Footer'
import Poster from '@/components/Poster'
export default function Home() {
  return (
    <div className="min-h-screen flex flex-col bg-gray-200">
      <Header />
      <main className="flex-grow pt-[72px]">
        <div className="container mx-auto px-4 py-4">
        <div className="flex justify-center w-full">
            <div className="w-full md:w-[70%]">
                <div className="flex flex-col bg-white rounded-lg shadow-md overflow-hidden">
                    <div className="relative h-100">
                        <img 
                            src="https://steamuserimages-a.akamaihd.net/ugc/2065509824831692471/0F26586B8158B3411409A334D8485B0E9742DDD3/?imw=512&amp;imh=287&amp;ima=fit&amp;impolicy=Letterbox&amp;imcolor=%23000000&amp;letterbox=true" 
                            alt="Event poster" 
                            className="w-full h-full object-cover"
                        />
                    </div>
                    
                    <div className="p-4 space-y-3">
                        <h2 className="text-xl font-bold text-gray-800">Пьеса памяти Билли Хэрингтона</h2>
                        
                        <p className="text-gray-600 text-sm line-clamp-3">
                            Билли Хэрингтон — легендарный актер фильмов о крепкой мужской дружбе.
                            Он покинул нас но навсегда остался в наших сердцах.

                        </p>
                        
                        <div className="text-lg font-bold text-black">
                            от 1000 ₽
                        </div>
                        
                        <div className="flex gap-3 pt-2">
                            <button className="flex-1 px-4 py-2 bg-transparent border border-primary text-black rounded-md hover:bg-primary hover:text-blue-400 transition-colors">
                                Подробнее
                            </button>
                            <button className="flex-1 px-4 py-2 bg-primary text-black rounded-md hover:bg-primary-dark transition-colors hover:text-blue-400">
                                Купить билет
                            </button>
                        </div>
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