import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        "http://localhost:8000/api/register/",
        { username, password },
        { withCredentials: true }
      );

      alert("🎉 회원가입 성공!");
      navigate("/"); // 또는 "/login" 페이지가 있다면 이동
    } catch (err) {
      const errorMsg = err.response?.data?.error || "알 수 없는 오류가 발생했습니다.";
      alert("❌ 회원가입 실패: " + errorMsg);
    }
  };

  return (
    <div className="p-4 max-w-sm mx-auto">
      <h2 className="text-xl font-bold mb-4">회원가입</h2>
      <form onSubmit={handleRegister} className="flex flex-col gap-2">
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
          회원가입
        </button>
      </form>
    </div>
  );
}
