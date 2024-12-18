// Description: fetch battery levels data from the server.

export interface BatteryLevelsResponse {
    status: string;
    data: {
      [key: string]: number;
    };
  }
  
  export const fetchBatteryLevels = async (): Promise<number[]> => {
    try {
      const response = await fetch("http://localhost:5000/batteryLevels");
      const data: BatteryLevelsResponse = await response.json();
  
      if (data.status === "success" && data.data) {
        const consumptionData = data.data;
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