"use client";

import { useState, useEffect } from "react";

interface PassengerUnsatisfactionResponse {
  status: string;
  data: {
    unsatisfaction_percentage?: number;
  };
}

export default function PassengerUnsatisfaction() {
  const [unsatisfactionPercentage, setUnsatisfactionPercentage] = useState<number>(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:5000/passengerUnsatisfaction");
        const data: PassengerUnsatisfactionResponse = await response.json();

        if (data.status === "success" && typeof data.data.unsatisfaction_percentage === "number") {
          const percentage = data.data.unsatisfaction_percentage;
          setUnsatisfactionPercentage(Number(percentage.toFixed(2)));
        } else {
          // You can remove or change this console call if you don't want overlays
          console.log("Non-success response or invalid data from the server.");
          setUnsatisfactionPercentage(0);
        }
      } catch (error) {
        // Consider changing console.error to console.log to avoid dev overlay
        console.log("Error fetching data:", error);
        setUnsatisfactionPercentage(0);
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
            Passenger Dissatisfaction Percentage
          </h2>
        </header>
        <div className="flex items-start">
          <div className="text-3xl font-bold text-gray-100 mr-2">
            {unsatisfactionPercentage}%
          </div>
        </div>
      </div>
    </div>
  );
}
