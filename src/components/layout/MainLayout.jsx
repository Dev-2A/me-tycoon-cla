import { Link, useNavigate } from "react-router-dom";
import { useTheme } from "../../context/ThemeContext";
import ThemedButton from "../common/ThemedButton";

export default function MainLayout({ children, user, onLogout }) {
  const { themeClass } = useTheme();
  const navigate = useNavigate();

  return (
    <div className={`min-h-screen p-4 ${themeClass}`}>
      <header className="max-w-5xl mx-auto flex justify-between items-center mb-6">
        <h1 className="text-2xl sm:text-3xl font-bold">
          <Link to="/">🧠 Me Tycoon</Link>
        </h1>
        <nav className="flex items-center gap-4 text-sm">
          {user ? (
            <>
              <span className="text-gray-700 font-semibold">👤 {user.username}</span>
              <Link to="/profile" className="text-blue-600 hover:underline">
                내 프로필
              </Link>
              <ThemedButton onClick={onLogout}>로그아웃</ThemedButton>
            </>
          ) : (
            <>
              <Link to="/login" className="text-blue-600 hover:underline">
                로그인
              </Link>
              <Link to="/register" className="text-blue-600 hover:underline">
                회원가입
              </Link>
            </>
          )}
        </nav>
      </header>
      <main className="max-w-5xl mx-auto">{children}</main>
    </div>
  );
}