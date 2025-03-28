import { useEffect, useState } from 'react';
import { getQuests, completeQuest, deleteQuest } from '../api/quests';

export default function QuestList({ onComplete, onDelete, refreshKey }) {
  const [quests, setQuests] = useState([]);

  useEffect(() => {
    const fetch = async () => {
      const data = await getQuests();
      setQuests(data);
    };
    fetch();
  }, [refreshKey]);

  const handleComplete = async (questId) => {
    try {
      const result = await completeQuest(questId);
      alert('✅ 퀘스트 완료!');
      onComplete(result); // 경험치/코인 갱신 + 업적/통계 갱신
    } catch (err) {
      alert(err.response?.data?.error || '퀘스트 완료 중 오류 발생');
    }
  };

  const handleDelete = async (questId) => {
    if (!window.confirm('정말로 이 퀘스트를 삭제할까요?')) return;
    await deleteQuest(questId);
    alert('🗑️ 퀘스트 삭제 완료!');
    onDelete(); // 통계 갱신 트리거
  };

  return (
    <div className="mb-8">
      <h2 className="text-xl font-bold mb-2">📋 퀘스트 목록</h2>
      <ul className="space-y-2">
        {quests.map((quest) => (
          <li key={quest.id} className="bg-white shadow p-4 rounded flex justify-between items-center">
            <div>
              <div className="font-semibold">{quest.title}</div>
              <div className="text-sm text-gray-500">{quest.description}</div>
              <div className="text-xs text-gray-400 mt-1">
                [{quest.quest_type}] 경험치 +{quest.experience}, 코인 +{quest.coin}
              </div>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => handleComplete(quest.id)}
                className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
              >
                완료
              </button>
              <button
                onClick={() => handleDelete(quest.id)}
                className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
              >
                삭제
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
