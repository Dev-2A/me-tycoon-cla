// src/components/common/ThemedCard.jsx
import clsx from "clsx";
import { useTheme } from '../../context/ThemeContext';

export default function ThemedCard({ children, className = '', as: Component = 'div', ...props }) {
  const { themeColor } = useTheme();

  const baseStyle = 'rounded shadow p-4 mb-6';
  const themeStyles = {
    classic: 'bg-white',
    dark: 'bg-gray-800 text-white',
    forest: 'bg-green-100',
    neon: 'bg-black text-lime-400',
    pastel: 'bg-pink-100',
    ocean: 'bg-blue-100',
    galaxy: 'bg-indigo-950 text-white',
    gold: 'bg-yellow-100',
    matrix: 'bg-black text-green-500',
    vintage: 'bg-yellow-50',
    bubblegum: 'bg-pink-200',
    sunset: 'bg-orange-100',
  };

  return (
    <Component className={clsx(baseStyle, themeStyles[themeColor], className)} {...props}>
      {children}
    </Component>
  );
}
