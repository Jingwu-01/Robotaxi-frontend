"use client";
import React, { useEffect, useState } from 'react';
import {
  MapContainer,
  TileLayer,
  GeoJSON,
  CircleMarker,
  Popup,
} from 'react-leaflet';
import L from 'leaflet';

import 'leaflet/dist/leaflet.css';

L.Icon.Default.prototype.options.iconRetinaUrl =
  'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png';
L.Icon.Default.prototype.options.iconUrl =
  'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png';
L.Icon.Default.prototype.options.shadowUrl =
  'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png';

interface VehiclePosition {
  lat: number;
  lon: number;
}

const Map: React.FC = () => {
  const [geojsonData, setGeojsonData] = useState<any>(null);
  const [vehiclePositions, setVehiclePositions] = useState<{
    [key: string]: VehiclePosition;
  }>({});

  useEffect(() => {
    // Fetch the GeoJSON data from your backend
    fetch('http://localhost:5000/network')
      .then((response) => response.json())
      .then((data) => {
        setGeojsonData(data);
      })
      .catch((error) => console.error('Error fetching network data:', error));
  }, []);

  useEffect(() => {
    // Function to fetch vehicle positions
    const fetchVehiclePositions = () => {
      fetch('http://localhost:5000/vehicle_positions')
        .then((response) => response.json())
        .then((data) => {
          setVehiclePositions(data);
        })
        .catch((error) =>
          console.error('Error fetching vehicle positions:', error)
        );
    };

    const interval = setInterval(fetchVehiclePositions, 1000);
    // Clean up the interval on component unmount
    return () => clearInterval(interval);
  }, []);

  return (
    <MapContainer
      center={[29.734, -95.356]} // Coordinates for Houston
      zoom={13}
      style={{ height: '600px', width: '100%' }}
    >
      <TileLayer
        attribution="&copy; OpenStreetMap contributors"
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {geojsonData && <GeoJSON data={geojsonData} />}
      {/* Display vehicle positions */}
      {Object.keys(vehiclePositions).map((taxiId) => {
        const position = vehiclePositions[taxiId];
        return (
          <CircleMarker
            key={taxiId}
            center={[position.lat, position.lon]}
            radius={5}
            color="red"
          >
            <Popup>Taxi ID: {taxiId}</Popup>
          </CircleMarker>
        );
      })}
    </MapContainer>
  );
};

export default Map;
