import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const Commentaires = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [commentaires, setCommentaires] = useState([]);
    const [comment, setComment] = useState('');
    const [episode, setEpisode] = useState([]);
    useEffect(() => {
        const token = localStorage.getItem("token");
        axios.get(`https://api.betaseries.com/episodes/display?id=${id}&client_id=be42888c11dd&token=${token}`)
            .then(response => {
                console.log(response.data.episode)
                setEpisode(response.data.episode)
            })
            .catch(error => {
                console.error(error);
            })

    DisplayComment();
    }, [])

    const DisplayComment = () => {
        const token = localStorage.getItem("token");
        console.log(token);
        axios.get(`https://api.betaseries.com/comments/comments?type=episode&id=${id}&nbpp=10&client_id=be42888c11dd`)
            .then(response => {
                console.log(response.data.comments);
                setCommentaires(response.data.comments);
            })

            .catch(error => {
                console.error(error);
            })
        
    }


    const handleCommentChange = (event) => {
        setComment(event.target.value);
        console.log(event.target.value);
    };

    const handleSubmit = () => {
        const token = localStorage.getItem("token");
       axios.post(`https://api.betaseries.com/comments/comment?type=episode&id=${id}&text=${comment}&token=${token}&client_id=be42888c11dd`)
        .then(response => {
            console.log(response.data);
            DisplayComment();
        })
        .catch(error => {
            console.error(error);
        })
    }


    
    return (
        <>
        <button onClick={() => navigate(`/series`)} className="secondary retour-button">Retourner en arrière</button>
        <div className="episode">
        <button onClick={() => navigate('/profil')} className="secondary">Aller sur profil</button>
        <h4>{episode.code} : {episode.title}</h4>
        <img src={`https://api.betaseries.com/pictures/episodes?id=${episode.id}&client_id=be42888c11dd`} alt={`Episode ${episode.code}`} />
              
               
        
        <h4>Voici les commentaires reliés à cette épisode</h4>
        {commentaires.map(commentaire =>{
            return(
            <div key={commentaire.id}>
                
                <p>{commentaire.login} : {commentaire.text}</p>
            </div>
            )
        })}
        <form onSubmit={handleSubmit}>
                    <textarea
                      placeholder="Donne moi ton avis sur l'épisode"
                      value={comment}
                      onChange={handleCommentChange}
                    ></textarea>
                    <br />
                    <button type='submit'>Envoyer</button>
                  </form>
                  </div>     
        </>
    );
}

export default Commentaires;