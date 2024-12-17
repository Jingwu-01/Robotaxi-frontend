"use client";

import { useState, useEffect } from "react";
import LineChart01 from "@/components/charts/line-chart-01";
import { chartAreaGradient } from "@/components/charts/chartjs-config";
import { tailwindConfig, hexToRGB } from "@/components/utils/utils";

interface ProfitResponse {
  status: string;
  data: {
    total_profit: number;
  };
}

export default function DashboardCard_Profit() {
  const [currentProfit, setCurrentProfit] = useState<number>(0);
  const [labels, setLabels] = useState<Date[]>([]);
  const [chartData, setChartData] = useState<number[]>([]);

  useEffect(() => {
    const fetchProfit = async () => {
      try {
        const response = await fetch("http://localhost:5000/profit");
        const data: ProfitResponse = await response.json();

        if (data.status === "success") {
          const profit = data.data.total_profit;
          setCurrentProfit(profit);
          setChartData((prevData) => [...prevData.slice(-49), profit]);
          setLabels((prevLabels) => [...prevLabels.slice(-49), new Date()]);
        } else {
          console.error("Error fetching profit data:", data.status);
        }
      } catch (error) {
        console.error("Error fetching profit data:", error);
      }
    };

    fetchProfit();
    const interval = setInterval(fetchProfit, 1000);

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
              color: `rgba(${hexToRGB(tailwindConfig.theme.colors.green[500])}, 0)`,
            },
            {
              stop: 1,
              color: `rgba(${hexToRGB(tailwindConfig.theme.colors.green[500])}, 0.2)`,
            },
          ]);
          return gradientOrColor || "transparent";
        },
        borderColor: tailwindConfig.theme.colors.green[500],
        borderWidth: 2,
        pointRadius: 0,
        pointHoverRadius: 3,
        pointBackgroundColor: tailwindConfig.theme.colors.green[500],
        pointHoverBackgroundColor: tailwindConfig.theme.colors.green[500],
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
          <h2 className="text-lg font-semibold text-gray-100 mb-2">Profit</h2>
        </header>
        <div className="flex items-start">
          <div className="text-3xl font-bold text-gray-100 mr-2">
            ${currentProfit.toFixed(2)}
          </div>
        </div>
      </div>
      <div className="grow max-sm:max-h-[128px] xl:max-h-[128px]">
        <LineChart01 data={chartDataConfig} width={389} height={128} />
      </div>
    </div>
  );
}
