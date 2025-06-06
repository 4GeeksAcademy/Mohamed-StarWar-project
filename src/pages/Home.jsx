import useGlobalReducer from "../hooks/useGlobalReducer.jsx";
import React, { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

export const Home = () => {
  // Access global state 
  const { store, dispatch } = useGlobalReducer();
  const navigate = useNavigate();
  const params = useParams();


  const characterData = store.characters;
  const planetData = store.planets;
  const vehicleData = store.vehicles;

  // Fetch and store all character 
  useEffect(() => {
    fetch(`${store.CHARACTER_URL}`)
      .then((res) => res.json())
      .then(async (data) => {
        // Fetch character details 
        const promises = data.results.map((char) =>
          fetch(`${store.CHARACTER_URL}/${char.uid}`).then((res) => res.json())
        );
        const detailedCharacters = await Promise.all(promises);
        
        const charactersWithUID = detailedCharacters.map((char, index) => ({
          ...char.result.properties,
          uid: data.results[index].uid,
        }));
        dispatch({ type: "SET_CHARACTERS", payload: charactersWithUID });
      });
  }, []);

  // Fetch and store planet details
  useEffect(() => {
    fetch(`${store.PLANETS_URL}`)
      .then((res) => res.json())
      .then(async (data) => {
        const promises = data.results.map((planet) =>
          fetch(`${store.PLANETS_URL}/${planet.uid}`).then((res) => res.json())
        );
        const detailedPlanets = await Promise.all(promises);
        const planetsWithUID = detailedPlanets.map((planet, index) => ({
          ...planet.result.properties,
          uid: data.results[index].uid,
        }));
        dispatch({ type: "SET_PLANETS", payload: planetsWithUID });
      });
  }, []);

  // Fetch and store vehicle details
  useEffect(() => {
    fetch(`${store.VEHICLE_URL}`)
      .then((res) => res.json())
      .then(async (data) => {
        const promises = data.results.map((vehicle) =>
          fetch(`${store.VEHICLE_URL}/${vehicle.uid}`).then((res) => res.json())
        );
        const detailedVehicles = await Promise.all(promises);
        const vehiclesWithUID = detailedVehicles.map((vehicle, index) => ({
          ...vehicle.result.properties,
          uid: data.results[index].uid,
        }));
        dispatch({ type: "SET_VEHICLES", payload: vehiclesWithUID });
      });
  }, []);

  // Helper 
  const renderCardList = (data, imageUrl, infoPath, fields) => (
    <div
      className="d-flex overflow-auto"
      style={{
        scrollSnapType: "x mandatory",
        gap: "1rem",
        paddingBottom: "1rem",
      }}
    >
      {data.map((item) => (
        <div
          key={item.name}
          className="card m-2"
          style={{
            width: "18rem",
            flexShrink: "0",
          }}
        >
          <img
            src={`${imageUrl}/${item.uid}.jpg`}
            onError={
              imageUrl === store.CHARACTER_IMAGE_URL
                ? (e) =>
                    (e.target.src =
                      "https://placehold.co/400x200?text=No+Image")
                : undefined
            }
            className="card-img-top"
            alt={item.name}
          />
          <div className="card-body">
            <h5 className="card-title">{item.name}</h5>
          
            {fields.map((field) => (
              <p className="card-text" key={field.label}>
                {field.label}: {item[field.key]}
              </p>
            ))}
            <div className="d-flex justify-content-between gap-1">
            
              <button
                key={item.uid}
                className="btn btn-outline-primary"
                onClick={() => navigate(`/${infoPath}/${item.uid}`)}
              >
                Read More
              </button>
              {/* Add to favorites */}
              <button
                className="btn btn-outline-warning"
                onClick={() =>
                  dispatch({ type: "ADD_FAVORITE", payload: item.name })
                }
              >
                <i className="fa-solid fa-heart"></i>
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );

  return (
    <div className="p-2">
  
      <h1> Caharacter</h1>
      {renderCardList(
        characterData,
        store.CHARACTER_IMAGE_URL,
        "character",
        [
          { label: "Gender", key: "gender" },
          { label: "Hair Color", key: "hair_color" },
          { label: "Eye Color", key: "eye_color" },
        ]
      )}

     
      <h1>Planets</h1>
      {renderCardList(
        planetData,
        store.PLANETS_IMAGE_URL,
        "planet",
        [
          { label: "Population", key: "population" },
          { label: "Terrain", key: "terrain" },
        ]
      )}

     
      <h1>Vehicles</h1>
      {renderCardList(
        vehicleData,
        store.VEHICLE_IMAGE_URL,
        "vehicle",
        [
          { label: "Model", key: "model" },
          { label: "Passengers", key: "passengers" },
        ]
      )}
    </div>
  );
};