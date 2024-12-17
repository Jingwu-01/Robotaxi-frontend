// Description: Component to display a map with vehicle, charger, and passenger positions.

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

L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl:
    'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl:
    'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

interface VehiclePosition {
  lat: number;
  lon: number;
}

interface ChargerPosition {
  lat: number;
  lon: number;
}

interface PassengerPosition {
  lat: number;
  lon: number;
}

const MapComponent: React.FC = () => {
  const [geojsonData, setGeojsonData] = useState<any>(null);
  const [vehiclePositions, setVehiclePositions] = useState<{
    [key: string]: VehiclePosition;
  }>({});
  const [chargerPositions, setChargerPositions] = useState<{
    [key: string]: ChargerPosition;
  }>({});
  const [passengerPositions, setPassengerPositions] = useState<{
    [key: string]: PassengerPosition;
  }>({});

  useEffect(() => {
    // Fetch the GeoJSON data from your backend
    fetch('http://localhost:5000/network')
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        setGeojsonData(data);
      })
      .catch((error) => console.error('Error fetching network data:', error));
  }, []);

  useEffect(() => {
    // Function to fetch vehicle positions
    const fetchVehiclePositions = () => {
      fetch('http://localhost:5000/vehicle_positions')
        .then((response) => {
          if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
          }
          return response.json();
        })
        .then((data) => {
          if (data.status === 'success' && data.data) {
            setVehiclePositions(data.data);
          } else {
            console.error(
              'Error fetching vehicle positions:',
              data.message || data.status
            );
          }
        })
        .catch((error) =>
          console.error('Error fetching vehicle positions:', error)
        );
    };

    // Initial fetch
    fetchVehiclePositions();

    // Fetch vehicle positions every second
    const interval = setInterval(fetchVehiclePositions, 1000);

    // Clean up the interval on component unmount
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    // Function to fetch charger positions
    const fetchChargerPositions = () => {
      fetch('http://localhost:5000/charger_positions')
        .then((response) => {
          if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
          }
          return response.json();
        })
        .then((data) => {
          if (data.status === 'success' && data.data) {
            setChargerPositions(data.data);
          } else {
            console.error(
              'Error fetching charger positions:',
              data.message || data.status
            );
          }
        })
        .catch((error) =>
          console.error('Error fetching charger positions:', error)
        );
    };

    // Initial fetch
    fetchChargerPositions();

    // Fetch charger positions every 5 seconds (chargers are less dynamic)
    const interval = setInterval(fetchChargerPositions, 5000);

    // Clean up the interval on component unmount
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    // Function to fetch passenger positions
    const fetchPassengerPositions = () => {
      fetch('http://localhost:5000/passenger_positions')
        .then((response) => {
          if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
          }
          return response.json();
        })
        .then((data) => {
          if (data.status === 'success' && data.data) {
            setPassengerPositions(data.data);
          } else {
            console.error(
              'Error fetching passenger positions:',
              data.message || data.status
            );
          }
        })
        .catch((error) =>
          console.error('Error fetching passenger positions:', error)
        );
    };

    // Initial fetch
    fetchPassengerPositions();

    // Fetch passenger positions every second
    const interval = setInterval(fetchPassengerPositions, 1000);

    // Clean up the interval on component unmount
    return () => clearInterval(interval);
  }, []);

  return (
    <MapContainer
      center={[29.734, -95.356]} // Coordinates for Houston
      zoom={13}
      style={{ height: '80%', width: '100%' }}
    >
      <TileLayer
        attribution="&copy; OpenStreetMap contributors"
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {geojsonData && <GeoJSON data={geojsonData} />}

      {/* Display charger positions */}
      {Object.keys(chargerPositions).map((chargerId) => {
        const position = chargerPositions[chargerId];
        return (
          <CircleMarker
            key={chargerId}
            center={[position.lat, position.lon]}
            radius={6}
            color="green"
            fillColor="green"
            fillOpacity={0.8}
          >
            <Popup>Charger ID: {chargerId}</Popup>
          </CircleMarker>
        );
      })}

      {/* Display vehicle positions */}
      {Object.keys(vehiclePositions).map((taxiId) => {
        const position = vehiclePositions[taxiId];
        return (
          <CircleMarker
            key={taxiId}
            center={[position.lat, position.lon]}
            radius={5}
            color="yellow"
            fillColor="yellow"
            fillOpacity={0.8}
          >
            <Popup>Taxi ID: {taxiId}</Popup>
          </CircleMarker>
        );
      })}

      {/* Display passenger positions */}
      {Object.keys(passengerPositions).map((passengerId) => {
        const position = passengerPositions[passengerId];
        return (
          <CircleMarker
            key={passengerId}
            center={[position.lat, position.lon]}
            radius={4}
            color="red"
            fillColor="red"
            fillOpacity={0.8}
          >
            <Popup>Passenger ID: {passengerId}</Popup>
          </CircleMarker>
        );
      })}
    </MapContainer>
  );
};

export default MapComponent;
