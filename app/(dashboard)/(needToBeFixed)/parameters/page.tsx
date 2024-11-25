"use client";
import { useState, useEffect, ChangeEvent, FormEvent } from "react";


export default function Parameters() {
  const [currentData, setCurrentData] = useState({
    // simulationTime: "",
    // timeStep: "",
    // electricityRate: "",
    robotaxiCount: "",
    chargingStationCount: "",
    peopleCount: "",
  });

  const [formData, setFormData] = useState({
    // simulationTime: "",
    // timeStep: "",
    // electricityRate: "",
    robotaxiCount: "",
    chargingStationCount: "",
    peopleCount: "",
  });

  const [error, setError] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);

  useEffect(() => {
    const fetchParameters = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/parameters");
       const result = await response.json();
        if (!response.ok) {
          throw new Error(result.error || "Failed to fetch parameters");
        }

        setCurrentData({
          // simulationTime: result.sim_length,
          // timeStep: result.time_step,
          // electricityRate: result.electricity_rate,
          robotaxiCount: result.num_cars,
          chargingStationCount: result.num_chargers,
          peopleCount: result.num_people,
        })
        
        setFormData({
          robotaxiCount: result.num_cars.toString(),
          chargingStationCount: result.num_chargers.toString(),
          peopleCount: result.num_people.toString(),
        });
        
      } catch (err: any) {
        setError(err.message);
      }
    };
    fetchParameters();
  }, []);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError(null);

    const payload = {
      // sim_length: parseInt(formData.simulationTime),
      // time_step: parseFloat(formData.timeStep),
      // electricity_rate: parseInt(formData.electricityRate),
      num_cars: parseInt(formData.robotaxiCount),
      num_chargers: parseInt(formData.chargingStationCount),
      num_people: parseInt(formData.peopleCount),
    };

    if (
      isNaN(payload.num_cars) ||
      isNaN(payload.num_chargers) ||
      isNaN(payload.num_people) ||
      payload.num_cars < 0 ||
      payload.num_chargers < 0 ||
      payload.num_people < 0
    ) {
      setError("Please enter valid positive numbers for all fields.");
      return;
    }

    try {
      const response = await fetch("http://localhost:5000/api/parameters", {
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

      setCurrentData({
        robotaxiCount: payload.num_cars.toString(),
        chargingStationCount: payload.num_chargers.toString(),
        peopleCount: payload.num_people.toString(),
      });

      setMessage("Parameters updated successfully");
    } catch (err: any) {
      setError(err.message);
    } finally {
      console.log("fetch completed");
    }
  };

  return (
    <div className="px-8 py-8 w-full max-w-[96rem] mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl text-gray-100 font-bold">Parameters</h1>
      </div>

      <div className="flex flex-col col-span-full bg-gray-800 shadow-sm rounded-xl">
        <div className="pt-10 pb-10">
          <div className="max-w-sm mx-auto">
            <form onSubmit={handleSubmit}>
              {/* For extensibility, we can add more parameters here */}

              {/* <div className="mb-5">
              <label
                className="block text-gray-100 text-sm font-medium mb-1 font-semibold"
                htmlFor="simulationTime"
              >
                Simulation Time (seconds){" "}
                <span className="text-red-600">*</span>
              </label>
              <input
                id="simulationTime"
                name="simulationTime"
                type="text"
                className="form-input w-full text-gray-300"
                value={formData.simulationTime}
                onChange={handleChange}
                required
              />
            </div> */}

              {/* <div className="mb-5">
              <label
                className="block text-gray-100 text-sm font-medium mb-1 font-semibold"
                htmlFor="timeStep"
              >
                Time Step (seconds){" "}
                <span className="text-red-600">*</span>
              </label>
              <input
                id="timeStep"
                name="timeStep"
                type="text"
                className="form-input w-full text-gray-300"
             
                value={formData.timeStep}
                onChange={handleChange}
                required
              />
            </div> */}

              {/* <div className="mb-5">
              <label
                className="block text-gray-100 text-sm font-medium mb-1 font-semibold"
                htmlFor="password"
              >
                Electricity Rate ($/kWh){" "}
                <span className="text-red-600">*</span>
              </label>
              <input
                id="password"
                type="text"
                className="form-input w-full text-gray-300"
                required
              />
            </div> */}

              <div className="mb-5">
                <label
                  className="text-gray-100 text-sm mb-1 font-semibold"
                  htmlFor="robotaxiCount"
                >
                  Number of Robotaxis <span className="text-red-600">*</span>
                </label>
                <input
                  id="robotaxiCount"
                  name="robotaxiCount"
                  type="text"
                  className="form-input w-full text-gray-300"
                  value={formData.robotaxiCount}
                  onChange={handleChange}
                  required
                />
                <p className="text-gray-300 text-sm mt-1">
                  {currentData.robotaxiCount}
                </p>
              </div>

              <div className="mb-5">
                <label
                  className="text-gray-100 text-sm mb-1 font-semibold"
                  htmlFor="chargingStationCount"
                >
                  Number of Charging Stations{" "}
                  <span className="text-red-600">*</span>
                </label>
                <input
                  id="chargingStationCount"
                  name="chargingStationCount"
                  type="text"
                  className="form-input w-full text-gray-300"
                  value={formData.chargingStationCount}
                  onChange={handleChange}
                  required
                />
                <p className="text-gray-300 text-sm mt-1">
                  {currentData.chargingStationCount}
                </p>
              </div>

              <div className="mb-5">
                <label
                  className="text-gray-100 text-sm mb-1 font-semibold"
                  htmlFor="peopleCount"
                >
                  Number of Passengers <span className="text-red-600">*</span>
                </label>
                <input
                  id="peopleCount"
                  name="peopleCount"
                  type="text"
                  className="form-input w-full text-gray-300"
                  value={formData.peopleCount}
                  onChange={handleChange}
                  required
                />
                <p className="text-gray-300 text-sm mt-1">
                  {currentData.peopleCount}
                </p>
              </div>

              {error && (
                <div className="mb-5">
                  <div className="text-red-600">{error}</div>
                </div>
              )}

              {message && (
                <div className="mb-5">
                  <div className="text-gray-100">{message}</div>
                </div>
              )}

              <div className="mt-5">
                <button
                  type="submit"
                  className="btn text-gray-100 bg-violet-600 hover:bg-violet-700 w-full font-semibold"
                >
                  Update
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
