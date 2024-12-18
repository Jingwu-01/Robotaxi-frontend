// Description: electricity consumption card for the dashboard page.
'use client'

import { useState, useEffect } from "react"
import RealtimeChart from "@/components/charts/realtime-chart-elec"
import { chartAreaGradient } from "@/components/charts/chartjs-config"
import { tailwindConfig, hexToRGB } from "@/components/utils/utils"

interface ConsumptionData {
  [key: string]: number;
}

interface ElectricityConsumptionResponse {
  status: string;
  data: ConsumptionData;
}

export default function DashboardCard_Elec() {
  const [chartData, setChartData] = useState<number[]>([]);
  const [simulationTimes, setSimulationTimes] = useState<number[]>([]);

  // Fetch electricity consumption data from the server
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:5000/electricityConsumption");
      
        const data: ElectricityConsumptionResponse = await response.json();

        if (data.status === "success") {
          const consumptionData = data.data;
          const simulationTime = consumptionData.time; // Get the simulation time from the response

          // Remove 'time' key from consumptionData to just sum taxis' consumption
          const { time, ...taxisConsumption } = consumptionData;

          // Sum the electricity consumption of all vehicles
          const totalConsumption = Object.values(taxisConsumption).reduce(
            (sum, value) => sum + value,
            0
          );

          const totalConsumptionWh = parseFloat(totalConsumption.toFixed(2));

          setChartData((prevData) => [...prevData, totalConsumptionWh]);
          // Instead of a Date object, store the numeric simulationTime
          setSimulationTimes((prevTimes) => [...prevTimes, simulationTime]);

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

  // Use simulationTimes directly as labels on the x-axis
  const data = {
    labels: simulationTimes, // Array of numbers representing simulation time
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
        <h2 className="font-semibold text-gray-100">Cumulative Electricity Consumption</h2>
      </header>
      <RealtimeChart data={data} width={550} height={250} />
    </div>
  );
}
