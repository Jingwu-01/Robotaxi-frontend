"use client";

import { useState, useEffect } from "react";

export default function AnalyticsCard05() {
  const [topVehicles, setTopVehicles] = useState<
    { id: string; consumption: number }[]
  >([]);

  useEffect(() => {
    const fetchConsumptionData = async () => {
      try {
        const response = await fetch(
          "http://localhost:5000/electricityConsumption"
        );
        const data = await response.json();

        if (data.status === "success") {
          const consumptionData = data.data;

          // Convert consumption data to an array of objects
          const consumptionArray = Object.entries(consumptionData).map(
            ([id, consumption]) => ({
              id,
              consumption: Number(consumption),
            })
          );

          // Sort vehicles by consumption in descending order
          const sortedVehicles = consumptionArray.sort(
            (a, b) => b.consumption - a.consumption
          );

          // Take top 10 vehicles
          const top10Vehicles = sortedVehicles.slice(0, 10);

          setTopVehicles(top10Vehicles);
        } else {
          console.error("Error fetching data:", data.message || data.status);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchConsumptionData();

    // Optionally, refresh data periodically
    const interval = setInterval(fetchConsumptionData, 1000); // Fetch every 5 seconds

    return () => clearInterval(interval); // Cleanup on unmount
  }, []);

  // Find the maximum consumption among the top vehicles for scaling
  const maxConsumption = topVehicles.length
    ? Math.max(...topVehicles.map((vehicle) => vehicle.consumption))
    : 0;

  return (
    <div className="flex flex-col col-span-6 bg-gray-800 shadow-sm rounded-xl">
      <header className="px-5 py-4 border-b border-gray-700/60">
        <h2 className="font-semibold text-gray-100">
          Electricity Consumption Rank
        </h2>
      </header>

      <div className="grow p-3">
        <div className="flex flex-col h-full">
          <div className="grow">
            <ul className="flex justify-between text-xs uppercase text-gray-500 font-semibold px-2 space-x-2">
              <li>Vehicle ID</li>
              <li>Electricity Consumption (J)</li>
            </ul>

            <ul className="space-y-1 text-sm text-gray-100 mt-3 mb-4">
              {topVehicles.map((vehicle) => {
                // Calculate the width percentage
                const widthPercentage =
                  maxConsumption > 0
                    ? (vehicle.consumption / maxConsumption) * 100
                    : 0;

                // Round consumption to two decimal places
                const consumptionRounded = vehicle.consumption.toFixed(2);

                return (
                  <li className="relative px-2 py-1" key={vehicle.id}>
                    <div
                      className="absolute inset-0 bg-violet-500/20 rounded-r"
                      aria-hidden="true"
                      style={{ width: `${widthPercentage}%` }}
                    ></div>
                    <div className="relative flex justify-between space-x-2">
                      <div>{vehicle.id}</div>
                      <div className="font-medium">
                        {consumptionRounded} J
                      </div>
                    </div>
                  </li>
                );
              })}
              {/* Handle case when no data is available */}
              {topVehicles.length === 0 && (
                <li className="text-center text-gray-400 py-2">
                  No data available.
                </li>
              )}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
