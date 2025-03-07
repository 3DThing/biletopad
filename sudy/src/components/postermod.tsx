'use client';

import { useState } from 'react';

interface Play {
  id: string;
  title: string;
  price: number;
  shortDescription: string;
  fullDescription: string;
  status: 'draft' | 'published' | 'cancelled' | 'completed';
  coverUrl?: string;
  createdAt: string; // Дата добавления
  performanceDate?: string; // Дата проведения
}

interface PlayBlockProps {
  play: Play;
  onDelete: (id: string) => void;
  onEdit: (id: string, data: Partial<Play>) => void;
  isEditModalOpenByDefault?: boolean;
}

const statusLabels = {
  draft: { text: 'Черновик', class: 'bg-yellow-100 text-yellow-700 hover:bg-yellow-200' },
  published: { text: 'Опубликовано', class: 'bg-green-100 text-green-700 hover:bg-green-200' },
  cancelled: { text: 'Отменено', class: 'bg-red-100 text-red-700 hover:bg-red-200' },
  completed: { text: 'Завершено', class: 'bg-gray-100 text-gray-700 hover:bg-gray-200' },
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

const PlayBlock: React.FC<PlayBlockProps> = ({
  play,
  onDelete,
  onEdit,
  isEditModalOpenByDefault = false,
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(isEditModalOpenByDefault);
  const [editData, setEditData] = useState(play);
  const [coverUrlType, setCoverUrlType] = useState<'link' | 'file'>('link');
  const [coverFile, setCoverFile] = useState<File | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    let coverUrl = editData.coverUrl;
    if (coverFile) {
      // Здесь должна быть логика загрузки файла на сервер
      // и получение URL загруженного файла
      // coverUrl = await uploadFile(coverFile);
    }

    onEdit(play.id, { ...editData, coverUrl });
    setIsEditModalOpen(false);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setCoverFile(e.target.files[0]);
      // Создаем временный URL для предпросмотра
      setEditData({ ...editData, coverUrl: URL.createObjectURL(e.target.files[0]) });
    }
  };

  // Добавляем проверку на существование status
  const currentStatus = play.status || 'draft';

  return (
    <div className="bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-200 overflow-hidden border border-gray-100">
      <div className="p-6">
        {/* Заголовок и основная информация */}
        <div className="flex flex-col sm:flex-row gap-6">
          {/* Обложка */}
          <div className="w-full sm:w-48 h-48 bg-gray-100 rounded-lg overflow-hidden flex-shrink-0">
            {play.coverUrl ? (
              <img src={play.coverUrl} alt={play.title} className="w-full h-full object-cover" />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-gray-400">
                <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
            )}
          </div>

          {/* Информация */}
          <div className="flex-1">
            <div className="flex justify-between items-start gap-4 mb-4">
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{play.title}</h3>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <span>ID: {play.id}</span>
                  <span>•</span>
                  <span className="font-medium text-blue-600">{play.price} ₽</span>
                </div>
              </div>
              
              {/* Статус */}
              <select
                value={play.status}
                onChange={(e) => onEdit(play.id, { status: e.target.value as Play['status'] })}
                className={`px-3 py-1.5 rounded-full text-sm font-medium transition-colors ${
                  statusLabels[play.status].class
                }`}
              >
                {Object.entries(statusLabels).map(([value, { text }]) => (
                  <option key={value} value={value}>{text}</option>
                ))}
              </select>
            </div>

            {/* Даты */}
            <div className="flex flex-col sm:flex-row gap-2 sm:gap-4 text-sm mb-4">
              <span className="text-gray-500 flex items-center gap-1">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                Добавлено: {formatDate(play.createdAt)}
              </span>
              {play.performanceDate && (
                <span className="text-blue-600 flex items-center gap-1">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  Дата проведения: {formatDate(play.performanceDate)}
                </span>
              )}
            </div>

            {/* Действия */}
            <div className="flex gap-2">
              <button
                onClick={() => setIsExpanded(!isExpanded)}
                className="flex items-center gap-1 px-3 py-1.5 text-sm text-gray-600 hover:text-gray-900 transition-colors"
              >
                {isExpanded ? 'Свернуть' : 'Подробнее'}
                <svg 
                  className={`w-4 h-4 transform transition-transform ${isExpanded ? 'rotate-180' : ''}`}
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              <button
                onClick={() => setIsEditModalOpen(true)}
                className="flex items-center gap-1 px-3 py-1.5 text-sm text-blue-600 hover:text-blue-700 transition-colors"
              >
                Редактировать
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                </svg>
              </button>
              <button
                onClick={() => {
                  if (window.confirm('Вы уверены, что хотите удалить эту пьесу?')) {
                    onDelete(play.id);
                  }
                }}
                className="flex items-center gap-1 px-3 py-1.5 text-sm text-red-600 hover:text-red-700 transition-colors"
              >
                Удалить
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
              </button>
            </div>
          </div>
        </div>

        {/* Развернутое описание */}
        {isExpanded && (
          <div className="mt-6 pt-6 border-t border-gray-100">
            <div className="prose prose-sm max-w-none">
              <div className="mb-4">
                <h4 className="text-sm font-medium text-gray-900 mb-2">Краткое описание</h4>
                <p className="text-gray-600">{play.shortDescription}</p>
              </div>
              <div>
                <h4 className="text-sm font-medium text-gray-900 mb-2">Полное описание</h4>
                <p className="text-gray-600">{play.fullDescription}</p>
              </div>
            </div>
          </div>
        )}
      </div>

      {isEditModalOpen && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <h3 className="text-xl font-semibold mb-4">Редактирование пьесы</h3>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Обложка */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Обложка
                  </label>
                  <div className="flex flex-col gap-4">
                    {/* Предпросмотр обложки */}
                    {editData.coverUrl && (
                      <div className="relative w-full aspect-video rounded-lg overflow-hidden bg-gray-100">
                        <img
                          src={editData.coverUrl}
                          alt="Preview"
                          className="w-full h-full object-cover"
                        />
                      </div>
                    )}
                    
                    {/* Переключатель типа загрузки */}
                    <div className="flex gap-4 mb-2">
                      <button
                        type="button"
                        onClick={() => setCoverUrlType('link')}
                        className={`flex-1 py-2 px-4 text-sm rounded-md ${
                          coverUrlType === 'link'
                            ? 'bg-blue-600 text-white'
                            : 'bg-gray-100 text-gray-700'
                        }`}
                      >
                        Ссылка
                      </button>
                      <button
                        type="button"
                        onClick={() => setCoverUrlType('file')}
                        className={`flex-1 py-2 px-4 text-sm rounded-md ${
                          coverUrlType === 'file'
                            ? 'bg-blue-600 text-white'
                            : 'bg-gray-100 text-gray-700'
                        }`}
                      >
                        Загрузить файл
                      </button>
                    </div>

                    {/* Поле для ввода ссылки */}
                    {coverUrlType === 'link' && (
                      <input
                        type="url"
                        value={editData.coverUrl || ''}
                        onChange={(e) => setEditData({ ...editData, coverUrl: e.target.value })}
                        placeholder="https://example.com/image.jpg"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    )}

                    {/* Поле для загрузки файла */}
                    {coverUrlType === 'file' && (
                      <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-blue-500 transition-colors">
                        <div className="flex flex-col items-center justify-center pt-5 pb-6">
                          <svg className="w-8 h-8 mb-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                          </svg>
                          <p className="mb-2 text-sm text-gray-500">
                            <span className="font-semibold">Нажмите для загрузки</span> или перетащите файл
                          </p>
                          <p className="text-xs text-gray-500">PNG, JPG или WEBP</p>
                        </div>
                        <input
                          type="file"
                          className="hidden"
                          accept="image/*"
                          onChange={handleFileChange}
                        />
                      </label>
                    )}
                  </div>
                </div>

                {/* Основные поля */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Название
                    </label>
                    <input
                      type="text"
                      value={editData.title}
                      onChange={(e) => setEditData({ ...editData, title: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      required
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Цена
                    </label>
                    <input
                      type="number"
                      value={editData.price}
                      onChange={(e) => setEditData({ ...editData, price: Number(e.target.value) })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      required
                      min="0"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Статус
                    </label>
                    <select
                      value={editData.status}
                      onChange={(e) => setEditData({ ...editData, status: e.target.value as Play['status'] })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      {Object.entries(statusLabels).map(([value, { text }]) => (
                        <option key={value} value={value}>{text}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Дата проведения
                    </label>
                    <input
                      type="datetime-local"
                      value={editData.performanceDate || ''}
                      onChange={(e) => setEditData({ ...editData, performanceDate: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Краткое описание
                  </label>
                  <textarea
                    value={editData.shortDescription}
                    onChange={(e) => setEditData({ ...editData, shortDescription: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                    rows={3}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Полное описание
                  </label>
                  <textarea
                    value={editData.fullDescription}
                    onChange={(e) => setEditData({ ...editData, fullDescription: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                    rows={6}
                  />
                </div>

                <div className="flex flex-col sm:flex-row justify-end gap-2 pt-4 border-t">
                  <button
                    type="button"
                    onClick={() => setIsEditModalOpen(false)}
                    className="w-full sm:w-auto px-4 py-2 text-sm text-gray-600 hover:text-gray-800"
                  >
                    Отмена
                  </button>
                  <button
                    type="submit"
                    className="w-full sm:w-auto px-4 py-2 bg-blue-600 text-white text-sm rounded-md hover:bg-blue-700 transition-colors"
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

export default PlayBlock;