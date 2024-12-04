import AnalyticsCardConsumption from './analytics-card-consumptionByHour'
import AnalyticsCardConsumptionRank from './analytics-card-consumptionRank'
import AnalyticsMax from "./max"
import AnalyticsMin from "./min"
import AnalyticsMean from "./mean"
import AnalyticsSd from "./sd"
import AnalyticsWaiting from "./waitingTime"
import AnalyticsBatteryLevels from "./analytics-batteryLevels"
import AnalyticsBatteryMax from './b-max'
import AnalyticsBatteryMin from './b-min'
import AnalyticsBatteryMean from './b-mean'
import AnalyticsBatterySd from './b-sd'

export default function Analytics() {
  return (
    <div className="px-8 py-8 w-full max-w-[96rem] mx-auto">

      <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl text-gray-100 font-bold">Analytics</h1>
      </div>

    
     
      {/* Cards */}
      <div className="grid grid-cols-12 gap-6 mt-10">
      <AnalyticsCardConsumptionRank />
        <AnalyticsMax />
        <AnalyticsMin />
        <AnalyticsMean />
        <AnalyticsSd />

        <AnalyticsBatteryLevels />
        <AnalyticsBatteryMax />
        <AnalyticsBatteryMin />
        <AnalyticsBatteryMean />
        <AnalyticsBatterySd />

        <AnalyticsWaiting />
        <AnalyticsCardConsumption />

      </div>
    </div>
  )
}