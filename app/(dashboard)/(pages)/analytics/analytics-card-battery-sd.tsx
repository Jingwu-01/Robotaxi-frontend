"use client";

import { useState, useEffect } from "react";
import { fetchBatteryLevels } from "./util-battery-fetch";
import { computeStdDev } from "./util-statistics";

export default function StdDevBatteryLevel() {
  const [stdDevBatteryLevel, setStdDevBatteryLevel] = useState<number>(0);

  useEffect(() => {
    const fetchData = async () => {
      const data = await fetchBatteryLevels();
      const stdDevValue = computeStdDev(data);
      setStdDevBatteryLevel(Number(stdDevValue.toFixed(2)));
    };

    fetchData();
    const interval = setInterval(fetchData, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex flex-col col-span-3 bg-gray-800 shadow-sm rounded-xl">
      <div className="px-5 pt-5">
        <header className="flex justify-between items-start mb-2">
          <h2 className="text-lg font-semibold text-gray-100 mb-2">
            Std Dev Battery Level
          </h2>
        </header>
        <div className="flex items-start">
          <div className="text-3xl font-bold text-gray-100 mr-2">{stdDevBatteryLevel}%</div>
        </div>
      </div>
    </div>
  );
}
