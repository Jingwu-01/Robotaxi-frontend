"use client";

import { useState, useEffect } from "react";

export default function BatteryLevelsRank() {
  const [vehicles, setVehicles] = useState<
    { id: string; batteryLevel: number }[]
  >([]);

  useEffect(() => {
    const fetchBatteryLevels = async () => {
      try {
        const response = await fetch("http://localhost:5000/batteryLevels");
        const data = await response.json();

        if (data.status === "success") {
          const batteryData = data.data;

          const batteryArray = Object.entries(batteryData).map(
            ([id, batteryLevel]) => ({
              id,
              batteryLevel: Number(batteryLevel),
            })
          );

          // Sort vehicles by battery level in ascending order (lowest first)
          const sortedVehicles = batteryArray.sort(
            (a, b) => a.batteryLevel - b.batteryLevel
          );

          // Take top 10 vehicles with the lowest battery levels
          const top10Vehicles = sortedVehicles.slice(0, 10);

          setVehicles(top10Vehicles);
        } else {
          console.error("Error fetching data:", data.message || data.status);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchBatteryLevels();

    // Refresh data periodically
    const interval = setInterval(fetchBatteryLevels, 1000); // Fetch every 5 seconds

    return () => clearInterval(interval); // Cleanup on unmount
  }, []);

  // Find the maximum battery level among the top vehicles for scaling
  const maxBatteryLevel = vehicles.length
    ? Math.max(...vehicles.map((vehicle) => vehicle.batteryLevel))
    : 0;

  return (
    <div className="flex flex-col col-span-6 bg-gray-800 shadow-sm rounded-xl">
      <header className="px-5 py-4 border-b border-gray-700/60">
        <h2 className="font-semibold text-gray-100">
          Vehicle Battery Levels
        </h2>
      </header>

      <div className="grow p-3">
        <div className="flex flex-col h-full">
          <div className="grow">
            <ul className="flex justify-between text-xs uppercase text-gray-500 font-semibold px-2 space-x-2">
              <li>Vehicle ID</li>
              <li>Battery Level (%)</li>
            </ul>

            <ul className="space-y-1 text-sm text-gray-100 mt-3 mb-4">
              {vehicles.map((vehicle) => {
                // Calculate the width percentage for the bar
                const widthPercentage = (vehicle.batteryLevel / 100) * 100;

                // Round battery level to two decimal places
                const batteryLevelRounded = vehicle.batteryLevel.toFixed(2);

                // Determine bar color based on battery level
                let barColor = "bg-green-500/20";
                if (vehicle.batteryLevel < 20) {
                  barColor = "bg-red-500/20";
                } else if (vehicle.batteryLevel < 50) {
                  barColor = "bg-yellow-500/20";
                }

                return (
                  <li className="relative px-2 py-1" key={vehicle.id}>
                    <div
                      className={`absolute inset-0 ${barColor} rounded-r`}
                      aria-hidden="true"
                      style={{ width: `${widthPercentage}%` }}
                    ></div>
                    <div className="relative flex justify-between space-x-2">
                      <div>{vehicle.id}</div>
                      <div className="font-medium">
                        {batteryLevelRounded}%
                      </div>
                    </div>
                  </li>
                );
              })}
              {/* Handle case when no data is available */}
              {vehicles.length === 0 && (
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
