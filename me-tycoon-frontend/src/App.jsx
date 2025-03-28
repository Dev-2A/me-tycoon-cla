import { useEffect, useState } from 'react';
import QuestForm from './components/QuestForm';
import QuestList from './components/QuestList';
import ResetButton from './components/ResetButton';
import RewardShop from './components/RewardShop';
import MyRewards from './components/MyRewards';
import UserStatus from './components/UserStatus';
import UserAchievements from './components/UserAchievements';
import { getUserStats } from './api/quests';

import QuestStats from './components/QuestStats';
import QuestHistoryChart from './components/QuestHistoryChart';
import UserTitles from './components/UserTitles';
import MonthlyStatsChart from './components/MonthlyStatsChart';
import QuestTypeChart from './components/QuestTypeChart';
import TopQuests from './components/TopQuests';
import BestExpDay from './components/BestExpDay';
import BestCoinDay from './components/BestCoinDay';
import SummaryStats from './components/SummaryStats';

import StatsPage from './pages/StatsPage';
import ThemeShop from './components/ThemeShop';

function App() {
  const [userStats, setUserStats] = useState(null);
  const [questRefreshKey, setQuestRefreshKey] = useState(false);
  const [rewardRefreshKey, setRewardRefreshKey] = useState(false);
  const [achievementRefreshKey, setAchievementRefreshKey] = useState(false);
  const [questStatsRefreshKey, setQuestStatsRefreshKey] = useState(false);
  const [currentTitle, setCurrentTitle] = useState(null);
  const [titleRefreshKey, setTitleRefreshKey] = useState(false);

  const fetchUserStats = async () => {
    const stats = await getUserStats();
    setUserStats(stats);
  };

  // 사용자 상태 불러오기
  useEffect(() => {
    fetchUserStats();
  }, []);

  // 퀘스트 완료 시: 경험치/레벨/코인 + 업적 업데이트
  const handleQuestCompleted = (updatedStats) => {
    if (userStats && updatedStats.level > userStats.level) {
      alert(`🎉 레벨 업! Lv.${updatedStats.level}이 되었습니다!`);
    }
    setUserStats(updatedStats);
    setQuestRefreshKey((prev) => !prev);
    setQuestStatsRefreshKey((prev) => !prev);
    setAchievementRefreshKey((prev) => !prev);
    setTitleRefreshKey((prev) => !prev);
  };

  // 퀘스트 삭제 시 (QuestList.jsx 안에서 호출)
  const handleQuestDeleted = () => {
    setQuestStatsRefreshKey((prev) => !prev);
  };

  // 보상 구매 시: 코인 감소 + 보관함 & 업적 반영
  const handleRewardBuy = (result) => {
    setUserStats((prev) => ({
      ...prev,
      coin: result.coin,
    }));
    setRewardRefreshKey((prev) => !prev);
    setAchievementRefreshKey((prev) => !prev);
    setTitleRefreshKey((prev) => !prev);
  };

  // 상태 초기화 시 전체 리셋
  const handleReset = () => {
    window.location.reload(); // 또는 상태 초기화 로직 분리 가능
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-6 text-center">🧠 Me Tycoon</h1>

        <UserStatus stats={userStats} />
        <SummaryStats refreshKey={questStatsRefreshKey} />
        <QuestStats refreshKey={questStatsRefreshKey} />
        <QuestHistoryChart refreshKey={questStatsRefreshKey} />
        <MonthlyStatsChart refreshKey={questStatsRefreshKey} />
        <QuestTypeChart refreshKey={questStatsRefreshKey} />
        <TopQuests refreshKey={questStatsRefreshKey} />
        <BestExpDay refereshKey={questStatsRefreshKey} />
        <BestCoinDay refreshKey={questStatsRefreshKey} />

        <UserTitles onChange={setCurrentTitle} refreshKey={titleRefreshKey} />
        <ResetButton onReset={handleReset} />

        <QuestForm onQuestCreated={() => setQuestRefreshKey((prev) => !prev)} />
        <QuestList onComplete={handleQuestCompleted} refreshKey={questRefreshKey} />

        <RewardShop onBuy={handleRewardBuy} />
        <MyRewards refreshKey={rewardRefreshKey} />

        <UserAchievements refreshKey={achievementRefreshKey} />

        <StatsPage refreshKey={questStatsRefreshKey} />

        <ThemeShop onBuyOrApply={fetchUserStats} />
      </div>
    </div>
  );
}

export default App;
