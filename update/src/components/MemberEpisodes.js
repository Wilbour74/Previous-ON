import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import './Episode.css';

const MemberEpisodes = () => {
    const [episodes, setEpisodes] = useState([]);
    const [hoveredEpisode, setHoveredEpisode] = useState(null);
    const navigate = useNavigate();
    useEffect(() => {
        DisplayEpisode();
    }, [])

    const DisplayEpisode = () => {
        const token = localStorage.getItem("token");

        axios.get(`https://api.betaseries.com/episodes/unrated?token=${token}&client_id=be42888c11dd`)
            .then(response => {
                console.log(response.data.episodes);
                setEpisodes(response.data.episodes);
            })
            .catch(error => {
                console.error(error);
            })
    };

    const NonVu = (episodeId) => {
        const token = localStorage.getItem("token");
        axios.delete(`https://api.betaseries.com/episodes/watched?id=${episodeId}&client_id=be42888c11dd&token=${token}`)
            .then(response => {
                console.log(response.data);
                console.log("Episode marqué comme non vue");
                DisplayEpisode();

            })

            .catch(error => {
                console.error(error);
            })
    }

    return(
        <>
             <button onClick={() => navigate('/profil')} className="secondary">Aller sur profil</button>
            <h1>Voici les épisodes que tu as vu</h1>
            <div className="episodes">
            {episodes.map(episode => (
            <div
                key={episode.id}
                className="div"
                
            >
              <img src={`https://api.betaseries.com/pictures/episodes?id=${episode.id}&client_id=be42888c11dd`} alt={`Episode ${episode.code}`} />
              <h4>{episode.code} : {episode.title}</h4>
              <button onClick={() => NonVu(episode.id)}>Marqué comme non vu</button>
              <button onClick={() => navigate(`/commentaires/${episode.id}`)} className="secondary">Voir details</button>
            </div>
        ))}
        </div>
        </>
    )
}

export default MemberEpisodes;