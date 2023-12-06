import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./Profile.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
  import { faCoffee } from '@fortawesome/free-solid-svg-icons'
import DefaultImage from "./baby-foot.jpg"


const Profil = () => {
    const[token, seToken] = useState([]);
    const[userData, setUserData] = useState([]);
    const[series, setSeries] = useState([]);
    const navigate = useNavigate();
    const [selectedSeriesId, setSelectedSeriesId] = useState(null);
    const [code, setCode] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        const urlParams = new URLSearchParams(window.location.search);
        const code = urlParams.get("code");
        setCode(code);

        let data = '';
        

        let config = {
        method: 'post',
        maxBodyLength: Infinity,
        url: `https://api.betaseries.com/oauth/access_token?client_id=be42888c11dd&client_secret=4f84b96f582fe7838ae1814d287bbc9b&redirect_uri=https://previous-tiokoorxa-bourguignons-projects.vercel.app/profil&code=${code}`,
        headers: { },
        data : data
        };

        axios.request(config)
        .then((response) => {
         console.log(JSON.stringify(response.data));
         seToken(response.data.access_token);
         localStorage.setItem("token", response.data.access_token);
        })
        .catch((error) => {
        console.log(error); 

    });
    const token = localStorage.getItem("token");
    axios.get(`https://api.betaseries.com/members/infos?key=be42888c11dd&token=${token}`)
        .then(response => {
            console.log(response.data.member);
            console.log(`https://api.betaseries.com/members/infos?key=be42888c11dd&token=${token}`)
            setUserData(response.data.member);
        })
        .catch(error => {
            console.error(error);
        })
    
    // axios.get(`https://api.betaseries.com/shows/list?client_id=be42888c11dd&token=${token}`)
    //     .then(response => {
    //         console.log(response.data.shows);
    //         setSeries(response.data.shows);
    //     })
    //     .catch(error => {
    //         console.error(error);
    //     })

    axios.get(`https://api.betaseries.com/shows/member?client_id=be42888c11dd&token=${token}`)
        .then(response => {
            console.log(response.data.shows);
            setSeries(response.data.shows);
        })
        .catch(error => {
            console.error(error);
        })

}, []);
const handleSeriesClick = (serieId) => {
    setSelectedSeriesId(serieId);

    setTimeout(() => {
        if (selectedSeriesId) {
            navigate(`/Description/${selectedSeriesId}`);
        }
    }, 3000);
};

const AddSerie = (serieId) => {
    const token = localStorage.getItem("token");
    axios.post(`https://api.betaseries.com/shows/show?id=${serieId}&token=${token}&client_id=be42888c11dd`)
        .then(response => {
            console.log("La série a bien été ajouté");
        })
        .catch(error => {
            console.error(error);
        })
}

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

  const HandleLogout = () => {
    const token = localStorage.getItem("token");
    axios.post(`https://api.betaseries.com/members/destroy&token=${token}`)
        .then(response => {
            console.log("tu es deconnecté a bientot")
            seToken(null);
            navigate("/");
            localStorage.removeItem("token");
        })
        .catch(error => {
            console.error(error);
        })
    // 
    
 
  };

const Delete = (seriesId) => {
    const token = localStorage.getItem("token");
    axios.delete(`https://api.betaseries.com/shows/show?id=${seriesId}&token=${token}&client_id=be42888c11dd`)
        .then(response => {
            console.log("La série a bien été supprimé");
            window.location.reload();
        })
        .catch(error => {
            console.error(error);
        })
}





    
    return (
        <>
        <img src={userData.profile_banner} className="banner" />
      <img src={userData.avatar} className="profile-image rounded" />
        <p>Salut a toi {userData.login}</p>
        <div className="series">
        
        {series.map(serie => {
            const genreEntries = Object.entries(serie.genres);

            return(
            <div key={serie.id} onClick={() => handleSeriesClick(serie.id)} className="clickable-div">
            <button onClick={() => Delete(serie.id)} className="secondary plus">Supprimer</button>
            <h2 key={serie.id}>{serie.title}</h2>
            {serie.images.poster !== null ?(
            <img src={serie.images.poster}/>
            ) : (
                <img src={DefaultImage}/>
            )}
            {/* <button onClick={() => AddSerie(serie.id)}>&#65291;</button> */}
            <button onClick={() => navigate(`/episodes/${serie.id}`)} className="secondary">Voir épisodes</button>
            <button onClick={() => Archivate(serie.id)} className="secondary">Archiver</button>
            </div>  
            );
        })}
        </div>
        <button onClick={() => navigate("/avis")} className="secondary">Voir les archives</button>
        <button onClick={() => navigate("/series")} className="secondary">Voir les autres séries</button>
        <button onClick={() => navigate("/friends")} className="secondary">Voir les amis</button>
        <button onClick={() => navigate("/memberEpisodes")} className="secondary">Voir tes épisodes</button>
        <button onClick={HandleLogout} className="secondary">Se deconnecter</button>
        </>

    );
}

export default Profil;