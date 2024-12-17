"use client";

import { useState, useEffect } from "react";

export default function BatteryLevelsRank() {
  const [vehicles, setVehicles] = useState<
    { id: string; batteryLevel: number }[]
  >([]);
  const [numVehiclesToShow, setNumVehiclesToShow] = useState<number>(10);
  const [inputValue, setInputValue] = useState<string>("10");

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

          // Take the number of vehicles specified by the user
          const vehiclesToShow = sortedVehicles.slice(0, numVehiclesToShow);

          setVehicles(vehiclesToShow);
        } else {
          console.error("Error fetching data:", data.message || data.status);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchBatteryLevels();

    // Refresh data periodically
    const interval = setInterval(fetchBatteryLevels, 1000); // Fetch every second

    return () => clearInterval(interval); // Cleanup on unmount
  }, [numVehiclesToShow]);

  // Handler for the input field change
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  // Handler for the button click
  const handleButtonClick = () => {
    const num = parseInt(inputValue, 10);
    if (!isNaN(num) && num > 0) {
      setNumVehiclesToShow(num);
    } else {
      // Handle invalid input (e.g., show an error message)
      alert("Please enter a valid positive number.");
    }
  };

  return (
    <div className="flex flex-col col-span-12 bg-gray-800 shadow-sm rounded-xl">
      <header className="px-5 py-4 border-b border-gray-700/60">
        <h2 className="font-semibold text-gray-100">
          Vehicle Battery Levels
        </h2>
      </header>

      <div className="grow p-3">
        <div className="flex flex-col h-full">
          {/* Input and Button to specify number of vehicles */}
          <div className="flex items-center space-x-2 mb-4">
            <input
              type="number"
              min="1"
              value={inputValue}
              onChange={handleInputChange}
              className="w-16 px-2 py-1 bg-gray-700 text-gray-100 rounded"
            />
            <button
              onClick={handleButtonClick}
              className="px-3 py-1 bg-violet-500 text-white rounded hover:bg-violet-600"
            >
              Show
            </button>
          </div>

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
