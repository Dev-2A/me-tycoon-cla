import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { fetchUserInfo } from '../api/auth';

export default function Login({ onLoginSuccess }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:8000/api/token/", {
        username,
        password,
      });

      // Access / Refresh Token 저장
      localStorage.setItem("access_token", res.data.access);
      localStorage.setItem("refresh_token", res.data.refresh);

      // ✅ 로그인 성공 후 사용자 정보 받아오기
      const user = await fetchUserInfo();

      // ✅ 부모(App)에게 알림 (user 상태 업데이트)
      onLoginSuccess(user);

      alert("✅ 로그인 성공!");
      navigate("/"); // 홈 또는 원하는 페이지로 이동
    } catch (err) {
      alert("❌ 로그인 실패: " + err.response?.data?.detail || "서버 오류");
    }
  };

  return (
    <div className="p-4 max-w-sm mx-auto">
      <h2 className="text-xl font-bold mb-4">로그인</h2>
      <form onSubmit={handleLogin} className="flex flex-col gap-2">
        <input
          type="text"
          placeholder="아이디"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="border p-2 rounded"
          required
        />
        <input
          type="password"
          placeholder="비밀번호"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="border p-2 rounded"
          required
        />
        <button className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600">
          로그인
        </button>
      </form>
    </div>
  );
}
