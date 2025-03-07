'use client';

import HeaderAdmin from "@/components/HeaderAdmin";
import { useState } from "react";

export default function Admin() {
    const [isOpen, setIsOpen] = useState(true);

    return (
        <div className="admin-layout min-h-screen bg-gray-200">
            <HeaderAdmin onToggle={() => setIsOpen(!isOpen)} />
            <div className={`admin-content p-6 transition-all duration-300 ${isOpen ? 'ml-16' : 'ml-48'}`}>
                <div className="flex flex-col bg-white rounded-lg shadow-md overflow-hidden">
                    <div className="relative h-100 p-6 ">
                        <h1 className="text-2xl font-bold text-gray-600">Главная</h1>
                    </div>
                </div>
            </div>
        </div>
    )
}