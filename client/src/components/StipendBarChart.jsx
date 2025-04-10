import React from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const StipendBarChart = ({ data }) => {
  const chartData = {
    labels: ["Highest", "Average", "Lowest"],
    datasets: [
      {
        label: 'Stipend Distribution',
        data: [
          parseInt(data.highest_stipend),
          parseInt(data.avg_stipend),
          parseInt(data.lowest_stipend)
        ],
        backgroundColor: ['#4caf50', '#2196f3', '#f44336'],
        borderColor: ['#388e3c', '#1976d2', '#d32f2f'],
        borderWidth: 2,
        borderRadius: 20,
        borderSkipped: false
      }
    ]
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: false
      },
      tooltip: {
        mode: 'index',
        intersect: false
      }
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          stepSize: 1000 
        }
      }
    }
  };

  return <Bar data={chartData} options={options} />;
};

export default StipendBarChart;