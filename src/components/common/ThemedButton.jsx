// src/components/common/ThemedButton.jsx
import clsx from "clsx";
import { useTheme } from '../../context/ThemeContext';

export default function ThemedButton({
  children,
  onClick,
  className = '',
  type = 'button',
  variant = 'primary', // primary, secondary, danger
}) {
  const { themeColor } = useTheme();

  const baseStyle = 'px-4 py-2 rounded font-semibold text-sm transition duration-200 transform active:scale-95 hover:scale-105';

  const themeButtonStyles = {
    primary: {
      classic: 'bg-blue-500 text-white hover:bg-blue-600',
      dark: 'bg-gray-700 text-white hover:bg-gray-600',
      forest: 'bg-green-500 text-white hover:bg-green-600',
      neon: 'bg-lime-400 text-black hover:bg-lime-500',
      pastel: 'bg-pink-300 text-white hover:bg-pink-400',
      ocean: 'bg-blue-400 text-white hover:bg-blue-500',
      galaxy: 'bg-indigo-700 text-white hover:bg-indigo-800',
      gold: 'bg-yellow-400 text-white hover:bg-yellow-500',
      matrix: 'bg-green-700 text-white hover:bg-green-800',
      vintage: 'bg-yellow-600 text-white hover:bg-yellow-700',
      bubblegum: 'bg-pink-400 text-white hover:bg-pink-500',
      sunset: 'bg-orange-400 text-white hover:bg-orange-500',
    },
    secondary: {
      classic: 'bg-white border border-blue-500 text-blue-500 hover:bg-blue-50',
      dark: 'bg-gray-800 border border-gray-500 text-white hover:bg-gray-700',
      forest: 'bg-white border border-green-500 text-green-500 hover:bg-green-50',
      neon: 'bg-black border border-lime-400 text-lime-400 hover:bg-lime-800',
      pastel: 'bg-white border border-pink-300 text-pink-400 hover:bg-pink-100',
      ocean: 'bg-white border border-blue-400 text-blue-500 hover:bg-blue-50',
      galaxy: 'bg-black border border-indigo-700 text-indigo-300 hover:bg-indigo-900',
      gold: 'bg-white border border-yellow-400 text-yellow-500 hover:bg-yellow-100',
      matrix: 'bg-black border border-green-600 text-green-400 hover:bg-green-800',
      vintage: 'bg-white border border-yellow-600 text-yellow-700 hover:bg-yellow-50',
      bubblegum: 'bg-white border border-pink-400 text-pink-500 hover:bg-pink-100',
      sunset: 'bg-white border border-orange-400 text-orange-500 hover:bg-orange-100',
    },
    danger: {
      classic: 'bg-red-500 text-white hover:bg-red-600',
      dark: 'bg-red-600 text-white hover:bg-red-500',
      forest: 'bg-red-400 text-white hover:bg-red-500',
      neon: 'bg-red-600 text-white hover:bg-red-500',
      pastel: 'bg-red-400 text-white hover:bg-red-500',
      ocean: 'bg-red-500 text-white hover:bg-red-600',
      galaxy: 'bg-red-700 text-white hover:bg-red-800',
      gold: 'bg-red-500 text-white hover:bg-red-600',
      matrix: 'bg-red-700 text-white hover:bg-red-600',
      vintage: 'bg-red-500 text-white hover:bg-red-600',
      bubblegum: 'bg-red-400 text-white hover:bg-red-500',
      sunset: 'bg-red-500 text-white hover:bg-red-600',
    }
  };

  return (
    <button
      onClick={onClick}
      type={type}
      className={clsx(
        baseStyle,
        themeButtonStyles[variant][themeColor],
        'hover:scale-105',
        className)}
    >
      {children}
    </button>
  );
}
