import axios from 'axios';
const BASE_URL = 'http://localhost:8000/api';

export const getUserTitles = async () => {
    const res = await axios.get(`${BASE_URL}/user-titles/`);
    return res.data;
};

export const equipTitle = async (id) => {
    const res = await axios.post(`${BASE_URL}/user-titles/${id}/equip/`);
    return res.data;
};

export const unequipTitle = async (id) => {
    const res = await axios.post(`${BASE_URL}/user-titles/${id}/unequip/`);
    return res.data;
};