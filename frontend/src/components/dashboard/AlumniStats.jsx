import { motion } from 'framer-motion';
import { useGetAlumniStatsQuery } from '../../redux/features/api/userApi';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const AlumniStats = () => {
  const { data: stats } = useGetAlumniStatsQuery();

  const data = {
    labels: stats?.majors.map(major => major.name) || [],
    datasets: [
      {
        label: 'Alumni by Major',
        data: stats?.majors.map(major => major.count) || [],
        backgroundColor: 'rgba(59, 130, 246, 0.7)',
        borderColor: 'rgba(59, 130, 246, 1)',
        borderWidth: 1
      }
    ]
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top'
      }
    },
    scales: {
      y: {
        beginAtZero: true
      }
    }
  };

  return (
    <motion.div
      className="bg-white rounded-xl shadow-sm p-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.4 }}
    >
      <h2 className="text-xl font-bold mb-6">Alumni Distribution</h2>
      <div className="h-64">
        {stats ? (
          <Bar data={data} options={options} />
        ) : (
          <div className="h-full bg-gray-100 rounded-lg animate-pulse" />
        )}
      </div>
      <p className="text-xs text-gray-500 mt-4 text-center">
        Data based on registered alumni profiles
      </p>
    </motion.div>
  );
};

export default AlumniStats;