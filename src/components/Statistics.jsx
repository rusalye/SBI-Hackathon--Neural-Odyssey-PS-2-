import { Line } from "react-chartjs-2";
import { Chart as ChartJS, LineElement, CategoryScale, LinearScale, PointElement, Tooltip, Legend } from "chart.js";

ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement, Tooltip, Legend);

const Statistics = ({ data }) => {
  // Debugging: Log the received data
  console.log("Received Data:", data);

  if (!data || !Array.isArray(data) || data.length === 0) {
    return <p className="text-center text-gray-500">No data available</p>;
  }

  // Extract duration
  const durations = data.map((policy) => policy.duration).filter((d) => Number.isFinite(d) && d > 0);
  if (durations.length === 0) {
    return <p className="text-center text-gray-500">Invalid duration</p>;
  }

  const duration = Math.max(...durations);

  // Calculate cumulative interest over the years
  let cumulativeInterest = [];
  let totalInterest = 0;

  for (let year = 1; year <= duration; year++) {
    let yearlyInterest = data.reduce((sum, policy) => {
      if (!policy.totalBenefits || !policy.duration || policy.duration < year) return sum;
      return sum + policy.totalBenefits / policy.duration;
    }, 0);
    totalInterest += yearlyInterest;
    cumulativeInterest.push(totalInterest);
  }

  // Debugging: Log the cumulative interest data
  console.log("Cumulative Interest Data:", cumulativeInterest);

  if (cumulativeInterest.length === 0 || cumulativeInterest.every((v) => v === 0)) {
    return <p className="text-center text-gray-500">No interest data available</p>;
  }

  // Generate labels for each year
  const labels = Array.from({ length: duration }, (_, i) => `Year ${i + 1}`);

  const chartData = {
    labels: labels,
    datasets: [
      {
        label: "Cumulative Interest Over Time",
        data: cumulativeInterest,
        borderColor: "blue",
        backgroundColor: "rgba(0, 0, 255, 0.1)",
        fill: true,
        tension: 0.3,
      },
    ],
  };

  return (
    <div className="p-4 border rounded shadow" style={{ width: "100%", height: "400px" }}>
      <h2 className="text-xl font-bold mb-4">Cumulative Interest Growth Over Time</h2>
      <Line data={chartData} options={{ responsive: true, maintainAspectRatio: false }} />
    </div>
  );
};

export default Statistics;