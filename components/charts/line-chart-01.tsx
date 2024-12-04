'use client'

import { useRef, useState, useEffect } from 'react'
import { useTheme } from 'next-themes'

import { chartColors } from '@/components/charts/chartjs-config'
import '@/components/charts/chartjs-config'
import {
  Chart, LineController, LineElement, Filler, PointElement, LinearScale, TimeScale, Tooltip,
} from 'chart.js'
import type { ChartData } from 'chart.js'
import 'chartjs-adapter-moment'

// Import utilities
import { formatValue } from '@/components/utils/utils'

Chart.register(LineController, LineElement, Filler, PointElement, LinearScale, TimeScale, Tooltip)

interface LineChart01Props {
  data: ChartData
  width: number
  height: number
}

export default function LineChart01({
  data,
  width,
  height
}: LineChart01Props) {

  const [chart, setChart] = useState<Chart | null>(null)
  const canvas = useRef<HTMLCanvasElement>(null)
  const { theme } = useTheme()
  const darkMode = theme === 'dark'
  const { tooltipBodyColor, tooltipBgColor, tooltipBorderColor } = chartColors 

  useEffect(() => {    
    const ctx = canvas.current
    if (!ctx) return
    
    const newChart = new Chart(ctx, {
      type: 'line',
      data: data,
      options: {
        layout: {
          padding: 20,
        },
        scales: {
          y: {
            display: false,
            beginAtZero: true,
          },
          x: {
            type: 'time',
            time: {
              parser: 'MM-DD-YYYY',
              unit: 'month',
            },
            display: false,
          },
        },
        plugins: {
          tooltip: {
            callbacks: {
              title: () => '', // Disable tooltip title
              label: (context) => formatValue(context.parsed.y),
            },
            bodyColor:  tooltipBodyColor.dark,
            backgroundColor: tooltipBgColor.dark,
            borderColor:  tooltipBorderColor.dark,            
          },
          legend: {
            display: false,
          },
        },
        interaction: {
          intersect: false,
          mode: 'nearest',
        },
        maintainAspectRatio: false,
        resizeDelay: 200,
      },
    })
    setChart(newChart)
    return () => newChart.destroy()
  }, [])

  useEffect(() => {
    if (!chart) return

    if (darkMode) {
      chart.options.plugins!.tooltip!.bodyColor = tooltipBodyColor.dark
      chart.options.plugins!.tooltip!.backgroundColor = tooltipBgColor.dark
      chart.options.plugins!.tooltip!.borderColor = tooltipBorderColor.dark
    }
    chart.update('none')
  }, [theme])  

  return (
    <canvas ref={canvas} width={width} height={height}></canvas>
  )
}