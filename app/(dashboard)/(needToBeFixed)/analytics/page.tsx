import AnalyticsCardConsumption from './analytics-card-consumptionByHour'
import AnalyticsCardConsumptionRank from './analytics-card-consumptionRank'

export default function Analytics() {
  return (
    <div className="px-8 py-8 w-full max-w-[96rem] mx-auto">

      <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl text-gray-100 font-bold">Analytics</h1>
      </div>

      <AnalyticsCardConsumptionRank />
     

      {/* Cards */}
      <div className="grid grid-cols-12 gap-6 mt-10">
        <AnalyticsCardConsumption />
        <AnalyticsCardConsumption />
        <AnalyticsCardConsumption />
      </div>
    </div>
  )
}