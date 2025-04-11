import React from 'react';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const StipendBarChart = ({ data }) => {
  // `data` should be an object like:
  // {
  //   CSE: { highest: 12000, avg: 8000, lowest: 5000 },
  //   CSBS: { highest: 10000, avg: 7000, lowest: 4000 },
  //   CSF: { highest: 11000, avg: 7500, lowest: 4500 },
  //   AIDS: { highest: 10500, avg: 7200, lowest: 4800 }
  // }

  const departments = Object.keys(data);
  const department = ["CSE", "CSBS", "AIDS", "CSF"]


  const chartData = {
    labels: department,
    datasets: [
      {
        label: 'Highest',
        data: departments.map(dep => parseInt(data[dep].highest)),
        backgroundColor: '#4caf50',
        borderColor: '#388e3c',
        borderWidth: 1,
        borderRadius: 8,
      },
      {
        label: 'Average',
        data: departments.map(dep => parseInt(data[dep].avg)),
        backgroundColor: '#2196f3',
        borderColor: '#1976d2',
        borderWidth: 1,
        borderRadius: 8,
      },
      {
        label: 'Lowest',
        data: departments.map(dep => parseInt(data[dep].lowest)),
        backgroundColor: '#f44336',
        borderColor: '#d32f2f',
        borderWidth: 1,
        borderRadius: 8,
      }
    ]
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top'
      },
      title: {
        display: true,
        text: 'Department-wise Stipend Distribution'
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
