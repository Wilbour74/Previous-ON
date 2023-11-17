import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import './Episode.css';

const Episode = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const [episodes, setEpisodes] = useState([]);
    const [hoveredEpisode, setHoveredEpisode] = useState(null);
    const [tokenI, setToken] = useState(null);

    useEffect(() => {
        const token = localStorage.getItem("token");
        console.log(token);
        
        axios.get(`https://api.betaseries.com/shows/episodes?token=${token}&id=${id}&client_id=be42888c11dd`)
            .then(response => {
                console.log(response.data.episodes);
                setEpisodes(response.data.episodes);
            })
            .catch(error => {
                console.error(error);
            })
    }, [])

    const AddVue = (episodeId) => {
        const token = localStorage.getItem("token");
        axios.post(`https://api.betaseries.com/episodes/watched?id=${episodeId}&client_id=be42888c11dd&bulk=true&token=${token}`)
            .then(response => {
                console.log(response.data);
                console.log("Episode marqué comme vue")
                navigate('/memberEpisodes')
            })

            .catch(error => {
                console.error(error);
            })
    };

    const AddSoloVue = (episodeId) => {
        const token = localStorage.getItem("token");
        axios.post(`https://api.betaseries.com/episodes/watched?id=${episodeId}&client_id=be42888c11dd&bulk=false&token=${token}`)
            .then(response => {
                console.log(response.data);
                console.log("Episode marqué comme vue")
                navigate('/memberEpisodes')
            })

            .catch(error => {
                console.error(error);
            })
    };

    

    
    return (
        <>
        <button onClick={() => navigate('/profil')} className="secondary">Aller sur profil</button>
        <button onClick={() => navigate(`/Description/${id}`)} className="secondary retour-button">Retourner en arrière</button>
        <div className="episodes">
        {episodes.map(episode => (
            <div
                key={episode.id}
                className="div"
                onMouseEnter={() => setHoveredEpisode(episode)}
                onMouseLeave={() => setHoveredEpisode(null)}
            >
              <img src={`https://api.betaseries.com/pictures/episodes?id=${episode.id}&client_id=be42888c11dd`} alt={`Episode ${episode.code}`} />
              <h4>{episode.code} : {episode.title}</h4>
              {hoveredEpisode === episode && (
                <div className="episode-details">
                  <p>Date de diffusion : {episode.date}</p>
                  {episode.note.total !== 0 ? (
                    <p>Note {episode.note.moyenne}/5</p>
                  ) : (
                    <p>Cet épisode n'est pas noté</p>
                  )}
                  {episode.description !== "" ? (
                    <p>Description : {episode.description}</p>
                  ) : (
                    <p>Pas de description pour cet épisode</p>
                  )}
                  <button onClick={() => {AddVue(episode.id)}}>Marquer comme vu (+précédents)</button>
                  <button onClick={() => {AddSoloVue(episode.id)}}>Marquer comme vu</button>
                  <button onClick={() => navigate(`/commentaires/${episode.id}`)} className="secondary">Voir details</button>
                  
                </div>
              )}
            </div>
        ))}
        </div>
        </>
    )
}

export default Episode;