"use client";

import { useState, useEffect } from "react";

export default function AnalyticsCard05() {
  const [vehicles, setVehicles] = useState<
    { id: string; consumption: number }[]
  >([]);
  const [numVehiclesToShow, setNumVehiclesToShow] = useState<number>(10);
  const [inputValue, setInputValue] = useState<string>("10");

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

    fetchConsumptionData();

    // Refresh data periodically
    const interval = setInterval(fetchConsumptionData, 1000); // Fetch every second

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

  // Find the maximum consumption among the vehicles for scaling
  const maxConsumption = vehicles.length
    ? Math.max(...vehicles.map((vehicle) => vehicle.consumption))
    : 0;

  return (
    <div className="flex flex-col col-span-12 bg-gray-800 shadow-sm rounded-xl">
      <header className="px-5 py-4 border-b border-gray-700/60">
        <h2 className="font-semibold text-gray-100">
          Electricity Consumption Rank
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
            <ul className="flex justify-between text-xs text-gray-500 font-semibold px-2 space-x-2">
              <li>Vehicle ID</li>
              <li>Electricity Consumption (Wh)</li>
            </ul>

            <ul className="space-y-1 text-sm text-gray-100 mt-3 mb-4">
              {vehicles.map((vehicle) => {
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
                      <div className="font-medium">{consumptionRounded} Wh</div>
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
