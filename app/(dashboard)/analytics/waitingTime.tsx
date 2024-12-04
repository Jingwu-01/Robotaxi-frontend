"use client";

import { useState, useEffect } from "react";
import LineChart01 from "@/components/charts/line-chart-01"; // Adjust the import path as needed

export default function AverageWaitTimeChart() {
  const [averageWaitTimes, setAverageWaitTimes] = useState<number[]>([]);
  const [labels, setLabels] = useState<string[]>([]);

  useEffect(() => {
    const fetchAverageWaitTime = async () => {
      try {
        const response = await fetch("http://localhost:5000/averagePassengerWaitTime");
        const data = await response.json();

        if (data.status === "success") {
          const averageWaitTime = data.data.average_wait_time;

          // Update the state with new data
          setAverageWaitTimes((prevData) => [...prevData.slice(-49), averageWaitTime]);
          setLabels((prevLabels) => [
            ...prevLabels.slice(-49),
            new Date().toISOString(), // Use ISO string for consistent date format
          ]);
        } else {
          console.error("Error fetching data:", data.message || data.status);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchAverageWaitTime();

    // Fetch data every 5 seconds
    const interval = setInterval(fetchAverageWaitTime, 5000);

    return () => clearInterval(interval);
  }, []);

  // Prepare chart data
  const data = {
    labels: labels, // ISO date strings
    datasets: [
      {
        data: averageWaitTimes,
        fill: true,
        backgroundColor: 'rgba(99, 102, 241, 0.2)', // Tailwind violet-500 at 20% opacity
        borderColor: '#6366F1', // Tailwind violet-500
        borderWidth: 2,
        pointRadius: 0,
        pointHoverRadius: 3,
        tension: 0.2,
      },
    ],
  };

  return (
    <div className="flex flex-col col-span-3 bg-white dark:bg-gray-800 shadow-sm rounded-xl">
      <header className="px-5 py-4 border-gray-700/60 flex items-center">
        <h2 className="font-semibold text-gray-100">Average Passenger Wait Time</h2>
      </header>
      <div className="p-5">
        {/* Display the latest average wait time */}
        <div className="text-3xl font-bold text-gray-100 mb-4">
          {averageWaitTimes.length > 0
            ? `${averageWaitTimes[averageWaitTimes.length - 1].toFixed(2)} seconds`
            : "Loading..."}
        </div>
      </div>
    </div>
  );
}
