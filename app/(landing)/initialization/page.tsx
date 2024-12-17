"use client";

import { useState, ChangeEvent, FormEvent } from "react";
import { useRouter } from "next/navigation";
import Tooltip from "@/components/tooltip";

interface FormData {
  city: string;
  simStartTime: string;
  simEndTime: string;
  timeStep: string;
  robotaxiCount: string;
  chargingStationCount: string;
  peopleCount: string;
}

export default function Init() {
  const [formData, setFormData] = useState<FormData>({
    city: "Houston",
    simStartTime: "",
    simEndTime: "",
    timeStep: "",
    robotaxiCount: "",
    chargingStationCount: "",
    peopleCount: "",
  });

  // Mode: "Control" => optimized: false; "Optimized" => optimized: true
  const [mode, setMode] = useState<"Control" | "Optimized">("Control");
  const [error, setError] = useState<string | null>(null);

  const router = useRouter();

  const handleChange = (
    event: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError(null);

    const simStart = parseFloat(formData.simStartTime);
    const simEnd = parseFloat(formData.simEndTime);

    // Validate sim_start_time and sim_end_time
    if (simStart < 0) {
      setError("Simulation start time cannot be less than 0.");
      return;
    }
    if (simEnd > 7200) {
      setError("Simulation end time cannot be greater than 7200.");
      return;
    }

    const payload = {
      step_length: parseFloat(formData.timeStep),
      sim_start_time: simStart,
      sim_end_time: simEnd,
      num_taxis: parseInt(formData.robotaxiCount, 10),
      num_chargers: parseInt(formData.chargingStationCount, 10),
      num_people: parseInt(formData.peopleCount, 10),
      optimized: mode === "Optimized",
    };

    try {
      const response = await fetch("http://localhost:5000/start_simulation", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || "Failed to start simulation");
      }

      console.log(result.message);
      await new Promise((resolve) => setTimeout(resolve, 8000));
      router.push("/dashboard");
    } catch (err: any) {
      setError(err.message);
    } finally {
      console.log("fetch completed");
    }
  };

  return (
    <section className="relative px-4">
      <div className="pt-20 pb-10">
        {/* title */}
        <div className="text-center pb-10">
          <h1 className="text-md text-gray-100">Welcome.</h1>
          <h1 className="text-md text-gray-100">
            We exist to make robotaxi charging easier.
          </h1>
        </div>

        {/* form */}
        <div className="max-w-sm mx-auto">
          <form onSubmit={handleSubmit}>
            {/* mode */}
            <div className="mb-5">
              <label
                className="block text-gray-300 text-sm font-medium mb-1"
                htmlFor="mode"
              >
                Mode <span className="text-red-600">*</span>
              </label>
              <select
                id="mode"
                name="mode"
                className="form-select w-full"
                value={mode}
                onChange={(e) =>
                  setMode(e.target.value as "Control" | "Optimized")
                }
                required
              >
                <option value="Control">Control</option>
                <option value="Optimized">Optimized</option>
              </select>
            </div>

            {/* city */}
            <div className="mb-5">
              <label
                className="block text-gray-300 text-sm font-medium mb-1"
                htmlFor="city"
              >
                City <span className="text-red-600">*</span>
              </label>
              <select
                id="city"
                name="city"
                className="form-select w-full"
                value={formData.city}
                onChange={handleChange}
                required
              >
                <option>Houston</option>
              </select>
            </div>

            {/* simulation start time (sim_start_time) */}
            <div className="mb-5">
              <div className="flex items-center">
                <label
                  className="block text-gray-300 text-sm font-medium mb-1"
                  htmlFor="simStartTime"
                >
                  Simulation Start Time (seconds){" "}
                  <span className="text-red-600">*</span>
                </label>
                <Tooltip className="ml-1 relative transform -translate-y-0.5">
                  <div className="text-xs text-gray-100">
                    The simulation start time. The minimum start time is 0. Every 300 seconds in the simulation is equivalent to 1 hour in real life. For example, if the start time is 300 seconds, that means the simulation starts at 1 AM in real life.
                  </div>
                </Tooltip>
              </div>
              <input
                id="simStartTime"
                name="simStartTime"
                type="text"
                className="form-input w-full text-gray-300"
                placeholder="0"
                value={formData.simStartTime}
                onChange={handleChange}
                required
              />
            </div>

            {/* simulation end time (sim_end_time) */}
            <div className="mb-5">
              <div className="flex items-center">
                <label
                  className="block text-gray-300 text-sm font-medium mb-1"
                  htmlFor="simEndTime"
                >
                  Simulation End Time (seconds){" "}
                  <span className="text-red-600">*</span>
                </label>
                <Tooltip className="ml-1 relative transform -translate-y-0.5">
                  <div className="text-xs text-gray-100">
                    The simulation end time. The maximum end time is 7200. Every 300 seconds in the simulation is equivalent to 1 hour in real life. For example, if the end time is 4200 seconds, that means the simulation ends at 2 PM in real life.
                  </div>
                </Tooltip>
              </div>
              <input
                id="simEndTime"
                name="simEndTime"
                type="text"
                className="form-input w-full text-gray-300"
                placeholder="7200"
                value={formData.simEndTime}
                onChange={handleChange}
                required
              />
            </div>

            {/* time step (step_length) */}
            <div className="mb-5">
              <div className="flex items-center">
                <label
                  className="block text-gray-300 text-sm font-medium mb-1"
                  htmlFor="timeStep"
                >
                  Time Step (seconds) <span className="text-red-600">*</span>
                </label>
                <Tooltip className="ml-1 relative transform -translate-y-0.5">
                  <div className="text-xs text-gray-100">
                    The smallest discrete interval of simulated time. A smaller time step will result in a more accurate simulation but will demand more computational resources.
                  </div>
                </Tooltip>
              </div>
              <input
                id="timeStep"
                name="timeStep"
                type="text"
                step="any"
                className="form-input w-full text-gray-300"
                placeholder="0.01"
                value={formData.timeStep}
                onChange={handleChange}
                required
              />
            </div>

            {/* num_taxis */}
            <div className="mb-5">
              <label
                className="block text-gray-300 text-sm font-medium mb-1"
                htmlFor="robotaxiCount"
              >
                Number of Robotaxis <span className="text-red-600">*</span>
              </label>
              <input
                id="robotaxiCount"
                name="robotaxiCount"
                type="text"
                className="form-input w-full text-gray-300"
                placeholder="10"
                value={formData.robotaxiCount}
                onChange={handleChange}
                required
              />
            </div>

            {/* num_chargers */}
            <div className="mb-5">
              <label
                className="block text-gray-300 text-sm font-medium mb-1"
                htmlFor="chargingStationCount"
              >
                Number of Charging Stations <span className="text-red-600">*</span>
              </label>
              <input
                id="chargingStationCount"
                name="chargingStationCount"
                type="text"
                className="form-input w-full text-gray-300"
                placeholder="10"
                value={formData.chargingStationCount}
                onChange={handleChange}
                required
              />
            </div>

            {/* num_people */}
            <div className="mb-5">
              <label
                className="block text-gray-300 text-sm font-medium mb-1"
                htmlFor="peopleCount"
              >
                Number of Passengers <span className="text-red-600">*</span>
              </label>
              <input
                id="peopleCount"
                name="peopleCount"
                type="text"
                className="form-input w-full text-gray-300"
                placeholder="10"
                value={formData.peopleCount}
                onChange={handleChange}
                required
              />
            </div>

            {/* error message */}
            {error && (
              <div className="mb-5">
                <div className="text-red-600">{error}</div>
              </div>
            )}

            {/* start button */}
            <div className="mt-5">
              <button
                type="submit"
                className="btn text-white bg-violet-600 hover:bg-violet-700 w-full"
              >
                Start
              </button>
            </div>
          </form>
        </div>

        {/* footer */}
        <footer className="mt-10 text-center">
          <p className="text-gray-500 mb-2">
            Developed by Andrew Negrut, Tarushi Mittal, Jingwu Wang
          </p>
          <a
            className="text-indigo-600 hover:text-indigo-800"
            href="https://github.com/Jingwu-01/Robotaxi-Front-end"
            aria-label="Github"
          >
            <svg
              className="h-8 w-8 inline-block"
              viewBox="0 0 32 32"
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
            >
              <path d="M16 8.2c-4.4 0-8 3.6-8 8 0 3.5 2.3 6.5 5.5 7.6.4.1.5-.2.5-.4V22c-2.2.5-2.7-1-2.7-1-.4-.9-.9-1.2-.9-1.2-.7-.5.1-.5.1-.5.8.1 1.2.8 1.2.8.7 1.3 1.9.9 2.3.7.1-.5.3-.9.5-1.1-1.8-.2-3.6-.9-3.6-4 0-.9.3-1.6.8-2.1-.1-.2-.4-1 .1-2.1 0 0 .7-.2 2.2.8.6-.2 1.3-.3 2-.3s1.4.1 2 .3c1.5-1 2.2-.8 2.2-.8.4 1.1.2 1.9.1 2.1.5.6.8 1.3.8 2.1 0 3.1-1.9 3.7-3.7 3.9.3.4.6.9.6 1.6v2.2c0 .2.1.5.6.4 3.2-1.1 5.5-4.1 5.5-7.6-.1-4.4-3.7-8-8.1-8z" />
            </svg>
          </a>
        </footer>
      </div>
    </section>
  );
}
