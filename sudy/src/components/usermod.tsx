'use client';

import { useState } from 'react';

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

interface UserBlockProps {
    user: User;
    onEdit: (userId: string, updatedUser: Partial<User>) => void;
    onDelete: (userId: string) => void;
    isEditModalOpenByDefault?: boolean;
}

const accessLevelLabels = {
    user: { text: 'Пользователь', class: 'bg-gray-100 text-gray-700 hover:bg-gray-200' },
    moderator: { text: 'Модератор', class: 'bg-blue-100 text-blue-700 hover:bg-blue-200' },
    admin: { text: 'Администратор', class: 'bg-purple-100 text-purple-700 hover:bg-purple-200' },
};

const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear();
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');

    return `${day}.${month}.${year} ${hours}:${minutes}`;
};

const UserBlock: React.FC<UserBlockProps> = ({
    user,
    onEdit,
    onDelete,
    isEditModalOpenByDefault = false,
}) => {
    const [isExpanded, setIsExpanded] = useState(false);
    const [isEditModalOpen, setIsEditModalOpen] = useState(isEditModalOpenByDefault);
    const [editData, setEditData] = useState(user);

    return (
        <div className="bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-200 overflow-hidden border border-gray-100">
            <div className="p-6">
                {/* Основная информация */}
                <div className="flex flex-col sm:flex-row gap-6">
                    {/* Аватар */}
                    <div className="w-24 h-24 rounded-full overflow-hidden flex-shrink-0 border-4 border-gray-100">
                        {user.avatarUrl ? (
                            <img src={user.avatarUrl} alt={user.login} className="w-full h-full object-cover" />
                        ) : (
                            <div className="w-full h-full bg-gray-200 flex items-center justify-center text-gray-400">
                                <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                </svg>
                            </div>
                        )}
                    </div>

                    {/* Информация о пользователе */}
                    <div className="flex-1">
                        <div className="flex justify-between items-start gap-4 mb-4">
                            <div>
                                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                                    {user.lastName} {user.firstName} {user.middleName}
                                </h3>
                                <div className="flex flex-col gap-1 text-sm text-gray-600">
                                    <div className="flex items-center gap-2">
                                        <span>ID: {user.id}</span>
                                        <span>•</span>
                                        <span className="text-blue-600">{user.email}</span>
                                    </div>
                                    {user.phone && (
                                        <div className="flex items-center gap-1">
                                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                                            </svg>
                                            {user.phone}
                                        </div>
                                    )}
                                    {user.city && user.address && (
                                        <div className="flex items-center gap-1">
                                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                            </svg>
                                            {user.city}, {user.address}
                                        </div>
                                    )}
                                </div>
                            </div>

                            {/* Статус и уровень доступа */}
                            <div className="flex gap-2">
                                <span className={`px-3 py-1.5 rounded-full text-sm font-medium ${
                                    user.isBlocked 
                                        ? 'bg-red-100 text-red-700' 
                                        : 'bg-green-100 text-green-700'
                                }`}>
                                    {user.isBlocked ? 'Заблокирован' : 'Активен'}
                                </span>
                                <select
                                    value={user.accessLevel}
                                    onChange={(e) => onEdit(user.id, { accessLevel: e.target.value as User['accessLevel'] })}
                                    className={`px-3 py-1.5 rounded-full text-sm font-medium ${accessLevelLabels[user.accessLevel].class}`}
                                >
                                    {Object.entries(accessLevelLabels).map(([value, { text }]) => (
                                        <option key={value} value={value}>{text}</option>
                                    ))}
                                </select>
                            </div>
                        </div>

                        {/* Блокировка */}
                        {user.isBlocked && (
                            <div className="mb-4 p-3 bg-red-50 rounded-lg border border-red-100">
                                <div className="text-sm text-red-700">
                                    <div className="font-medium mb-1">Причина блокировки:</div>
                                    <p>{user.blockReason}</p>
                                    {user.unblockDate && (
                                        <div className="mt-2">
                                            Дата разблокировки: {formatDate(user.unblockDate)}
                                        </div>
                                    )}
                                </div>
                            </div>
                        )}

                        {/* Даты и системная информация */}
                        <div className="flex flex-col gap-2 text-sm text-gray-500 mb-4">
                            <div className="flex items-center gap-1">
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                </svg>
                                Регистрация: {formatDate(user.createdAt)}
                                {user.registrationIp && <span className="ml-2">(IP: {user.registrationIp})</span>}
                            </div>
                            {user.lastLoginAt && (
                                <div className="flex items-center gap-1">
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                    Последний вход: {formatDate(user.lastLoginAt)}
                                    {user.lastIp && <span className="ml-2">(IP: {user.lastIp})</span>}
                                </div>
                            )}
                            {user.userAgent && (
                                <div className="flex items-center gap-1">
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                    </svg>
                                    Устройство: {user.userAgent}
                                </div>
                            )}
                        </div>

                        {/* Действия */}
                        <div className="flex flex-wrap gap-2">
                            <button
                                onClick={() => setIsEditModalOpen(true)}
                                className="flex items-center gap-1 px-3 py-1.5 text-sm text-blue-600 hover:text-blue-700 transition-colors"
                            >
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                                </svg>
                                Редактировать
                            </button>
                            <button
                                onClick={() => onDelete(user.id)}
                                className="flex items-center gap-1 px-3 py-1.5 text-sm text-red-600 hover:text-red-700 transition-colors"
                            >
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                </svg>
                                Удалить
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Модальное окно редактирования */}
            {isEditModalOpen && (
                <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-lg max-w-2xl w-full">
                        <div className="p-6">
                            <h3 className="text-xl font-semibold mb-4">Редактирование пользователя</h3>
                            <form className="space-y-4">
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                            Фамилия
                                        </label>
                                        <input
                                            type="text"
                                            value={editData.lastName}
                                            onChange={(e) => setEditData({ ...editData, lastName: e.target.value })}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                            Имя
                                        </label>
                                        <input
                                            type="text"
                                            value={editData.firstName}
                                            onChange={(e) => setEditData({ ...editData, firstName: e.target.value })}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                            Отчество
                                        </label>
                                        <input
                                            type="text"
                                            value={editData.middleName || ''}
                                            onChange={(e) => setEditData({ ...editData, middleName: e.target.value })}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                            Email
                                        </label>
                                        <input
                                            type="email"
                                            value={editData.email}
                                            onChange={(e) => setEditData({ ...editData, email: e.target.value })}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                            Телефон
                                        </label>
                                        <input
                                            type="tel"
                                            value={editData.phone || ''}
                                            onChange={(e) => setEditData({ ...editData, phone: e.target.value })}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                            Город
                                        </label>
                                        <input
                                            type="text"
                                            value={editData.city || ''}
                                            onChange={(e) => setEditData({ ...editData, city: e.target.value })}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        />
                                    </div>
                                    <div className="sm:col-span-2">
                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                            Адрес
                                        </label>
                                        <input
                                            type="text"
                                            value={editData.address || ''}
                                            onChange={(e) => setEditData({ ...editData, address: e.target.value })}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        />
                                    </div>
                                    <div className="sm:col-span-2">
                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                            Ссылка на аватар
                                        </label>
                                        <input
                                            type="url"
                                            value={editData.avatarUrl || ''}
                                            onChange={(e) => setEditData({ ...editData, avatarUrl: e.target.value })}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        />
                                    </div>
                                </div>

                                {/* Блокировка */}
                                <div className="border-t pt-4 mt-4">
                                    <div className="flex items-center justify-between mb-4">
                                        <label className="flex items-center gap-2">
                                            <input
                                                type="checkbox"
                                                checked={editData.isBlocked}
                                                onChange={(e) => setEditData({ ...editData, isBlocked: e.target.checked })}
                                                className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                                            />
                                            <span className="text-sm font-medium text-gray-700">Заблокировать пользователя</span>
                                        </label>
                                    </div>
                                    
                                    {editData.isBlocked && (
                                        <div className="space-y-4">
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                                    Причина блокировки
                                                </label>
                                                <textarea
                                                    value={editData.blockReason || ''}
                                                    onChange={(e) => setEditData({ ...editData, blockReason: e.target.value })}
                                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                                    rows={3}
                                                />
                                            </div>
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                                    Дата разблокировки
                                                </label>
                                                <input
                                                    type="datetime-local"
                                                    value={editData.unblockDate || ''}
                                                    onChange={(e) => setEditData({ ...editData, unblockDate: e.target.value })}
                                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                                />
                                            </div>
                                        </div>
                                    )}
                                </div>

                                <div className="flex justify-end gap-2 pt-4 border-t">
                                    <button
                                        type="button"
                                        onClick={() => setIsEditModalOpen(false)}
                                        className="px-4 py-2 text-sm text-gray-600 hover:text-gray-800"
                                    >
                                        Отмена
                                    </button>
                                    <button
                                        type="submit"
                                        className="px-4 py-2 bg-blue-600 text-white text-sm rounded-md hover:bg-blue-700 transition-colors"
                                    >
                                        Сохранить
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default UserBlock;