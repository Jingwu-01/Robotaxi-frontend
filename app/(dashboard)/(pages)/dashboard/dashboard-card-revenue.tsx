"use client";

import { useState, useEffect } from "react";
import LineChart01 from "@/components/charts/line-chart-01";
import { chartAreaGradient } from "@/components/charts/chartjs-config";
import { tailwindConfig, hexToRGB } from "@/components/utils/utils";

interface EarningsResponse {
  status: string;
  data: {
    total_earnings: number;
  };
}

export default function DashboardCard_Earnings() {
  const [currentEarnings, setCurrentEarnings] = useState<number>(0);
  const [labels, setLabels] = useState<Date[]>([]);
  const [chartData, setChartData] = useState<number[]>([]);

  useEffect(() => {
    const fetchEarnings = async () => {
      try {
        const response = await fetch("http://localhost:5000/earnings");
        const data: EarningsResponse = await response.json();

        if (data.status === "success") {
          const earnings = data.data.total_earnings;
          setCurrentEarnings(earnings);
          setChartData((prevData) => [...prevData.slice(-49), earnings]);
          setLabels((prevLabels) => [...prevLabels.slice(-49), new Date()]);
        } else {
          console.error("Error fetching earnings data:", data.status);
        }
      } catch (error) {
        console.error("Error fetching earnings data:", error);
      }
    };

    fetchEarnings();
    const interval = setInterval(fetchEarnings, 1000);

    return () => clearInterval(interval);
  }, []);

  const chartDataConfig = {
    labels: labels.map((date) =>
      date.toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
      })
    ),
    datasets: [
      {
        data: chartData,
        fill: true,
        backgroundColor: (context: any) => {
          const chart = context.chart;
          const { ctx, chartArea } = chart;
          const gradientOrColor = chartAreaGradient(ctx, chartArea, [
            {
              stop: 0,
              color: `rgba(${hexToRGB(tailwindConfig.theme.colors.blue[500])}, 0)`,
            },
            {
              stop: 1,
              color: `rgba(${hexToRGB(tailwindConfig.theme.colors.blue[500])}, 0.2)`,
            },
          ]);
          return gradientOrColor || "transparent";
        },
        borderColor: tailwindConfig.theme.colors.blue[500],
        borderWidth: 2,
        pointRadius: 0,
        pointHoverRadius: 3,
        pointBackgroundColor: tailwindConfig.theme.colors.blue[500],
        pointHoverBackgroundColor: tailwindConfig.theme.colors.blue[500],
        pointBorderWidth: 0,
        pointHoverBorderWidth: 0,
        clip: 20,
        tension: 0.2,
      },
    ],
  };

  return (
    <div className="flex flex-col col-span-4 bg-gray-800 shadow-sm rounded-xl">
      <div className="px-5 pt-5">
        <header className="flex justify-between items-start mb-2">
          <h2 className="text-lg font-semibold text-gray-100 mb-2">Earnings</h2>
        </header>
        <div className="flex items-start">
          <div className="text-3xl font-bold text-gray-100 mr-2">
            ${currentEarnings.toFixed(2)}
          </div>
        </div>
      </div>
      <div className="grow max-sm:max-h-[128px] xl:max-h-[128px]">
        <LineChart01 data={chartDataConfig} width={389} height={128} />
      </div>
    </div>
  );
}
