// Description: The Map page of the dashboard.

"use client";

import React from "react";
import Map from "../../../../components/dashboard-page-components/map";

const MapPage: React.FC = () => {
  return (
    <div className="px-8 py-8 w-full max-w-[96rem] mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl text-gray-100 font-bold">Map</h1>
        <p className="text-md font-semibold text-gray-100 mt-2">Yellow dots represent robotaxis, green dots represent chargers, and red dots represent passengers.</p>
        <p className="text-md font-semibold text-gray-100">You can click on the dots for more information.</p>
      </div>
      <div className="h-screen">
        <Map />
      </div>
    </div>
  );
};

export default MapPage;
