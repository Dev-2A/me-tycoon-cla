import { useEffect, useState } from 'react';
import { getRewards, buyReward } from '../api/rewards';

export default function RewardShop({ onBuy }) {
  const [rewards, setRewards] = useState([]);
  const [message, setMessage] = useState('');

  useEffect(() => {
    const fetch = async () => {
      const data = await getRewards();
      setRewards(data);
    };
    fetch();
  }, []);

  const handleBuy = async (id) => {
    try {
      const res = await buyReward(id);
      setMessage(`${res.reward} 구매 완료!`);
      if (onBuy) onBuy(res);
    } catch (error) {
      setMessage(error.response?.data?.error || '구매 실패!');
    }
  };

  return (
    <div className="mb-8">
      <h2 className="text-xl font-bold mb-2">🎁 보상 상점</h2>
      {message && <div className="mb-2 p-2 bg-yellow-100 rounded text-sm">{message}</div>}
      <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {rewards.map((item) => (
          <li key={item.id} className="bg-white shadow rounded p-4 flex flex-col">
            <div className="font-bold text-lg">{item.name}</div>
            <div className="text-sm text-gray-600 mb-2">{item.description}</div>
            <div className="mt-auto">
              <span className="text-yellow-600 font-semibold">{item.cost} 코인</span>
              <button
                onClick={() => handleBuy(item.id)}
                className="ml-4 bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600"
              >구매</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}