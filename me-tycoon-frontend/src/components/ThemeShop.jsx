import { useEffect, useState } from "react";
import { getThemes, buyTheme, applyTheme } from '../api/themes';

export default function ThemeShop({ onBuyOrApply }) {
    const [themes, setThemes] = useState([]);

    const fetchThemes = async () => {
        const data = await getThemes();
        console.log("themes data:", data);
        setThemes(data);
    };

    useEffect(() => {
        fetchThemes();
    }, []);

    const handleBuy = async (id) => {
        const success = await buyTheme(id);
        if (success) {
            alert('🎉 테마를 구매했습니다!');
            fetchThemes();
            onBuyOrApply(); // coin, stats, theme 반영
        }
    };

    const handleApply = async (id) => {
        const success = await applyTheme(id);
        if (success) {
            alert('🎨 테마를 적용했습니다!');
            fetchThemes();
            onBuyOrApply();
        }
    };

    return (
        <div className="mb-8">
            <h2 className="text-xl font-old mb-2">🛍️ 테마 상점</h2>
            <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {themes.map((theme) => (
                    <li key={theme.id} className="bg-white rounded shadow p-4">
                        <div className="font-bold">{theme.name}</div>
                        <p className="text-sm text-gray-600">{theme.description}</p>
                        <p className="text-sm text-gray-500 mt-1">💰 {theme.coin_cost} 코인</p>

                        {theme.is_applied ? (
                            <span className="inline-block mt-2 px-2 py-1 text-xs bg-blue-100 text-blue-700 rounded">적용됨</span>
                        ) : theme.is_owned ? (
                            <button
                                className="mt-2 px-3 py-1 bg-green-500 text-white rounded hover:bg-green-600"
                                onClick={() => handleApply(theme.id)}
                            >
                                적용하기
                            </button>
                        ) : (
                            <button
                                className="mt-2 px-3 py-1 bg-purple-500 text-white rounded hover:bg-purple-600"
                                onClick={() => handleBuy(theme.id)}
                            >
                                구매하기
                            </button>
                        )}
                    </li>
                ))}
            </ul>
        </div>
    );
}