import React, { useEffect, useState } from "react";
import useGlobalReducer from "../hooks/useGlobalReducer";
import { useParams } from "react-router-dom";

export const Planet = () => {
  // get planet UID 
  const { store } = useGlobalReducer();
  const { uid } = useParams();

 
  const [planet, setPlanet] = useState(null);
  const [loading, setLoading] = useState(true);

  // Fetch planet details
  useEffect(() => {
    fetch(`${store.PLANETS_URL}/${uid}`)
      .then((res) => res.json())
      .then((data) => {
        setPlanet(data.result.properties);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching planet:", err);
        setLoading(false);
      });
  }, [uid, store.PLANETS_URL]);

  
  if (loading) return <p>planet is Loading...</p>;
  if (!planet) return <p>Planet not found</p>;

  return (
    <div>
      
      <div className="d-flex justify-content-around m-4 p-2 border-bottom border-danger">
        <img 
          src={`${store.PLANETS_IMAGE_URL}/${uid}.jpg`} 
          onError={(e) => (e.target.src = "https://placehold.co/400x200?text=No+Image")}
          className="card-img-top" 
          alt={planet.name}
          style={{
            width: "20rem",
            height: "20rem",
          }}
        />
        <div className="mx-auto">
          <h1 className="text-center">{planet.name}</h1>
          <p className="text-center">Details</p>
        </div>
      </div>
      
      <div
        className="d-flex justify-content-between m-4 p-2"
        style={{ height: "25%" }}
      >
        <PlanetProperty label="Name" value={planet.name} />
        <PlanetProperty label="Climate" value={planet.climate} />
        <PlanetProperty label="Population" value={planet.population} />
        <PlanetProperty label="Orbital Period" value={planet.orbital_period} />
        <PlanetProperty label="Rotation Period" value={planet.rotation_period} />
        <PlanetProperty label="Diameter" value={planet.diameter} />
      </div>
    </div>
  );
};


const PlanetProperty = ({ label, value }) => (
  <div>
    <h3 className="text-danger text-center">{label}</h3>
    <p className="text-danger text-center">{value}</p>
  </div>
);