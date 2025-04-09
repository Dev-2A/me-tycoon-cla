import { useEffect, useState } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import { useTheme } from "./context/ThemeContext";
import { logout, fetchUserInfo } from "./api/auth";
import { getUserStats } from "./api/quests";

import MainLayout from "./components/layout/MainLayout";
import Register from "./pages/Register";
import Login from "./pages/Login";
import HomePage from "./pages/HomePage";
import StatsPage from "./pages/StatsPage";
import ProfilePage from "./pages/ProfilePage";
import SettingsPage from "./pages/SettingsPage";
import ShopPage from "./pages/ShopPage";

import PageTransition from "./components/layout/PageTransition";
import { ProfileProvider } from "./context/ProfileContext";

export default function App() {
  const [userStats, setUserStats] = useState(null);
  const [user, setUser] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem("access_token"));

  const { themeClass } = useTheme();
  const navigate = useNavigate();

  const fetchUserStats = async () => {
    const stats = await getUserStats();
    setUserStats(stats);
  };

  const fetchUser = async () => {
    const userData = await fetchUserInfo();
    setUser(userData);
  };

  const handleLogout = () => {
    logout();
    setUser(null);
    setIsLoggedIn(false);
    alert("👋 로그아웃 되었습니다.");
    navigate("/login");
  };

  const handleLoginSuccess = (userInfo) => {
    setUser(userInfo);
    setIsLoggedIn(true);
  };

  useEffect(() => {
    if (isLoggedIn) {
      fetchUserStats();
      fetchUser();
    }
  }, [isLoggedIn]);

  return (
    <ProfileProvider>
      <div className={`min-h-screen ${themeClass}`}>
        <MainLayout user={user} onLogout={handleLogout}>
          <PageTransition>
            <Routes>
              <Route
                path="/"
                element={
                  isLoggedIn ? <HomePage user={user} stats={userStats} /> : <Login onLoginSuccess={handleLoginSuccess} />
                }
              />
              <Route path="/login" element={<Login onLoginSuccess={handleLoginSuccess} />} />
              <Route path="/register" element={<Register />} />
              <Route path="/profile" element={<ProfilePage />} />
              <Route path="/settings" element={<SettingsPage />} />
              <Route path="/shop" element={<ShopPage />} />
              <Route path="/stats" element={<StatsPage />} />
            </Routes>
          </PageTransition>
        </MainLayout>
      </div>
    </ProfileProvider>
  );
}
