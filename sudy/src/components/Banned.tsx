'use client';

import { useEffect, useState } from 'react';

interface BanInfo {
  reason: string;
  unbanDate: Date;
}

interface BannedProps {
  isBlocked: boolean;
  banInfo?: BanInfo;
}

const Banned: React.FC<BannedProps> = ({ isBlocked, banInfo }) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (isBlocked && banInfo) {
      setIsVisible(true);
    }
  }, [isBlocked, banInfo]);

  if (!isVisible) return null;

  const formattedDate = banInfo?.unbanDate 
    ? new Date(banInfo.unbanDate).toLocaleString('ru-RU', {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      })
    : 'Не указана';

  return (
    <div className="fixed inset-0 backdrop-blur-sm bg-white/30 flex items-center justify-center z-50">
      <div className="bg-white/90 backdrop-blur rounded-lg p-8 max-w-md w-full shadow-xl border border-gray-200">
        <div className="text-center">
          <div className="mb-4">
            <svg 
              className="mx-auto h-16 w-16 text-red-500" 
              fill="currentColor"
              viewBox="0 0 512 512"
            >
              <g>
                <path d="m208.025,263.389v-44.245c0-17.674-14.33-32.004-32.004-32.004h-20.442c-1.395-2.408-2.99-4.71-5.006-6.727-11.837-11.837-33.285-11.837-45.123,0-2.014,2.017-3.608,4.32-5.002,6.727h-20.438c-17.674,0-32.004,14.33-32.004,32.004v44.245c-29.224,23.484-48.006,59.454-48.006,99.773 0,70.587 57.429,128.016 128.016,128.016 70.587,0 128.016-57.429 128.016-128.016-0.001-40.319-18.782-76.289-48.007-99.773zm-80.009,163.781c-35.293,0-64.008-28.715-64.008-64.008 0-35.293 28.715-64.008 64.008-64.008 35.293,0 64.008,28.714 64.008,64.008-0.001,35.293-28.715,64.008-64.008,64.008z"/>
                <path d="m474.566,112.624c-28.51-28.51-67.228-40.665-104.496-36.605l-31.286-31.286c-12.486-12.501-32.77-12.501-45.255,0l-15.385,15.385c-10.206-1.846-21.358,0.965-28.839,8.446-5.915,5.923-9.275,14.244-9.275,22.565 0,2.156 0.246,4.305 0.683,6.42l-15.075,15.075c-12.502,12.494-12.502,32.762 0,45.256l31.287,31.287c-4.06,37.269 8.094,75.985 36.604,104.495 24.956,24.956 57.734,37.434 90.519,37.434 32.785,0 65.563-12.478 90.519-37.434 49.911-49.913 49.911-131.126-0.001-181.038zm-45.256,135.782c-24.956,24.956-65.571,24.956-90.527,0-24.942-24.943-24.95-65.526-0.035-90.484l.078-.078c12.472-12.451 28.845-18.678 45.22-18.678 16.393,0 32.785,6.235 45.263,18.713 24.957,24.956 24.957,65.571 0.001,90.527z"/>
                <path d="m195.219,84.886c1.922,0 3.844-0.164 5.766-0.641 17.276-3.039 28.957-19.682 25.761-37.122-3.039-17.447-19.682-28.964-37.13-25.769-17.44,3.04-28.957,19.682-25.917,37.13 2.876,15.518 16.323,26.402 31.52,26.402z"/>
                <path d="m125.132,142.815c2.563,0.641 4.962,0.797 7.204,0.797 14.556,0 27.839-9.923 31.199-24.8 4.001-17.127-6.72-34.41-23.839-38.247-17.283-4.001-34.567,6.72-38.411,23.839-4,17.283 6.728,34.41 23.847,38.411z"/>
              </g>
            </svg>
          </div>
          
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Ваш аккаунт заблокирован
          </h2>
          
          <div className="space-y-4 text-left">
            <div className="bg-red-50 p-4 rounded-lg">
              <h3 className="text-lg font-medium text-red-800 mb-2">
                Причина блокировки:
              </h3>
              <p className="text-red-700">
                {banInfo?.reason || 'Причина не указана'}
              </p>
            </div>
            
            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="text-lg font-medium text-gray-800 mb-2">
                Дата разблокировки:
              </h3>
              <p className="text-gray-700">
                {formattedDate}
              </p>
            </div>
          </div>

          <div className="mt-8">
            <p className="text-sm text-gray-500">
              Если вы считаете, что произошла ошибка, пожалуйста, свяжитесь с администрацией.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Banned;
