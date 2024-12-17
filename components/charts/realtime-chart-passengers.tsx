"use client";

import { useRef, useState, useEffect } from "react";
import { useTheme } from "next-themes";

import { chartColors } from "@/components/charts/chartjs-config";
import "@/components/charts/chartjs-config";
import {
  Chart,
  LineController,
  LineElement,
  Filler,
  PointElement,
  LinearScale,
  TimeScale,
  Tooltip,
} from "chart.js";
import type { ChartData } from "chart.js";
import "chartjs-adapter-moment";

// Import utilities
import { tailwindConfig, hexToRGB } from "@/components/utils/utils";

Chart.register(
  LineController,
  LineElement,
  Filler,
  PointElement,
  LinearScale,
  TimeScale,
  Tooltip
);

interface RealtimeChartProps {
  data: ChartData;
  width: number;
  height: number;
}

export default function RealtimeChart({
  data,
  width,
  height,
}: RealtimeChartProps) {
  const [chart, setChart] = useState<Chart | null>(null);
  const canvas = useRef<HTMLCanvasElement>(null);
  const chartValue = useRef<HTMLSpanElement>(null);
  const chartDeviation = useRef<HTMLDivElement>(null);
  const { theme } = useTheme();
  const {
    textColor,
    gridColor,
    tooltipTitleColor,
    tooltipBodyColor,
    tooltipBgColor,
    tooltipBorderColor,
  } = chartColors;

  useEffect(() => {
    const ctx = canvas.current;
    if (!ctx) return;

    const newChart = new Chart(ctx, {
      type: "line",
      data: data,
      options: {
        layout: {
          padding: 20,
        },
        scales: {
          y: {
            border: {
              display: false,
            },
            suggestedMin: 0,
            ticks: {
              maxTicksLimit: 5,
              callback: (value) => `${value}`,
              color: textColor.dark,
            },
            grid: {
              color: gridColor.dark,
            },
          },
          x: {
            type: "linear", 
            border: {
              display: false,
            },
            grid: {
              display: false,
            },
            ticks: {
              autoSkipPadding: 48,
              maxRotation: 0,
              color: textColor.dark,
               callback: (value) => `${value}s`
            },
          },
        },
        plugins: {
          legend: {
            display: false,
          },
          tooltip: {
            titleFont: {
              weight: 600,
            },

            titleColor: tooltipTitleColor.dark,
            bodyColor: tooltipBodyColor.dark,
            backgroundColor: tooltipBgColor.dark,
            borderColor: tooltipBorderColor.dark,
          },
        },
        interaction: {
          intersect: false,
          mode: "nearest",
        },
        animation: false,
        maintainAspectRatio: false,
      },
    });
    setChart(newChart);
    return () => newChart.destroy();
  }, [data]);

  // Update header values
  useEffect(() => {
    if (chartValue.current && chartDeviation.current) {
      const currentValue =
        data.datasets[0].data[data.datasets[0].data.length - 1] || 0;
      const previousValue =
        data.datasets[0].data[data.datasets[0].data.length - 2] || 0;
      const diff = ((+currentValue - +previousValue) / +previousValue) * 100;
      chartValue.current.innerHTML = `${currentValue.toString()}`;
      if (diff < 0) {
        chartDeviation.current.style.backgroundColor = `rgba(${hexToRGB(
          tailwindConfig.theme.colors.red[500]
        )}, 0.2)`;
        chartDeviation.current.style.color =
          tailwindConfig.theme.colors.red[700];
      } else {
        chartDeviation.current.style.backgroundColor = `rgba(${hexToRGB(
          tailwindConfig.theme.colors.green[500]
        )}, 0.2)`;
        chartDeviation.current.style.color =
          tailwindConfig.theme.colors.green[700];
      }
      chartDeviation.current.innerHTML = `${diff > 0 ? "+" : ""}${diff.toFixed(
        2
      )}%`;
    }
  }, [data]);

  useEffect(() => {
    if (!chart) return;
    chart.options.scales!.x!.ticks!.color = textColor.dark;
    chart.options.scales!.y!.ticks!.color = textColor.dark;
    chart.options.scales!.y!.grid!.color = gridColor.dark;
    chart.options.plugins!.tooltip!.titleColor = tooltipTitleColor.dark;
    chart.options.plugins!.tooltip!.bodyColor = tooltipBodyColor.dark;
    chart.options.plugins!.tooltip!.backgroundColor = tooltipBgColor.dark;
    chart.options.plugins!.tooltip!.borderColor = tooltipBorderColor.dark;
    chart.update("none");
  }, [theme]);

  return (
    <>
      <div className="px-5 py-3">
        <div className="flex items-start">
          <div className="text-3xl font-bold dark:text-gray-100 mr-2 tabular-nums">
            <span ref={chartValue}>50</span>
          </div>
          <div
            ref={chartDeviation}
            className="text-sm font-medium px-1.5 rounded-full"
          ></div>
        </div>
      </div>
      <div className="grow">
        <canvas ref={canvas} width={width} height={height}></canvas>
      </div>
    </>
  );
}
