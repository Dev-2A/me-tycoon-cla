import { useState } from "react";
import { loginUser } from '../api/auth';

export default function Login({ onLogin }) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        const success = await loginUser(username, password);
        if (success) {
            alert("✅ 로그인 성공!");
            onLogin();
        } else {
            alert("❌ 로그인 실패. 아이디/비밀번호를 확인하세요.");
        }
    };

    return (
        <form
            onSubmit={handleSubmit}
            className="p-4 bg-white rounded shadow max-w-sm mx-auto mt-10"
        >
            <h2 className="text-lg font-bold mb-4">🔐 로그인</h2>
            <input className="border p-2 w-full mb-2" placeholder="아이디" value={username} onChange={(e) => setUsername(e.target.value)} />
            <input className="border p-2 w-full mb-2" placeholder="비밀번호" value={password} onChange={(e) => setPassword(e.target.value)} />
            <button className="bg-blue-600 text-white px-4 py-2 rounded w-full" type="submit">로그인</button>
        </form>
    );
}