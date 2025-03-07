import Header from '@/components/Header'
import Footer from '@/components/Footer'
import Poster from '@/components/Poster'
import Banned from '@/components/Banned';

export default function Home() {
  const isBlocked = true; // Замените на реальную проверку
  const banInfo = {
    reason: "Ебать ты лох!",
    unbanDate: new Date('2024-04-20T15:00:00')
  };
  return (
    <div className="min-h-screen flex flex-col bg-gray-200">
      <Header />
      <main className="flex-grow pt-[72px]">
        <div className="container mx-auto px-4 py-4">
          <Poster />
          <Banned isBlocked={isBlocked} banInfo={banInfo} />
        </div>
      </main>
      <Footer />
    </div>
  );
}