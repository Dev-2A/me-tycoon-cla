import axios from 'axios';
const BASE_URL = 'http://localhost:8000/api';

export const getQuestStats = async () => {
  const res = await axios.get(`${BASE_URL}/quest-stats/`);
  return res.data;
};

export const getQuestHistory = async () => {
  const res = await axios.get(`${BASE_URL}/quest-history/`);
  return res.data;
};

export const getMonthlyStats = async () => {
  const res = await axios.get(`${BASE_URL}/monthly-stats/`);
  return res.data;
};

export const getQuestTypeStats = async () => {
  const res = await axios.get(`${BASE_URL}/quest-type-stats/`);
  return res.data;
};

export const getTopQuests = async () => {
  const res = await axios.get(`${BASE_URL}/top-quests/`);
  return res.data;
};

export const getBestExpDay = async () => {
  const res = await axios.get(`${BASE_URL}/best-exp-day/`);
  return res.data;
};

export const getBestCoinSpentDay = async () => {
  const res = await axios.get(`${BASE_URL}/best-coin-day/`);
  return res.data;
};

export const getSummaryStats = async () => {
  const res = await axios.get(`${BASE_URL}/summary-stats/`);
  return res.data;
};