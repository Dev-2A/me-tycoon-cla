import { useEffect, useState } from "react";
import { getBestCoinSpentDay } from '../api/stats';

export default function BestCoinDay({ refreshKey }) {
    const [data, setData] = useState(null);

    useEffect(() => {
        const fetch = async () => {
            const result = await getBestCoinSpentDay();
            setData(result);
        };
        fetch();
    }, [refreshKey]);

    if (!data) {
      return (
        <div className="bg-white p-4 rounded shadow mb-6">
          <h2 className="text-xl font-bold mb-2">💰 코인 소비 최고일</h2>
          <p className="text-gray-400">아직 데이터를 불러오는 중입니다...</p>
        </div>
      );
    }
    

    return (
        <div className="bg-white p-4 rounded shadow mb-6">
          <h2 className="text-xl font-bold mb-2">💰 코인 소비 최고일</h2>
          {data.date ? (
            <p className="text-gray-700">
              <span className="font-semibold text-indigo-600">{data.date}</span> 에{' '}
              <span className="font-bold text-yellow-600">{data.coin} 코인</span>을 소비했어요!
            </p>
          ) : (
            <p className="text-gray-400">아직 보상을 구매한 기록이 없어요.</p>
          )}
        </div>
      );
}