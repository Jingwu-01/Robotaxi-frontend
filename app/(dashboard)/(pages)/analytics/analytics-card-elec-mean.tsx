"use client";

import { useState, useEffect } from "react";
import { fetchElectricityConsumption } from "./util-elec-fetch";
import { computeMean } from "./util-statistics";

export default function MeanElectricityConsumption() {
  const [meanConsumption, setMeanConsumption] = useState<number>(0);

  useEffect(() => {
    const fetchData = async () => {
      const data = await fetchElectricityConsumption();
      const meanValue = computeMean(data);
      setMeanConsumption(Number(meanValue.toFixed(2))); 
    };

    fetchData();
    const interval = setInterval(fetchData, 1000); 

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex flex-col col-span-3 bg-gray-800 shadow-sm rounded-xl">
      <div className="px-5 pt-5">
        <header className="flex justify-between items-start mb-2">
          <h2 className="text-lg font-semibold text-gray-100 mb-2">Mean Electricity Consumption</h2>
        </header>
        <div className="flex items-start">
          <div className="text-3xl font-bold text-gray-100 mr-2">{meanConsumption} J</div>
        </div>
      </div>
    </div>
  );
}
