import { useEffect, useState } from "react";
import { getQuestStats } from "../../api/stats";
import ThemedCard from "../common/ThemedCard";

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

  const { total_quests, completed_quests, completion_percent } = stats;

  return (
    <ThemedCard>
      <h2 className="text-lg font-bold mb-2">📊 퀘스트 달성률</h2>
      <p>전체 퀘스트 수: {total_quests}</p>
      <p>완료한 퀘스트 수: {completed_quests}</p>

      <div className="relative w-full bg-gray-200 rounded h-4 mt-2">
        <div
          className="bg-green-500 h-4 rounded transition-all duration-300 ease-out"
          style={{ width: `${completion_percent}%` }}
        />
      </div>

      <p className="text-sm text-right mt-1">{completion_percent}% 완료</p>
    </ThemedCard>
  );
}
