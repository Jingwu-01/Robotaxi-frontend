"use client";

import { useState, useEffect } from "react";
import { fetchBatteryLevels } from "./b-fetch";
import { computeMean } from "./statistics";

export default function MeanBatteryLevel() {
  const [meanBatteryLevel, setMeanBatteryLevel] = useState<number>(0);

  useEffect(() => {
    const fetchData = async () => {
      const data = await fetchBatteryLevels();
      const meanValue = computeMean(data);
      setMeanBatteryLevel(Number(meanValue.toFixed(2)));
    };

    fetchData();
    const interval = setInterval(fetchData, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex flex-col col-span-3 bg-gray-800 shadow-sm rounded-xl">
      <div className="px-5 pt-5">
        <header className="flex justify-between items-start mb-2">
          <h2 className="text-lg font-semibold text-gray-100 mb-2">Mean Battery Level</h2>
        </header>
        <div className="flex items-start">
          <div className="text-3xl font-bold text-gray-100 mr-2">{meanBatteryLevel}%</div>
        </div>
      </div>
    </div>
  );
}
