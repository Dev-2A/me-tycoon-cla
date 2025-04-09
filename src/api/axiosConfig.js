import axios from "axios";

const axiosInstance = axios.create({
    baseURL: 'http://localhost:8000/api',
    withCredentials: true,
});

// ✅ 요청마다 자동으로 access_token 포함
axiosInstance.interceptors.request.use((config) => {
    const token = localStorage.getItem('access_token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

export default axiosInstance;