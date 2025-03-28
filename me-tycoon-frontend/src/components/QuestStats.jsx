import { useEffect, useState } from "react";
import { getQuestStats } from "../api/stats";

export default function QuestStats({ refreshKey }) {
    const [stats, setStats] = useState(null);

    useEffect(() => {
        const fetch = async () => {
            const data = await getQuestStats();
            setStats(data);
        };
        fetch();
    }, [refreshKey]);

    if (!stats) return null;

    return (
        <div className="p-4 bg-white rounded shadow mb-6">
          <h2 className="text-lg font-bold mb-2">📊 퀘스트 달성률</h2>
          <p>전체 퀘스트 수: {stats.total_quests}</p>
          <p>완료한 퀘스트 수: {stats.completed_quests}</p>
          <div className="relative w-full bg-gray-200 rounded h-4 mt-2">
            <div className="bg-green-500 h-4 rounded" style={{ width: `${stats.completion_percent}%` }} />
          </div>
          <p className="text-sm text-right mt-1">{stats.completion_percent}% 완료</p>
        </div>
      );
}