import axios from './axiosConfig';

export async function login(username, password) {
  const res = await axios.post('http://localhost:8000/api/token/', {
    username,
    password,
  });

  const { access, refresh } = res.data;
  localStorage.setItem('access_token', access);
  localStorage.setItem('refresh_token', refresh);
  axios.defaults.headers.common['Authorization'] = `Bearer ${access}`;

  return access;
}

export function logout() {
  localStorage.removeItem('access_token');
  localStorage.removeItem('refresh_token');
  delete axios.defaults.headers.common['Authorization'];
}

export async function fetchUserInfo() {
  try {
    const res = await axios.get("/api/user-info/");
    return res.data;
  } catch (err) {
    console.error("❌ 사용자 정보 불러오기 실패:", err)
    return null;
  }
}