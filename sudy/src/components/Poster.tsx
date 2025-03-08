'use client';

import { useState, useEffect } from 'react';

interface Play {
    id: string;
    title: string;
    shortDescription: string;
    price: number;
    coverUrl: string;
}

const demoData = {
    featured: [
        {
            id: "1",
            title: "Пьеса памяти Билли Хэрингтона",
            shortDescription: "Билли Хэрингтон — легендарный актер фильмов о крепкой мужской дружбе. Он покинул нас но навсегда остался в наших сердцах.",
            price: 1000,
            coverUrl: "https://steamuserimages-a.akamaihd.net/ugc/2065509824831692471/0F26586B8158B3411409A334D8485B0E9742DDD3/?imw=512&amp;imh=287&amp;ima=fit&amp;impolicy=Letterbox&amp;imcolor=%23000000&amp;letterbox=true"
        },
        {
            id: "2",
            title: "Ван Даркхолм: Путь Мастера",
            shortDescription: "История о том, как простой человек стал легендой. Путешествие длиною в жизнь, наполненное страстью, болью и триумфом.",
            price: 1500,
            coverUrl: "https://i.ytimg.com/vi/oTv_9O7e_9I/maxresdefault.jpg"
        },
        {
            id: "3",
            title: "Ван Даркхолм: Путь Мастера",
            shortDescription: "История о том, как простой человек стал легендой. Путешествие длиною в жизнь, наполненное страстью, болью и триумфом.",
            price: 1500,
            coverUrl: "https://i.ytimg.com/vi/oTv_9O7e_9I/maxresdefault.jpg"
        }
    ]
};

interface PosterProps {
    title: string;
    shortDescription: string;
    price: number;
    coverUrl: string;
}

export default function Poster({ title, shortDescription, price, coverUrl }: PosterProps) {
    return (
        <div className="flex justify-center w-full">
            <div className="w-full md:w-[70%]">
                <div className="flex flex-col bg-white rounded-lg shadow-md overflow-hidden">
                    <div className="relative h-100">
                        <img 
                            src={coverUrl}
                            alt="Event poster" 
                            className="w-full h-full object-cover"
                        />
                    </div>
                    
                    <div className="p-4 space-y-3">
                        <h2 className="text-xl font-bold text-gray-800">{title}</h2>
                        
                        <p className="text-gray-600 text-sm line-clamp-3">
                            {shortDescription}
                        </p>
                        
                        <div className="text-lg font-bold text-black">
                            от {price} ₽
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
    );
}