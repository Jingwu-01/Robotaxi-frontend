import DashboardCardProfit from "./dashboard-card-profit";
import DashboardCardRevenue from "./dashboard-card-revenue";
import DashboardCardCost from "./dashboard-card-cost";
import DashboardCardElec from "./dashboard-card-elec";
import DashboardCardPassenger from "./dashboard-card-passenger";
import DashboardCardCharger from "./dashboard-card-charger";
import DashboardCardVehicle from "./dashboard-card-vehicle";

export default function Dashboard() {
  return (
    <div className="px-8 py-8 w-full max-w-[96rem] mx-auto">
      <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl text-gray-100 font-bold">Dashboard</h1>
      </div>

      <div className="grid grid-cols-12 gap-5">
        <DashboardCardProfit />
        <DashboardCardRevenue />
        <DashboardCardCost />

        <DashboardCardElec />
        <DashboardCardCharger />
        <DashboardCardPassenger />
        <DashboardCardVehicle />
      </div>
    </div>
  );
}
