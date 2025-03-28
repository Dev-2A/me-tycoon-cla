import { useEffect, useState } from "react";
import { getQuestTypeStats } from '../api/stats';
import {
    PieChart, Pie, Cell,
    BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid,
    ResponsiveContainer, Legend
} from 'recharts';

const COLORS = ['#4f46e5', '#10b981', '#f59e0b', '#ef4444']; // daily, weekly, monthly, event 순

export default function QuestTypeChart({ refreshKey }) {
    const [data, setData] = useState([]);
    const [mode, setMode] = useState('bar');

    useEffect(() => {
        const fetch = async () => {
            const res = await getQuestTypeStats();
            const formatted = Object.entries(res).map(([type, count]) => ({
                name: type,
                type,
                value: count,
                count: count,
            }));
            setData(formatted);
        };
        fetch();
    }, [refreshKey]);

    if (data.length === 0) return null;

    return (
        <div className="bg-white p-4 rounded shadow mb-6">
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold">📂 퀘스트 유형별 통계</h2>
                <div>
                    <button
                        className={`px-3 py-1 mr-2 rounded ${mode === 'bar' ? 'bg-indigo-500 text-white' : 'bg-gray-200'}`}
                        onClick={() => setMode('bar')}
                    >
                        막대 차트
                    </button>
                    <button
                        className={`px-3 py-1 rounded ${mode === 'pie' ? 'bg-indigo-500 text-white' : 'bg-gray-200'}`}
                        onClick={() => setMode('pie')}
                    >
                        원형 차트
                    </button>
                </div>
            </div>

            <ResponsiveContainer width="100%" height={300}>
                {mode === 'bar' ? (
                    <BarChart data={data}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="type" />
                        <YAxis />
                        <Tooltip />
                        <Bar dataKey="count" fill="#4f46e5" name="완료 수" />
                    </BarChart>
                ) : (
                    <PieChart>
                        <Pie
                            data={data}
                            cx="50%"
                            cy="50%"
                            innerRadius={60}
                            outerRadius={100}
                            fill="#8884d8"
                            dataKey="value"
                            label={({ name, percent}) => `${name}: ${(percent * 100).toFixed(0)}%`}
                            isAnimationActive={false}
                        >
                            {data.map((_, index) => (
                                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                            ))}
                        </Pie>
                        <Tooltip />
                        <Legend verticalAlign="bottom" height={36} />
                    </PieChart>
                )}
            </ResponsiveContainer>
        </div>
    );
}