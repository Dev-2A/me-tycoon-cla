import axios from 'axios';

export async function getThemes() {
    const res = await fetch('http://localhost:8000/api/themes/', {
        credentials: 'include',
    });

    if (!res.ok) {
        throw new Error('테마 불러오기 실패');
    }

    const data = await res.json()
    return data;
}

export async function buyTheme(themeId) {
    try {
        const res = await axios.post(`/api/themes/${themeId}/buy/`);
        return res.status === 200;
    } catch {
        alert('❌ 테마 구매에 실패했습니다.');
        return false;
    }
}

export async function applyTheme(themeId) {
    try {
        const res = await axios.post(`/api/themes/${themeId}/apply/`);
        return res.status === 200;
    } catch {
        alert('❌ 테마 적용에 실패했습니다.');
        return false;
    }
}