import axios from 'axios';
const BASE = 'http://localhost:8000/api';

export const getRewards = async () => {
  const res = await axios.get(`${BASE}/rewards/`);
  return res.data;
};

export const buyReward = async (id) => {
  const res = await axios.post(`${BASE}/user-rewards/`, { reward: id });
  return res.data;
};

export const getUserRewards = async () => {
  const res = await axios.get(`${BASE}/user-rewards/`);
  return res.data;
};

export const useReward = async (userRewardId) => {
  await axios.delete(`${BASE}/user-rewards/${userRewardId}/`);
};