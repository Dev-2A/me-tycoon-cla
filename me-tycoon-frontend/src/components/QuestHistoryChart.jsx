import { useEffect, useState } from "react";
import { getQuestHistory } from '../api/stats';

export default function QuestHistoryChart({ refreshKey }) {
    const [data, setData] = useState(null);

    useEffect(() => {
        const fetch = async () => {
            const res = await getQuestHistory();
            setData(res);
        };
        fetch();
    }, [refreshKey]);

    if (!data) return null;

    return (
        <div className="p-4 bg-white rounded shadow mb-6">
          <h2 className="text-lg font-bold mb-2">📅 최근 7일 퀘스트 완료 기록</h2>
          <div className="grid grid-cols-7 gap-2 text-center">
            {Object.entries(data).map(([date, count]) => (
              <div key={date}>
                <div className="text-sm text-gray-500">{date.slice(5)}</div>
                <div className="h-20 flex items-end justify-center">
                  <div
                    className="w-4 bg-blue-500 rounded"
                    style={{ height: `${count * 20}px` }}
                    title={`${count}개 완료`}
                  />
                </div>
                <div className="text-xs mt-1">{count}개</div>
              </div>
            ))}
          </div>
        </div>
      );
}