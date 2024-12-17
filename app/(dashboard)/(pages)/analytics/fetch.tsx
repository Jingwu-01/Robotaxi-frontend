// utils/fetchElectricityConsumption.ts
export interface ElectricityConsumptionResponse {
    status: string;
    data: {
      [key: string]: number;
    };
  }
  
  export const fetchElectricityConsumption = async (): Promise<number[]> => {
    try {
      const response = await fetch("http://localhost:5000/electricityConsumption");
      const data: ElectricityConsumptionResponse = await response.json();
  
      if (data.status === "success" && data.data) {
        const consumptionData = data.data;
        // Convert consumption data to an array of numbers
        const consumptionValues = Object.values(consumptionData).map((value) => Number(value));
        return consumptionValues;
      } else {
        console.error("Error fetching consumption data:", data.status || "Unknown error");
        return [];
      }
    } catch (error) {
      console.error("Error fetching consumption data:", error);
      return [];
    }
  };
  