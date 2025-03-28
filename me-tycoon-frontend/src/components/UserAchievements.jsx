import { useEffect, useState } from 'react';
import { getUserAchievements } from '../api/achievements';

export default function UserAchievements({ refreshKey }) {
  const [achievements, setAchievements] = useState([]);

  useEffect(() => {
    const fetchAchievements = async () => {
      const data = await getUserAchievements();
      setAchievements(data);
    };
    fetchAchievements();
  }, [refreshKey]);

  if (achievements.length === 0) return null;

  return (
    <div className="mb-8">
      <h2 className="text-xl font-bold mb-2">🏆 해금한 업적</h2>
      <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {achievements.map((entry) => (
          <li key={entry.id} className="bg-white shadow rounded p-4">
            <div className="font-bold text-lg">{entry.achievement.name}</div>
            <div className="text-sm text-gray-600">{entry.achievement.description}</div>
            <div className="text-xs text-gray-400 mt-1">해금일: {new Date(entry.unlocked_at).toLocaleString()}</div>
          </li>
        ))}
      </ul>
    </div>
  );
}