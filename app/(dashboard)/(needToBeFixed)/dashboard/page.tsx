import DashboardCardProfit from './dashboard-card-profit'
import DashboardCardRevenue from './dashboard-card-revenue'
import DashboardCardCost from './dashboard-card-cost'
import DashboardCardElec from './dashboard-card-elec'
import DashboardCardPassenger from './dashboard-card-passenger'
import DashboardCardCharger from './dashboard-card-charger'
import DashboardCardVehicle from  './dashboard-card-vehicle'

export default function Dashboard() {
  return (
    <div className="px-4 sm:px-6 lg:px-8 py-8 w-full max-w-[96rem] mx-auto">
     
      <div className="sm:flex sm:justify-between sm:items-center mb-8">
        {/* Left: Title */}
        <div className="mb-4 sm:mb-0">
          <h1 className="text-2xl md:text-3xl text-gray-800 dark:text-gray-100 font-bold">Dashboard</h1>
        </div>
      </div>

      {/* Cards */}
      <div className="grid grid-cols-12 gap-6">
        <DashboardCardProfit />
        <DashboardCardRevenue />
        <DashboardCardCost />

        <DashboardCardElec />
        <DashboardCardCharger />
        <DashboardCardPassenger />
        <DashboardCardVehicle />
      </div>      
    </div>
  )
}
