'use client';

import { useState } from "react";
import HeaderAdmin from "@/components/HeaderAdmin";
import UserBlock from "@/components/usermod";

interface User {
  id: string;
  login: string;
  firstName: string;
  lastName: string;
  middleName?: string;
  email: string;
  phone?: string;
  address?: string;
  city?: string;
  isBlocked: boolean;
  blockReason?: string;
  unblockDate?: string;
  accessLevel: 'user' | 'moderator' | 'admin';
  avatarUrl?: string;
  createdAt: string;
  lastLoginAt?: string;
  lastIp?: string;
  userAgent?: string;
  registrationIp?: string;
}

export default function AdminUsers() {
  const [isOpen, setIsOpen] = useState(true);

  // Тестовые пользователи с расширенными данными
  const [users, setUsers] = useState<User[]>([
    {
      id: "1",
      login: "GOD",
      firstName: "Бог",
      lastName: "",
      middleName: "",
      email: "admin@god.com",
      phone: "+7 (999) 333-33-33",
      address: "улица Ясная, облако 14",
      city: "Небеса",
      isBlocked: false,
      accessLevel: 'admin',
      avatarUrl: "https://i.pinimg.com/originals/2e/df/7d/2edf7d586e2257544b4a406a5d7ace6a.jpg",
      createdAt: "2024-01-01T10:00:00Z",
      lastLoginAt: "2024-03-07T16:45:00Z",
      lastIp: "192.168.1.1",
      registrationIp: "192.168.1.1",
      userAgent: "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7)"
    },
    {
      id: "2",
      login: "volodin",
      firstName: "Володин",
      lastName: "Сергей",
      middleName: "Михайлович",
      email: "volodin@example.com",
      phone: "+7 (999) 999-99-99",
      address: "ул. Гоголя, д. 3",
      city: "Москва",
      isBlocked: true,
      blockReason: "Ебать ты лох",
      unblockDate: "2026-04-01T00:00:00Z",
      accessLevel: 'user',
      avatarUrl: "https://www.mfua.ru/upload/resize_cache/iblock/294/468_576_1/wd0mv0y90q2thfyzpr71uvzz37lbn7u7.jpg",
      createdAt: "2024-01-01T11:00:00Z",
      lastLoginAt: "2024-03-07T14:20:00Z",
      lastIp: "192.168.14.88",
      registrationIp: "192.168.14.88",
      userAgent: "Mozilla/5.0 (iPhone; CPU iPhone OS 14_7_1)"
    }
  ]);

  // Обработчики событий
  const handleEdit = (userId: string, data: Partial<User>) => {
    setUsers(users.map(user => 
      user.id === userId ? { ...user, ...data } : user
    ));
  };

  const handleDelete = (userId: string) => {
    setUsers(users.filter(user => user.id !== userId));
  };

  const handleAddUser = () => {
    const newUser: User = {
      id: (users.length + 1).toString(),
      login: "new_user",
      firstName: "",
      lastName: "",
      email: "",
      isBlocked: false,
      accessLevel: 'user',
      createdAt: new Date().toISOString(),
      registrationIp: "127.0.0.1"
    };
    setUsers([...users, newUser]);
  };

  return (
    <div className="admin-layout min-h-screen bg-gray-100">
      <HeaderAdmin onToggle={() => setIsOpen(!isOpen)} />
      <div className={`admin-content p-6 transition-all duration-300 ${isOpen ? 'ml-16' : 'ml-48'}`}>
        <div className="max-w-6xl mx-auto">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold text-gray-900">Управление пользователями</h1>
            <button
              onClick={handleAddUser}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
              Добавить пользователя
            </button>
          </div>

          <div className="space-y-4">
            {users.map(user => (
              <UserBlock
                key={user.id}
                user={user}
                onDelete={handleDelete}
                onEdit={handleEdit}
                isEditModalOpenByDefault={user.firstName === ""}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}