import { useEffect, useState } from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';

import QuestForm from './components/QuestForm';
import QuestList from './components/QuestList';
import ResetButton from './components/ResetButton';
import RewardShop from './components/RewardShop';
import MyRewards from './components/MyRewards';
import UserStatus from './components/UserStatus';
import UserAchievements from './components/UserAchievements';
import UserTitles from './components/UserTitles';
import ThemeShop from './components/ThemeShop';

import QuestStats from './components/QuestStats';
import QuestHistoryChart from './components/QuestHistoryChart';
import MonthlyStatsChart from './components/MonthlyStatsChart';
import QuestTypeChart from './components/QuestTypeChart';
import TopQuests from './components/TopQuests';
import BestExpDay from './components/BestExpDay';
import BestCoinDay from './components/BestCoinDay';
import SummaryStats from './components/SummaryStats';
import StatsPage from './pages/StatsPage';

import Register from './pages/Register';
import Login from './pages/Login';

import { getUserStats } from './api/quests';
import { logout, fetchUserInfo } from './api/auth';
import { useTheme } from './context/ThemeContext';

function App() {
  const [userStats, setUserStats] = useState(null);
  const [questRefreshKey, setQuestRefreshKey] = useState(false);
  const [rewardRefreshKey, setRewardRefreshKey] = useState(false);
  const [achievementRefreshKey, setAchievementRefreshKey] = useState(false);
  const [questStatsRefreshKey, setQuestStatsRefreshKey] = useState(false);
  const [titleRefreshKey, setTitleRefreshKey] = useState(false);
  const [currentTitle, setCurrentTitle] = useState(null);
  const [user, setUser] = useState(null);
  const{ themeClass, setThemeClass} = useTheme();

  const navigate = useNavigate();
  const isLoggedIn = !!localStorage.getItem('access_token');

  const fetchUserStats = async () => {
    const stats = await getUserStats();
    setUserStats(stats);

    if (stats.applied_theme?.bg_class) {
      setThemeClass(stats.applied_theme.bg_class);
    }
  };

  const fetchUser = async () => {
    const userData = await fetchUserInfo();
    setUser(userData);
  };

  useEffect(() => {
    if (isLoggedIn) {
      fetchUserStats();
      fetchUser();
    }
  }, [isLoggedIn]);

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

  const handleRewardBuy = (result) => {
    setUserStats((prev) => ({
      ...prev,
      coin: result.coin,
    }));
    setRewardRefreshKey((prev) => !prev);
    setAchievementRefreshKey((prev) => !prev);
    setTitleRefreshKey((prev) => !prev);
  };

  const handleReset = () => {
    window.location.reload();
  };

  const handleLogout = () => {
    logout();
    alert("👋 로그아웃 되었습니다.");
    setUser(null); // 상태 초기화
    navigate("/login");
  };

  return (
    <div className={`min-h-screen p-4 ${themeClass}`}>
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">🧠 Me Tycoon</h1>
          {!isLoggedIn && (
            <button
              onClick={() => navigate("/login")}
              className="text-sm text-blue-600 hover:underline"
            >
              로그인
            </button>
          )}
          {isLoggedIn && user && (
            <div className="flex items-center gap-4">
              <span className="text-sm text-gray-700">
                환영합니다, <span className="font-semibold">{user.username}</span> 님
              </span>
              <button
                className="text-sm text-gray-600 hover:underline"
                onClick={handleLogout}
              >
                로그아웃
              </button>
            </div>
          )}
        </div>

        <Routes>
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login onLoginSuccess={setUser} />} />
          <Route
            path="/"
            element={
              isLoggedIn ? (
                <>
                  <UserStatus stats={userStats} />
                  <SummaryStats refreshKey={questStatsRefreshKey} />
                  <QuestStats refreshKey={questStatsRefreshKey} />
                  <QuestHistoryChart refreshKey={questStatsRefreshKey} />
                  <MonthlyStatsChart refreshKey={questStatsRefreshKey} />
                  <QuestTypeChart refreshKey={questStatsRefreshKey} />
                  <TopQuests refreshKey={questStatsRefreshKey} />
                  <BestExpDay refreshKey={questStatsRefreshKey} />
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
                </>
              ) : (
                <Login onLoginSuccess={setUser} />
              )
            }
          />
        </Routes>
      </div>
    </div>
  );
}

export default App;
