import SummaryStats from '../components/SummaryStats';
import QuestTypeChart from '../components/QuestTypeChart';
import TopQuests from '../components/TopQuests';
import BestExpDay from '../components/BestExpDay';
import BestCoinDay from '../components/BestCoinDay';
import MonthlyStatsChart from '../components/MonthlyStatsChart';
import QuestHistoryChart from '../components/QuestHistoryChart';

export default function StatsPage({ refreshKey }) {
    return (
        <div className='min-h-screen bg-gray-100 p-4'>
            <div className='max-w-6x1 mx-auto'>
                <h1 className='text-3x1 font-bold mb-6 text-center'>📊 통계 대시보드</h1>

                <div className='mb-8'>
                    <SummaryStats refreshKey={refreshKey} />
                </div>

                <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-8'>
                    <TopQuests refreshKey={refreshKey} />
                    <BestExpDay refereshKey={refreshKey} />
                    <BestCoinDay refreshKey={refreshKey} />
                </div>

                <div className='grid grid-cols-1 lg:grid-cols-2 gap-6'>
                    <MonthlyStatsChart refreshKey={refreshKey} />
                    <QuestHistoryChart refreshKey={refreshKey} />
                </div>

                <div className='mt-8'>
                    <QuestTypeChart refreshKey={refreshKey} />
                </div>
            </div>
        </div>
    );
}