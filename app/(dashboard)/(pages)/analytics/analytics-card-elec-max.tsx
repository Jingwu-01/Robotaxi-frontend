// Description: Max electricity consumption card for the analytics page.
"use client";

import { useState, useEffect } from "react";
import { fetchElectricityConsumption } from "./util-elec-fetch";
import { computeMax } from "./util-statistics";

export default function MaxElectricityConsumption() {
  const [maxConsumption, setMaxConsumption] = useState<number>(0);

  // Fetch data and compute max consumption
  useEffect(() => {
    const fetchData = async () => {
      const data = await fetchElectricityConsumption();
      const maxValue = computeMax(data);
      setMaxConsumption(Number(maxValue.toFixed(2))); // Round to two decimal places
    };

    fetchData();
    const interval = setInterval(fetchData, 1000); // Update every 5 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex flex-col col-span-3 bg-gray-800 shadow-sm rounded-xl">
      <div className="px-5 py-5">
        <header className="flex justify-between items-start mb-2">
          <h2 className="text-lg font-semibold text-gray-100 mb-2">Max Electricity Consumption</h2>
        </header>
        <div className="flex items-start">
          <div className="text-3xl font-bold text-gray-100 mr-2">{maxConsumption} Wh</div>
        </div>
      </div>
    </div>
  );
}
