import { createContext, useContext, useState, useEffect } from 'react';

const ThemeContext = createContext();

const DEFAULT_THEME = "classic";

export const ThemeProvider = ({ children }) => {
  const [themeName, setThemeName] = useState(DEFAULT_THEME);

  // ✅ 처음 렌더링 시 localStorage에서 테마 불러오기
  useEffect(() => {
    const savedTheme = localStorage.getItem("selected_theme");
    if (savedTheme) {
      setThemeName(savedTheme);
    }
  }, []);

  // ✅ 테마 변경 함수
  const applyTheme = (name) => {
    setThemeName(name);
    localStorage.setItem("selected_theme", name); // 💾 저장
  };

  // ✅ tailwind에서 사용하는 CSS 클래스 이름
  const themeClass = `theme-${themeName}`

  // 선택된 테마 색상 (색상 이름 등도 활용 가능하다면 이곳에서 관리)
  const themeColor = themeName;

  return (
    <ThemeContext.Provider value={{ themeName, themeClass, themeColor, applyTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export const useTheme = () => useContext(ThemeContext);