import Link from 'next/link'

export default function AnalyticsCard05() {
  return(
    <div className="flex flex-col col-span-6 bg-gray-800 shadow-sm rounded-xl">
      <header className="px-5 py-4 border-b border-gray-700/60">
        <h2 className="font-semibold text-gray-100">Electricity Consumption Rank</h2>
      </header>

      <div className="grow p-3">
        <div className="flex flex-col h-full">
          <div className="grow">
            <ul className="flex justify-between text-xs uppercase text-gray-500 font-semibold px-2 space-x-2">
              <li>Vehicle_ID</li>
              <li>Electricity Consumption</li>
            </ul>

            <ul className="space-y-1 text-sm text-gray-100 mt-3 mb-4">
             
              <li className="relative px-2 py-1">
                <div className="absolute inset-0 bg-violet-500/20 rounded-r" aria-hidden="true" style={{ width: '82%' }}></div>
                <div className="relative flex justify-between space-x-2">
                  <div>Vehicle_1</div>
                  <div className="font-medium">100kWh</div>
                </div>
              </li>

             
              <li className="relative px-2 py-1">
                <div className="absolute inset-0 bg-violet-500/20 rounded-r" aria-hidden="true" style={{ width: '70%' }}></div>
                <div className="relative flex justify-between space-x-2">
                  <div>Vehicle_2</div>
                  <div className="font-medium">80kWh</div>
                </div>
              </li>
           
              <li className="relative px-2 py-1">
                <div className="absolute inset-0 bg-violet-500/20 rounded-r" aria-hidden="true" style={{ width: '60%' }}></div>
                <div className="relative flex justify-between space-x-2">
                  <div>Vehicle_3</div>
                  <div className="font-medium">60kWh</div>
                </div>
              </li>
            
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}
