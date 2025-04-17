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

const StudentDetailSummaryChart = ({ data }) => {
  // Sort by year
  const sortedData = [...data].sort((a, b) => a.year - b.year);

  const years = sortedData.map((item) => item.year);

  const chartData = {
    labels: years,
    datasets: [
      {
        label: "With Stipend",
        data: sortedData.map((item) => item.with_stipend),
        borderColor: "#4CAF50",
        backgroundColor: "rgba(76, 175, 80, 0.3)",
        tension: 0.3,
        fill: true,
      },
      {
        label: "Without Stipend",
        data: sortedData.map((item) => item.without_stipend),
        borderColor: "#F44336",
        backgroundColor: "rgba(244, 67, 54, 0.3)",
        tension: 0.3,
        fill: true,
      },
    ],
  };

  return (
    <div style={{ width: "100%", height: "400px" }}>
      <Line data={chartData} />
    </div>
  );
};

export default StudentDetailSummaryChart;