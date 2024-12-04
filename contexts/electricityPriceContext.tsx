"use client";

import React, { createContext, useState, ReactNode, useContext } from "react";

interface ElectricityPriceContextProps {
  electricityPrice: number;
  setElectricityPrice: (price: number) => void;
}

const ElectricityPriceContext = createContext<ElectricityPriceContextProps | undefined>(undefined);

export const ElectricityPriceProvider = ({ children }: { children: ReactNode }) => {
  const [electricityPrice, setElectricityPrice] = useState<number>(0.14);

  return (
    <ElectricityPriceContext.Provider value={{ electricityPrice, setElectricityPrice }}>
      {children}
    </ElectricityPriceContext.Provider>
  );
};

export const useElectricityPrice = () => {
  const context = useContext(ElectricityPriceContext);
  if (context === undefined) {
    throw new Error("useElectricityPrice must be used within an ElectricityPriceProvider");
  }
  return context;
};
