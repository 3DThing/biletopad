'use client';

import { useState } from 'react';
import HeaderAdmin from "@/components/HeaderAdmin";
import PlayBlock from "@/components/postermod";

interface Play {
  id: string;
  title: string;
  price: number;
  shortDescription: string;
  fullDescription: string;
  status: 'draft' | 'published' | 'cancelled' | 'completed';
  coverUrl?: string;
  createdAt: string;
  performanceDate?: string;
}

export default function AdminPlays() {
  const [isOpen, setIsOpen] = useState(true);
  const [plays, setPlays] = useState<Play[]>([
    {
      id: "1",
      title: "Пьеса памяти Билли Хэрингтона",
      price: 1000,
      shortDescription: "Билли Хэрингтон — легендарный актер...",
      fullDescription: "Полная история жизни и творчества...",
      status: 'published',
      coverUrl: "https://yandex-images.clstorage.net/LC9S64E31/bb038aCx/T2F8FxPlKFWCM1GQ7f5cZlbp0Qf30Uer5KfwCkps5SP_v4SVaKNO2aTpeX18JRUoeM8zAKI8EyRmx4UV-eFgkOpVWWNmoV2x8jMA1F1ancaX6IXGI-ATinTnhZqKamPB2P3yZ47USe4jWNxNyfBRqZy7JdN2ayHSZMJwR0tDFmWd8kwWMnUp80AAUCTsDR50RmjHtTchQTuR1aINb-liIWl-kadstKlv4cjcv-kDgk8sORTAYXkyU-RQotT6Y1Rlr2LcFJHVWwLhwjDlr39OJnaqxse2ssBpUzZCfU1pMqH4D6H17Md7P_DIP0xq00GubKpkUhF4EcNHgfNmm4Fm165SrCbDlpkBkWMgthyePmUESEWHJKAz6ZHGEt0--YBhO38R5R0GKz_iOf6NGyMy_t94RbKQucBg97HTNEuzRXdvgp01EpaZ8bJTgIVN_e2GNCn1ZdfzMdugZQLtrNgTobrN48UPJcjekDg_bTtQYr48CvTTgMpgQmaS00W4wYVHj6FvJcOnenOyMIKFTJ_NJSea5Pf2gLErohUjX_7b0ZEKHLAUHPWqPsDLHo-r8zKfXPsFMmNaQCPE0ZFVmUDEN32yzIZxxyhyAoAzhx5-3PQlKDaFRwEA2TH0MF1e2WBhCi9SBC7m6r5AOyz929IzjR4KVmDQ2aMjR3CiNttw9daP4i7UYzdbQzHRQdYt_y_U5hjF1zVhkvlRN-IPPGvSUmiuQcQNhik-g5rsfYrhgS4NW9WywyuAYNZQIveoQKXlTTLvZ8LlK_MzwTGUTB1-ptaqhGVHYzObUBXS_d3rciLYLWCFX4Z5vCM4DJ8bMuKfvQhkMNAK4mHUIHBliwKFZo0ijhVx15njMbHC9iwMjmbGKhUVltJzSuN0Mv-8y7BDC8-BRP13W87hqjyvS-LSnZ451XCiC9IARBOzFLqRd9evs21H8TcIEcLwQdcufOxnVmsnpSfSsztDpBFsvSiAI",
      createdAt: new Date().toISOString(),
      performanceDate: '2024-04-01T19:00:00',
    },
    {
      id: "2", 
      title: "Ван Даркхолм: История успеха",
      price: 1500,
      shortDescription: "Биографическая пьеса о жизни и карьере легендарного Ван Даркхолма.",
      fullDescription: "Захватывающая история о том, как простой японский бизнесмен стал интернет-легендой. В спектакле раскрываются неизвестные факты из жизни Ван Даркхолма, его путь к славе и влияние на современную культуру.",
      status: 'draft',
      createdAt: new Date().toISOString(),
      performanceDate: '2024-04-02T19:00:00',
    },
    {
      id: "3",
      title: "Dungeon Master",
      price: 2000,
      shortDescription: "Интерактивная пьеса о приключениях в подземелье.",
      fullDescription: "Уникальная постановка с элементами импровизации, где зрители сами могут повлиять на развитие сюжета. История о храбрых искателях приключений, отважившихся исследовать таинственное подземелье.",
      status: 'published',
      createdAt: new Date().toISOString(),
      performanceDate: '2024-04-03T19:00:00',
    }
  ]);

  const handleDelete = async (id: string) => {
    setPlays(plays.filter(play => play.id !== id));
  };

  const handleEdit = async (id: string, data: Partial<Play>) => {
    setPlays(plays.map(play => 
      play.id === id ? { ...play, ...data } : play
    ));
  };

  const handleAddPlay = () => {
    const newPlay: Play = {
      id: (plays.length + 1).toString(),
      title: "Новая пьеса",
      price: 0,
      shortDescription: "",
      fullDescription: "",
      status: 'draft',
      createdAt: new Date().toISOString(),
    };
    setPlays([...plays, newPlay]);
  };

  return (
    <div className="admin-layout min-h-screen bg-gray-100">
      <HeaderAdmin onToggle={() => setIsOpen(!isOpen)} />
      <div className={`admin-content p-6 transition-all duration-300 ${isOpen ? 'ml-16' : 'ml-48'}`}>
        <div className="max-w-6xl mx-auto">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold text-gray-900">Управление пьесами</h1>
            <button
              onClick={handleAddPlay}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
              Добавить пьесу
            </button>
          </div>

          <div className="space-y-4">
            {plays.map(play => (
              <PlayBlock
                key={play.id}
                play={play}
                onDelete={handleDelete}
                onEdit={handleEdit}
                isEditModalOpenByDefault={play.title === "Новая пьеса"}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}