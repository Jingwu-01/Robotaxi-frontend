// Description: The Analytics Card Battery Max component in the Analytics page.
"use client";

import { useState, useEffect } from "react";
import { fetchBatteryLevels } from "./util-battery-fetch";
import { computeMax } from "./util-statistics";

export default function MaxBatteryLevel() {
  const [maxBatteryLevel, setMaxBatteryLevel] = useState<number>(0);

  // Fetch battery levels and compute the max value
  useEffect(() => {
    const fetchData = async () => {
      const data = await fetchBatteryLevels();
      const maxValue = computeMax(data);
      setMaxBatteryLevel(Number(maxValue.toFixed(2))); 
    };

    fetchData();
    const interval = setInterval(fetchData, 1000); // Update every second

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex flex-col col-span-3 bg-gray-800 shadow-sm rounded-xl">
      <div className="px-5 py-5">
        <header className="flex justify-between items-start mb-2">
          <h2 className="text-lg font-semibold text-gray-100 mb-2">Max Battery Level</h2>
        </header>
        <div className="flex items-start">
          <div className="text-3xl font-bold text-gray-100 mr-2">{maxBatteryLevel}%</div>
        </div>
      </div>
    </div>
  );
}
