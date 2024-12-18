// Description: FAQs page of the help section.

export default function FAQs() {
  return (
    <div className="px-8 py-8 w-full max-w-[96rem] mx-auto">
      <div className="mb-8">
          <h1 className="text-3xl text-gray-100 font-bold">FAQs</h1>
      </div>

      <div className="flex flex-col mb-10 gap-10 bg-gray-800 shadow-sm rounded-xl px-5 py-4">
        
        <div>
          <p className="text-md font-semibold text-gray-100">Q1: Why do I sometimes see negative cumulative electricity consumption in the dashboard?</p>
          <p className="text-md text-gray-100">
            This occurs due to limitations in how the backend retrieves electricity consumption data from the simulation (SUMO’s TraCI service). Occasionally, TraCI reports negative values, resulting in counter-intuitive negative cumulative consumption. While this is not ideal, the main goal of the simulation is to compare relative performance between different algorithms, so these anomalies tend to average out over multiple runs.
          </p>
        </div>

        <div>
          <p className="text-md font-semibold text-gray-100">Q2: Why don’t the number of active passengers match the number of input passengers?</p>
          <p className="text-md text-gray-100">
            The backend distributes passenger trips throughout the entire day. If you specify a certain number of passengers at the start, only a fraction may appear initially. Over time, more passengers will become active, reflecting how the simulation staggers their departures for realism.
          </p>
        </div>

        <div>
          <p className="text-md font-semibold text-gray-100">Q3: Why does the display show zero chargers in use even though there are charging stations?</p>
          <p className="text-md text-gray-100">
            Currently, the simulation allows vehicles to be instantaneously charged to full capacity without needing to pause at a charger. As a result, they never "occupy" a charger for any measurable time. This design choice avoids delays in the simulation but means you’ll often see zero chargers actively in use.
          </p>
        </div>

        <div>
          <p className="text-md font-semibold text-gray-100">Q4: Why am I seeing negative profits at the start of the simulation?</p>
          <p className="text-md text-gray-100">
            Early in the day (around midnight), the number of passengers is typically very low. The revenue earned at this time may not cover the initial electricity costs, resulting in temporary negative profits. As the simulation progresses and more passengers travel, profits generally become positive.
          </p>
        </div>

        <div>
          <p className="text-md font-semibold text-gray-100">Q5: Why is it not possible to recreate identical initial conditions for every simulation run?</p>
          <p className="text-md text-gray-100">
            Certain parameters, such as departure times, electricity costs, demand rates, and initial object locations, are randomized each run. This randomness means you cannot perfectly replicate a previous scenario. To accurately assess performance, you should compare average results over multiple runs rather than relying on a single trial.
          </p>
        </div>

        <div>
          <p className="text-md font-semibold text-gray-100">Q6: How does the simulation scale with more objects?</p>
          <p className="text-md text-gray-100">
            Running simulations with large numbers of passengers, taxis, or chargers increases computation time. On personal laptops, a simulation with 100 chargers, 1000 passengers, and 25 taxis can take about ten to fifteen minutes for a single run. For best results with larger setups, consider using high-performance workstations.
          </p>
        </div>

        <div>
          <p className="text-md font-semibold text-gray-100">Q7: Can the simulation model different cities or larger areas?</p>
          <p className="text-md text-gray-100">
            Future improvements may include integrating multiple urban areas, allowing users to choose various real-life city layouts.
          </p>
        </div>

      </div>
    </div>
  )
}
