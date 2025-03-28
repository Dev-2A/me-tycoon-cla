import axios from 'axios';
const BASE = 'http://localhost:8000/api';

export const getUserStats = async () => {
  const res = await axios.get(`${BASE}/stats/`);
  return res.data[0]; // 임시 고정 유저 기준
};

export const resetUserState = async () => {
  await axios.post(`${BASE}/reset/`);
};