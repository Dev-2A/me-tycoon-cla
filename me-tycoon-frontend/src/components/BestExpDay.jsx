import { useEffect, useState } from "react";
import { getBestExpDay } from '../api/stats';

export default function BestExpDay({ refereshKey }) {
    const [data, setData] = useState(null);

    useEffect(() => {
        const fetch = async () => {
            const result = await getBestExpDay();
            setData(result);
        };
        fetch();
    }, [refereshKey]);

    if (!data) return null;

    return (
        <div className="bg-white p-4 rounded shadow mb-6">
          <h2 className="text-xl font-bold mb-2">⚡ 경험치 최고일</h2>
          {data.date ? (
            <p className="text-gray-700">
              <span className="font-semibold text-indigo-600">{data.date}</span> 에{' '}
              <span className="font-bold text-green-600">{data.exp} EXP</span>를 획득했어요!
            </p>
          ) : (
            <p className="text-gray-400">아직 기록이 없어요.</p>
          )}
        </div>
      );
}