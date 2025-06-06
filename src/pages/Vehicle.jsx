import React, { useEffect, useState } from "react";
import useGlobalReducer from "../hooks/useGlobalReducer";
import { useParams } from "react-router-dom";

export const Vehicle = () => {
  // get vehicle UID 
  const { store } = useGlobalReducer();
  const { uid } = useParams();

 
  const [vehicle, setVehicle] = useState(null);
  const [loading, setLoading] = useState(true);

  // Fetch vehicle details
  useEffect(() => {
    fetch(`${store.VEHICLE_URL}/${uid}`)
      .then((res) => res.json())
      .then((data) => {
        setVehicle(data.result.properties);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching vehicle:", err);
        setLoading(false);
      });
  }, [uid, store.VEHICLE_URL]);

 
  if (loading) return <p>Vehicle is Loading...</p>;
  if (!vehicle) return <p>Vehicle not found</p>;

  return (
    <div>
      {/* Vehicle image and name section */}
      <div className="d-flex justify-content-around m-4 p-2 border-bottom border-danger">
        <img
          src={`${store.VEHICLE_IMAGE_URL}/${uid}.jpg`}
          onError={(e) =>
            (e.target.src = "https://placehold.co/400x200?text=No+Image")
          }
          className="card-img-top"
          alt={vehicle.name}
          style={{
            width: "20rem",
            height: "20rem",
          }}
        />
        <div className="mx-auto">
          alt={vehicle?.name || "Vehicle"}
          <h1 className="text-center">{vehicle?.name || "Unknown"}</h1>
          <p className="text-center">Details</p>
        </div>
      </div>

      {/* Vehicle properties section */}
      <div
        className="d-flex justify-content-between m-4 p-2"
        style={{ height: "25%" }}
      >
        <VehicleProperty
          label="Max Atmosphering Speed"
          value={vehicle.max_atmosphering_speed}
        />
        <VehicleProperty
          label="Cargo Capacity"
          value={vehicle.cargo_capacity}
        />
        <VehicleProperty
          label="Crew"
          value={vehicle.crew}
        />
        <VehicleProperty
          label="Length"
          value={vehicle.length}
        />
        <VehicleProperty
          label="Vehicle Class"
          value={vehicle.vehicle_class}
        />
      </div>
    </div>
  );
};

// Reusable component 
const VehicleProperty = ({ label, value }) => (
  <div>
    <h3 className="text-danger text-center">{label}</h3>
    <p className="text-danger text-center">{value}</p>
  </div>
);