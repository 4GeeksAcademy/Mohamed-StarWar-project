import React, { useEffect, useState } from "react";
import useGlobalReducer from "../hooks/useGlobalReducer";
import { useParams } from "react-router-dom";

export const Character = () => {
  //get character UID 
  const { store } = useGlobalReducer();
  const { uid } = useParams();

  
  const [character, setCharacter] = useState(null);
  const [loading, setLoading] = useState(true);

  // Fetch character details 
  useEffect(() => {
    fetch(`${store.CHARACTER_URL}/${uid}`)
      .then((res) => res.json())
      .then((data) => {
        setCharacter(data.result.properties);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching character:", err);
        setLoading(false);
      });
  }, [uid, store.CHARACTER_URL]);

  
  if (loading) return <p>character is loading...</p>;
  if (!character) return <p>Character is not found</p>;

  return (
    <div>
     
      <div className="d-flex justify-content-around m-4 p-2 border-bottom border-danger">
        <img 
          src={`${store.CHARACTER_IMAGE_URL}/${uid}.jpg`} 
          onError={(e) => (e.target.src = "https://placehold.co/400x200?text=No+Image")}
          className="card-img-top" 
          alt={character.name}
          style={{
            width: "20rem",
            height: "20rem",
          }}
        />
        <div className="mx-auto">
          <h1 className="text-center">{character.name}</h1>
          <p className="text-center">Star Wars character details</p>
        </div>
      </div>
     
      <div
        className="d-flex justify-content-between m-4 p-2"
        style={{ height: "25%" }}
      >
        <CharacterProperty label="Name" value={character.name} />
        <CharacterProperty label="Birth Year" value={character.birth_year} />
        <CharacterProperty label="Gender" value={character.gender} />
        <CharacterProperty label="Height" value={character.height} />
        <CharacterProperty label="Skin Color" value={character.skin_color} />
        <CharacterProperty label="Eye Color" value={character.eye_color} />
      </div>
    </div>
  );
};


const CharacterProperty = ({ label, value }) => (
  <div>
    <h3 className="text-danger text-center">{label}</h3>
    <p className="text-danger text-center">{value}</p>
  </div>
);