'use client';

import { useState } from 'react';

export default function Header() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    return (
      <header className="w-full bg-[rgba(96,165,250,0.9)] shadow-sm fixed top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <nav className="flex flex-col md:flex-row items-center justify-between">
            <div className="flex justify-between items-center w-full md:w-auto">
              <div className="text-3xl font-bold text-blue-900">БилетОПад</div>
              <button  
                className="md:hidden text-black"
                onClick={toggleMenu}
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth="2" 
                    d={isMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"}
                  />
                </svg>
              </button>
            </div>
            <div className="flex-1 flex justify-center">
              <div className={`${isMenuOpen ? 'flex' : 'hidden'} md:flex flex-col md:flex-row w-full md:w-auto md:items-center`}>
                <ul className="flex flex-col md:flex-row gap-4 text-black justify-center items-center w-full md:w-auto mb-4 md:mb-0">
                  <li><a href="/" className="hover:text-gray-600">Главная</a></li>
                  <li><a href="/about" className="hover:text-gray-600">О нас</a></li>
                  <li><a href="/contacts" className="hover:text-gray-600">Контакты</a></li>
                </ul>
              </div>
            </div>
            <div className={`${isMenuOpen ? 'flex' : 'hidden'} md:flex flex-col md:flex-row gap-4 w-full md:w-auto`}>
              <a href="/login" className="px-4 py-2 text-black hover:text-gray-600 transition-colors duration-300 flex items-center justify-center md:justify-start w-full md:w-auto">
                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 16l-4-4m0 0l4-4m-4 4h14"/>
                </svg>
                Вход
              </a>
            </div>
          </nav>
        </div>
      </header>
    );
  }