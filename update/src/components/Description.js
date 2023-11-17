import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import './Profile.css';
import Button from "./ButtonProfil";


const Description = () => {
  const [seriesDetails, setSeriesDetails] = useState(null);
  const { id } = useParams();
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`https://api.betaseries.com/shows/display?key=be42888c11dd&id=${id}`)
      .then((response) => {
        setSeriesDetails(response.data.show);
        console.log(response.data.show);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [id]);

  const Archivate = (seriesId) => {
    const token = localStorage.getItem("token");
    console.log(token);
    console.log(seriesId);
      axios.post(`https://api.betaseries.com/shows/archive?token=${token}&client_id=be42888c11dd&id=${seriesId}`)
        .then(response => {
          console.log("La serie a bien été archivé");
          navigate("/profil");
        })
        .catch(error => {
          const errorMessage = "Ajoute d'abord cette serie pour l'archiver";
          console.log(errorMessage);
          setError(errorMessage);
        })
  }

  const AddSerie = (serieId) => {
    const token = localStorage.getItem("token");
    axios.post(`https://api.betaseries.com/shows/show?id=${serieId}&token=${token}&client_id=be42888c11dd`)
        .then(response => {
            console.log("La série a bien été ajouté");
            window.location.reload();

        })
        .catch(error => {
            console.error(error);
        })
}

  return (
    <>
    
    <div className="details">
      <button onClick={() => navigate("/series")} className="secondary retour-button">Retourner en arrière</button>
      {seriesDetails ? (
        <>
          <h1>{seriesDetails.title} <button onClick={() => AddSerie(seriesDetails.id)} className="secondary plus">&#65291;</button></h1>
          <img src={seriesDetails.images.box} alt={seriesDetails.title} className="image" />
          <p className="desc">Synopsis: {seriesDetails.description}</p>
          <p>Genres: {Object.keys(seriesDetails.genres).join(", ")}</p>
          
          <p>Nombre de saisons: {seriesDetails.seasons}</p>
          <p>Nombre d'épisode: {seriesDetails.episodes} </p>
          <p>Durée des épisodes: {seriesDetails.length}</p>
          {seriesDetails.notes.total !== 0 ? (
                    <p>Note {seriesDetails.notes.mean.toFixed(2)}/5</p>
                  ) : (
                    <p>Cet série n'est pas noté</p>
                  )}
          <button className="secondary" onClick={() => Archivate(seriesDetails.id)}>Archiver</button>
        </>
      ) : (
        <p>Chargement en cours...</p>
      )}

      {error == null? (
        <p></p>
      ): (
       <div> 
        <p>{error}</p>
        <button onClick={() => AddSerie(id)}>Ajouter la série</button>
        </div>
      )

      }
    </div>
    </>
  );
};

export default Description;