"use client";

import { useState, ChangeEvent, FormEvent } from "react";
import { useRouter } from "next/navigation";

export default function SignUp() {
  const [formData, setFormData] = useState({
    city: "",
    simulationTime: "",
    // accelerationFactor: "",
    timeStep: "",
    // electricityRate: "",
    electricityPrice: "",
    robotaxiCount: "",
    chargingStationCount: "",
    peopleCount: "",
  });
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

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
      // city: formData.city,
      sim_length: parseInt(formData.simulationTime),
      // acceleration_factor: parseInt(formData.accelerationFactor),
      time_step: parseFloat(formData.timeStep),
      // electricity_rate: parseInt(formData.electricityRate),
      num_cars: parseInt(formData.robotaxiCount),
      num_chargers: parseInt(formData.chargingStationCount),
      num_people: parseInt(formData.peopleCount),
    };

    try {
      const response = await fetch(
        "http://localhost:5000/api/start_simulation",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        }
      );

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || "Failed to start simulation");
      }
      console.log(result.status);
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
        <div className="text-center pb-10">
          <h1 className="h1">Welcome.</h1>
          <h1 className="h1">We exist to make robotaxi charging easier.</h1>
        </div>

        <div className="max-w-sm mx-auto">
          <form onSubmit={handleSubmit}>

            <div className="mb-5">
              <label
                className="block text-gray-300 text-sm font-medium mb-1"
                htmlFor="city"
              >
                City <span className="text-red-600">*</span>
              </label>
              <select id="city" className="form-select w-full">
                <option>Houston</option>
              </select>
            </div>

            <div className="mb-5">
              <label
                className="block text-gray-300 text-sm font-medium mb-1"
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
                placeholder="1000"
                value={formData.simulationTime}
                onChange={handleChange}
                required
              />
            </div>

            {/* <div className="mb-5">
                <label
                  className="block text-gray-300 text-sm font-medium mb-1"
                  htmlFor="accelerationFactor"
                >
                  Acceleration Factor{" "}
                  <span className="text-red-600">*</span>
                </label>
                <input
                  id="accelerationFactor"
                  name="accelerationFactor"
                  type="text"
                  className="form-input w-full text-gray-300"
                  placeholder="10"
                  value={formData.accelerationFactor}
                  onChange={handleChange}
                  required
                />
              </div> */}

            <div className="mb-5">
              <label
                className="block text-gray-300 text-sm font-medium mb-1"
                htmlFor="timeStep"
              >
                Time Step (seconds) <span className="text-red-600">*</span>
              </label>
              <input
                id="timeStep"
                name="timeStep"
                type="text"
                className="form-input w-full text-gray-300"
                placeholder="1"
                value={formData.timeStep}
                onChange={handleChange}
                required
              />
            </div>

            {/* <div className="mb-5">
              <label
                className="block text-gray-300 text-sm font-medium mb-1"
                htmlFor="password"
              >
                Electricity Rate ($/kWh) <span className="text-red-600">*</span>
              </label>
              <input
                id="password"
                type="text"
                className="form-input w-full text-gray-300"
                placeholder="0.14"
                required
              />
            </div> */}

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

            <div className="mb-5">
              <label
                className="block text-gray-300 text-sm font-medium mb-1"
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
                placeholder="10"
                value={formData.chargingStationCount}
                onChange={handleChange}
                required
              />
            </div>

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

            {error && (
              <div className="mb-5">
                <div className="text-red-600">{error}</div>
              </div>
            )}

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