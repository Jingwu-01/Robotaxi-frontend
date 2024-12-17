// Description: Analytics page of the dashboard.

import AnalyticsCardConsumption from './analytics-card-elec-pie-graph'
import AnalyticsCardConsumptionRank from './analytics-card-elec-rank'
import AnalyticsMax from "./analytics-card-elec-max"
import AnalyticsMin from "./analytics-card-elec-min"
import AnalyticsMean from "./analytics-card-elec-mean"
import AnalyticsSd from "./analytics-card-elec-sd"
import AnalyticsWaiting from "./analytics-card-waiting-time"
import AnalyticsBatteryLevels from "./analytics-card-battery-rank"
import AnalyticsBatteryMax from './analytics-card-battery-max'
import AnalyticsBatteryMin from './analytics-card-battery-min'
import AnalyticsBatteryMean from './analytics-card-battery-mean'
import AnalyticsBatterySd from './analytics-card-battery-sd'
import AnalyticsFleet from './analytics-card-fleet-utilization-rate'
import AnalyticsChargerUtilziation from './analytics-card-charger-utilization-rate'
import AnalyticsUnsatisfactionRate from './analytics-card-unsatisfaction-rate'

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

        <AnalyticsChargerUtilziation />
        <AnalyticsFleet />  
        <AnalyticsWaiting />
        <AnalyticsUnsatisfactionRate />
        
        <AnalyticsCardConsumption />
      </div>
    </div>
  )
}