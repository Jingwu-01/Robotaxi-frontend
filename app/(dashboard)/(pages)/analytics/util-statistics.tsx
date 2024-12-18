// Description: This file defines the utility functions for statistics, such as mean, max, min, and standard deviation.

export const computeMax = (data: number[]): number => {
    return Math.max(...data);
  };
  
  export const computeMin = (data: number[]): number => {
    return Math.min(...data);
  };
  
  export const computeMean = (data: number[]): number => {
    const total = data.reduce((sum, value) => sum + value, 0);
    return data.length > 0 ? total / data.length : 0;
  };
  
  export const computeStdDev = (data: number[]): number => {
    const mean = computeMean(data);
    const variance =
      data.reduce((sum, value) => sum + Math.pow(value - mean, 2), 0) / data.length;
    return Math.sqrt(variance);
  };
  