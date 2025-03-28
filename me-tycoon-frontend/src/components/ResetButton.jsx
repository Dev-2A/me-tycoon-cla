import { resetUserState } from '../api/user';

export default function ResetButton({ onReset }) {
  const handleClick = async () => {
    if (confirm('정말 모든 상태를 초기화할까요?')) {
      await resetUserState();
      alert('초기화 완료!');
      if (onReset) onReset();
    }
  };

  return (
    <div className="mb-4">
      <button onClick={handleClick} className="bg-gray-600 text-white px-4 py-2 rounded hover:bg-gray-800">
        🔄 상태 초기화
      </button>
    </div>
  );
}