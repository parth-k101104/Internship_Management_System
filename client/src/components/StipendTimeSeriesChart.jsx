import React from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  LineElement,
  PointElement,
  CategoryScale,
  LinearScale,
  Legend,
  Tooltip,
} from "chart.js";

ChartJS.register(LineElement, PointElement, CategoryScale, LinearScale, Legend, Tooltip);

const StipendTimeSeriesChart = ({ data }) => {
  // Sort the data array by year in ascending order
  const sortedData = [...data].sort((a, b) => a.year - b.year); 

  const years = sortedData.map((item) => item.year);

  const chartData = {
    labels: years,
    datasets: [
      {
        label: "Highest Stipend",
        data: sortedData.map((item) => item.highest_stipend),
        borderColor: "green",
        fill: false,
      },
      {
        label: "Average Stipend",
        data: sortedData.map((item) => item.avg_stipend),
        borderColor: "blue",
        fill: false,
      },
      {
        label: "Lowest Stipend",
        data: sortedData.map((item) => item.lowest_stipend),
        borderColor: "red",
        fill: false,
      },
    ],
  };

  return <Line data={chartData} />;
};

export default StipendTimeSeriesChart;
