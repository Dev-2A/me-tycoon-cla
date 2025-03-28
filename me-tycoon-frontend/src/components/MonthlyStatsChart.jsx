import { useEffect, useState } from "react";
import { getMonthlyStats } from '../api/stats';
import {
    LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid, Legend, ResponsiveContainer
} from 'recharts';

export default function MonthlyStatsChart({ refreshKey }) {
    const [data, setData] = useState([]);

    useEffect(() => {
        const fetch = async () => {
            const stats = await getMonthlyStats();
            setData(stats);
        };
        fetch();
    }, [refreshKey]);

    if (data.length === 0) return null;

    return (
        <div className="bg-white p-4 rounded shadow mb-6">
          <h2 className="text-xl font-bold mb-4">📈 최근 30일 성장 통계</h2>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={data}>
              <CartesianGrid stroke="#eee" strokeDasharray="5 5" />
              <XAxis dataKey="date" tick={{ fontSize: 12 }} />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="quests_completed" stroke="#8884d8" name="퀘스트 완료 수" />
              <Line type="monotone" dataKey="exp_gained" stroke="#82ca9d" name="경험치 획득량" />
              <Line type="monotone" dataKey="coin_gained" stroke="#ffc658" name="코인 획득량" />
            </LineChart>
          </ResponsiveContainer>
        </div>
      );
}