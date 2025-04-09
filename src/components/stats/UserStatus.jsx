import { getExpForLevel } from '../../utils/levelUtils';
import ThemedCard from '../common/ThemedCard';

export default function UserStatus({ stats, currentTitle }) {
  if (!stats) return null;

  const expForNext = getExpForLevel(stats.level + 1);
  const percent = Math.min((stats.experience / expForNext) * 100, 100);

  return (
    <ThemedCard>
      <h2 className="text-lg font-bold mb-2">📊 현재 상태</h2>

      {currentTitle && (
        <p className="text-sm text-indigo-600 font-semibold mb-1">🧢 칭호: {currentTitle}</p>
      )}

      <p>레벨: {stats.level}</p>
      <p>경험치: {stats.experience} / {expForNext}</p>

      <div className="w-full bg-gray-200 rounded-full h-2.5 mt-1 mb-2">
        <div
          className="bg-blue-500 h-2.5 rounded-full transition-all"
          style={{ width: `${percent}%` }}
        />
      </div>

      <p>코인: {stats.coin}</p>
    </ThemedCard>
  );
}
