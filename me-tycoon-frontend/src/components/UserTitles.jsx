import { useEffect, useState } from "react";
import { getUserTitles, equipTitle, unequipTitle } from '../api/titles';

export default function UserTitles({ onChange, refreshKey }) {
    const [titles, setTitles] = useState([]);

    useEffect(() => {
        const fetch = async () => {
            const data = await getUserTitles();
            setTitles(data);
            const equipped = data.find((t) => t.equipped);
            onChange(equipped?.title?.name || null);
        };
        fetch();
    }, [refreshKey]);

    const handleEquip = async (id) => {
        await equipTitle(id);
        const updated = await getUserTitles();
        setTitles(updated);
        const equipped = updated.find((t) => t.equipped);
        onChange(equipped?.title?.name || null);
    };

    const handleUnequip = async (id) => {
        await unequipTitle(id);
        const updated = await getUserTitles();
        setTitles(updated);
        const equipped = updated.find((t) => t.equipped);
        onChange(equipped?.title?.name || null);
    };

    if (titles.length === 0) return null;

    return (
    <div className="mb-8">
      <h2 className="text-xl font-bold mb-2">🧢 보유 칭호</h2>
      <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {titles.map((entry) => (
          <li key={entry.id} className="bg-white p-4 rounded shadow">
            <div className="font-bold text-lg">{entry.title.name}</div>
            <div className="text-sm text-gray-600 mb-2">{entry.title.description}</div>
            {entry.equipped ? (
              <button
                className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
                onClick={() => handleUnequip(entry.id)}
              >
                해제
              </button>
            ) : (
              <button
                className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
                onClick={() => handleEquip(entry.id)}
              >
                착용
              </button>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}