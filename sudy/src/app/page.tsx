import Header from '@/components/Header'
import Footer from '@/components/Footer'
import Poster from '@/components/Poster'
export default function Home() {
  return (
    <div className="min-h-screen flex flex-col bg-gray-200">
      <Header />
      <main className="flex-grow pt-[72px]">
        <div className="container mx-auto px-4 py-4">
          <Poster />
        </div>
      </main>
      <Footer />
    </div>
  );
}