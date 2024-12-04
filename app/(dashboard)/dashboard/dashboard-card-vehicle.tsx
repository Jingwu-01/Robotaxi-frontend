"use client";

import { useState, useEffect } from "react";
import RealtimeChart from "@/components/charts/realtime-chart-vehicles";
import { chartAreaGradient } from "@/components/charts/chartjs-config";
import { tailwindConfig, hexToRGB } from "@/components/utils/utils";

interface TaxisWithPassengersResponse {
  status: string;
  data: {
    taxis_with_passengers: number;
  };
}

export default function DashboardCard_Vehicles() {
  const [chartData, setChartData] = useState<number[]>([]);
  const [labels, setLabels] = useState<Date[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:5000/taxisWithPassengers");
        const data: TaxisWithPassengersResponse = await response.json();
        if (data.status === "success") {
          const taxisWithPassengersCount = data.data.taxis_with_passengers;

          setChartData((prevData) => [...prevData.slice(-49), taxisWithPassengersCount]);
          setLabels((prevLabels) => [...prevLabels.slice(-49), new Date()]);
        } else {
          console.error("Error fetching data:", data.status);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
    const interval = setInterval(fetchData, 1000); 

    return () => clearInterval(interval); 
  }, []);

  const chartDataConfig = {
    labels: labels.map((date) =>
      date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit", second: "2-digit" })
    ),
    datasets: [
      {
        data: chartData,
        fill: true,
        backgroundColor: function (context: any) {
          const chart = context.chart;
          const { ctx, chartArea } = chart;
          const gradientOrColor = chartAreaGradient(ctx, chartArea, [
            {
              stop: 0,
              color: `rgba(${hexToRGB(
                tailwindConfig.theme.colors.violet[500]
              )}, 0)`,
            },
            {
              stop: 1,
              color: `rgba(${hexToRGB(
                tailwindConfig.theme.colors.violet[500]
              )}, 0.2)`,
            },
          ]);
          return gradientOrColor || "transparent";
        },
        borderColor: tailwindConfig.theme.colors.violet[500],
        borderWidth: 2,
        pointRadius: 0,
        pointHoverRadius: 3,
        pointBackgroundColor: tailwindConfig.theme.colors.violet[500],
        pointHoverBackgroundColor: tailwindConfig.theme.colors.violet[500],
        pointBorderWidth: 0,
        pointHoverBorderWidth: 0,
        clip: 20,
        tension: 0.2,
      },
    ],
  };

  return (
    <div className="flex flex-col col-span-full sm:col-span-6 bg-gray-800 shadow-sm rounded-xl">
      <header className="px-5 py-4 border-gray-700/60 flex items-center">
        <h2 className="font-semibold text-gray-100">Taxis with Passengers</h2>
      </header>
      <RealtimeChart data={chartDataConfig} width={595} height={248} />
    </div>
  );
}
