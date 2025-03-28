import axios from 'axios';
const BASE = 'http://localhost:8000/api';

export const getUserAchievements = async () => {
  const res = await axios.get(`${BASE}/user-achievements/`);
  return res.data;
};