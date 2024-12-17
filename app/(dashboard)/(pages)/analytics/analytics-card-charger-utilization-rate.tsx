"use client";

import { useState, useEffect } from "react";

interface ActiveChargersResponse {
  status: string;
  data: {
    active_chargers: number;
  };
}

export default function ChargerUtilization() {
  const [rate, setRate] = useState<number>(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch the number of active chargers
        const response1 = await fetch("http://localhost:5000/activeChargers");
        const data: ActiveChargersResponse = await response1.json();
        let activeChargersCount = 0;
        if (data.status === "success") {
          activeChargersCount = data.data.active_chargers;
        }

        // Fetch the total number of chargers
        const response2 = await fetch("http://localhost:5000/status");
        const result = await response2.json();
        let chargingStationCount = 0;
        if (result.status === "success") {
          chargingStationCount = result.data.num_chargers;
        }

        // Calculate the utilization rate
        if (chargingStationCount > 0) {
          const utilizationRate =
            (activeChargersCount / chargingStationCount) * 100;
          setRate(Number(utilizationRate.toFixed(2)));
        } else {
          setRate(0); // Avoid division by zero
        }
      } catch (error) {
        console.error("Error fetching data:", error);
        setRate(0);
      }
    };

    fetchData();
    const interval = setInterval(fetchData, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex flex-col col-span-3 bg-gray-800 shadow-sm rounded-xl">
      <div className="px-5 py-5">
        <header className="flex justify-between items-start mb-2">
          <h2 className="text-lg font-semibold text-gray-100 mb-2">
            Charger Utilization Rate
          </h2>
        </header>
        <div className="flex items-start">
          <div className="text-3xl font-bold text-gray-100 mr-2">{rate}%</div>
        </div>
      </div>
    </div>
  );
}
