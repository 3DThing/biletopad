'use client';

import { useState, useEffect } from 'react';
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import Poster from '@/components/Poster'
import Banned from '@/components/Banned';

const demoData = {
    featured: [
        {
            id: "1",
            title: "Пьеса памяти Билли Хэрингтона",
            shortDescription: "Билли Хэрингтон — легендарный актер фильмов о крепкой мужской дружбе. Он покинул нас но навсегда остался в наших сердцах.",
            price: 1000,
            coverUrl: "https://i.ytimg.com/vi/-Fqknz0Zlk8/maxresdefault.jpg"
        },
        {
            id: "2",
            title: "Ван Даркхолм: Путь Мастера",
            shortDescription: "История о том, как простой человек стал легендой. Путешествие длиною в жизнь, наполненное страстью, болью и триумфом.",
            price: 1500,
            coverUrl: "https://forum-ru-cdn.warthunder.com/original/2X/7/7fdac5d29ef5e1af0706e3792e731d3b7ef44691.jpeg"
        }
    ]
};

export default function Home() {
  const [plays, setPlays] = useState(demoData.featured);
  const isBlocked = false;
  const banInfo = {
    reason: "Ебать ты лох!",
    unbanDate: new Date('2024-04-20T15:00:00')
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-200">
      <Header />
      <main className="flex-grow pt-[72px]">
        <div className="container mx-auto px-4 py-4">
          <div className="flex flex-col gap-6">
            {plays.map(play => (
              <Poster
                key={play.id}
                title={play.title}
                shortDescription={play.shortDescription}
                price={play.price}
                coverUrl={play.coverUrl}
              />
            ))}
          </div>
          <Banned isBlocked={isBlocked} banInfo={banInfo} />
        </div>
      </main>
      <Footer />
    </div>
  );
}