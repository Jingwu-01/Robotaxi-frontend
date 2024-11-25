export const metadata = {
  title: 'Analytics - Mosaic',
  description: 'Page description',
}

import AnalyticsCard01 from './analytics-card-01'
import AnalyticsCardConsumption from './analytics-card-consumptionByHour'

export default function Analytics() {
  return (
    <div className="px-4 sm:px-6 lg:px-8 py-8 w-full max-w-[96rem] mx-auto">

      {/* Page header */}
      <div className="sm:flex sm:justify-between sm:items-center mb-8">
        <div className="mb-4 sm:mb-0">
          <h1 className="text-2xl md:text-3xl text-gray-800 dark:text-gray-100 font-bold">Analytics</h1>
        </div>
      </div>

      <AnalyticsCard01 />

      {/* Cards */}
      <div className="grid grid-cols-12 gap-6 mt-10">
        {/* Line chart (Analytics) */}
    
        <AnalyticsCardConsumption />
        <AnalyticsCardConsumption />
        <AnalyticsCardConsumption />
    
      </div>
    </div>
  )
}
