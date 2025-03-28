import { useEffect, useState } from "react";
import { getTopQuests } from '../api/stats';

export default function TopQuests({ refreshKey }) {
    const [top, setTop] = useState([]);

    useEffect(() => {
        const fetch = async () => {
            const data = await getTopQuests();
            setTop(data);
        };
        fetch();
    }, [refreshKey]);

    if (top.length === 0) return null;

    const medalColors = ['🥇', '🥈', '🥉'];

    return (
        <div className="bg-white p-4 rounded shadow mb-6">
          <h2 className="text-xl font-bold mb-4">🏅 가장 많이 완료한 퀘스트 TOP3</h2>
          <ul className="space-y-2">
            {top.map((entry, index) => (
              <li key={entry.title} className="flex items-center">
                <span className="text-2xl mr-3">{medalColors[index]}</span>
                <span className="flex-1 text-lg">{entry.title}</span>
                <span className="text-sm text-gray-600">({entry.count}회)</span>
              </li>
            ))}
          </ul>
        </div>
      );
}