"use client";

import { useState, useEffect } from "react";
import { fetchBatteryLevels } from "./b-fetch";
import { computeMin } from "./statistics";

export default function MinBatteryLevel() {
  const [minBatteryLevel, setMinBatteryLevel] = useState<number>(0);

  useEffect(() => {
    const fetchData = async () => {
      const data = await fetchBatteryLevels();
      const minValue = computeMin(data);
      setMinBatteryLevel(Number(minValue.toFixed(2))); // Round to two decimal places
    };

    fetchData();
    const interval = setInterval(fetchData, 1000); // Update every second

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex flex-col col-span-3 bg-gray-800 shadow-sm rounded-xl">
      <div className="px-5 pt-5">
        <header className="flex justify-between items-start mb-2">
          <h2 className="text-lg font-semibold text-gray-100 mb-2">Min Battery Level</h2>
        </header>
        <div className="flex items-start">
          <div className="text-3xl font-bold text-gray-100 mr-2">{minBatteryLevel}%</div>
        </div>
      </div>
    </div>
  );
}
