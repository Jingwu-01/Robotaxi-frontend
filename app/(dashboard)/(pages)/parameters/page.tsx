// Description: The parameters page of the dashboard.

"use client";
import { useState, useEffect, ChangeEvent, FormEvent } from "react";

export default function Parameters() {
  const [currentData, setCurrentData] = useState({
    robotaxiCount: "",
    chargingStationCount: "",
    peopleCount: "",
  });

  const [formData, setFormData] = useState({
    robotaxiCount: "",
    chargingStationCount: "",
    peopleCount: "",
  });

  const [error, setError] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);

  useEffect(() => {
    const fetchParameters = async () => {
      try {
        const response = await fetch("http://localhost:5000/status");
        const result = await response.json();
        if (!response.ok) {
          throw new Error(result.message || "Failed to fetch parameters");
        }
  
        setCurrentData({
          robotaxiCount: result.data.num_taxis.toString(),
          chargingStationCount: result.data.num_chargers.toString(),
          peopleCount: result.data.num_people.toString(),
        });
  
        setFormData({
          robotaxiCount: result.data.num_taxis.toString(),
          chargingStationCount: result.data.num_chargers.toString(),
          peopleCount: result.data.num_people.toString(),
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
    setMessage(null);
  
    const desiredCars = parseInt(formData.robotaxiCount);
    const desiredChargers = parseInt(formData.chargingStationCount);
    const desiredPeople = parseInt(formData.peopleCount);
  
    if (
      isNaN(desiredCars) ||
      isNaN(desiredChargers) ||
      isNaN(desiredPeople) ||
      desiredCars < 0 ||
      desiredChargers < 0 ||
      desiredPeople < 0
    ) {
      setError("Please enter valid positive numbers for all fields.");
      return;
    }
  
    const updates = [];
  
    // Determine changes for robotaxis
    const currentCars = parseInt(currentData.robotaxiCount);
    if (desiredCars > currentCars) {
      updates.push(fetch("http://localhost:5000/add_taxi", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ num_taxis: desiredCars - currentCars }),
      }));
    } else if (desiredCars < currentCars) {
      updates.push(fetch("http://localhost:5000/remove_taxi", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ num_taxis: currentCars - desiredCars }),
      }));
    }
  
    // Determine changes for charging stations
    const currentChargers = parseInt(currentData.chargingStationCount);
    if (desiredChargers > currentChargers) {
      updates.push(fetch("http://localhost:5000/add_charger", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ num_chargers: desiredChargers - currentChargers }),
      }));
    } else if (desiredChargers < currentChargers) {
      updates.push(fetch("http://localhost:5000/remove_charger", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ num_chargers: currentChargers - desiredChargers }),
      }));
    }
  
    // Determine changes for people
    const currentPeople = parseInt(currentData.peopleCount);
    if (desiredPeople > currentPeople) {
      updates.push(fetch("http://localhost:5000/add_person", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ num_people: desiredPeople - currentPeople }),
      }));
    } else if (desiredPeople < currentPeople) {
      updates.push(fetch("http://localhost:5000/remove_person", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ num_people: currentPeople - desiredPeople }),
      }));
    }
  
    try {
      const responses = await Promise.all(updates);
      for (const response of responses) {
        const result = await response.json();
        if (!response.ok) {
          throw new Error(result.message || "Failed to update parameters");
        }
      }
  
      setCurrentData({
        robotaxiCount: desiredCars.toString(),
        chargingStationCount: desiredChargers.toString(),
        peopleCount: desiredPeople.toString(),
      });
  
      setMessage("Parameters updated successfully.");
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

      <div className="flex items-center justify-center bg-gray-800 shadow-sm rounded-xl h-[85vh]">
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
                 Current: {currentData.robotaxiCount}
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
                Current: {currentData.chargingStationCount}
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
                Current: {currentData.peopleCount}
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
