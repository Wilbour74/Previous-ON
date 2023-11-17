import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import DefaultImage from "./baby-foot.jpg";
import Button from "./ButtonProfil";

const Series = () => {
    const navigate = useNavigate();
    const[series, setSeries] = useState([]);
    const [selectedSeriesId, setSelectedSeriesId] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;
    const[token, seToken] = useState([]);
    const [searchValue, setSearchValue] = useState("");


    useEffect(() => {
        const token = localStorage.getItem("token");
        axios.get(`https://api.betaseries.com/shows/list?client_id=be42888c11dd&token=${token}`)
        .then(response => {
            console.log(response.data.shows);
            setSeries(response.data.shows);
        })
        .catch(error => {
            console.error(error);
        })

        

    }, [currentPage])

    const AddSerie = (serieId) => {
        const token = localStorage.getItem("token");
        axios.post(`https://api.betaseries.com/shows/show?id=${serieId}&token=${token}&client_id=be42888c11dd`)
            .then(response => {
                console.log("La série a bien été ajouté");
                navigate('/profil');
            })
            .catch(error => {
                console.error(error);
            })
    }

    const handleSeriesClick = (serieId) => {
        setSelectedSeriesId(serieId);
    
        setTimeout(() => {
            if (selectedSeriesId) {
                navigate(`/Description/${selectedSeriesId}`);
            }
        }, 3000);
    };

    const handleSearchInputChange = (event) => {
        setSearchValue(event.target.value);
      };
    
    const performSearch = (value) => {
        const token = localStorage.getItem("token");
        if(value === ""){
        
        axios.get(`https://api.betaseries.com/shows/list?client_id=be42888c11dd&token=${token}`)
        .then(response => {
            console.log(response.data.shows);
            setSeries(response.data.shows);
        })
        .catch(error => {
            console.error(error);
        })
        }

        else{
            axios.get(`https://api.betaseries.com/shows/search?client_id=be42888c11dd&token=${token}&title=${value}`)
                .then(response => {
                console.log(response.data.shows);
                setSeries(response.data.shows);
            })
                .catch(error => {
                    console.error(error);
                })
        }
      };
    
    

    return(
        <>
           <button onClick={() => navigate('/profil')} className="secondary">Aller sur profil</button>
            <h2>Voici la liste des séries</h2>

            <div className="search-bar">
                <input
                    type="text"
                    placeholder="Rechercher par nom"
                    value={searchValue}
                    onChange={handleSearchInputChange}
                />
                    <button onClick={() => performSearch(searchValue)}>Rechercher</button>
                </div>
            <div className="series">
             {series.map(serie => {
            const genreEntries = Object.entries(serie.genres);

            return(
            <div key={serie.id} onClick={() => handleSeriesClick(serie.id)} className="clickable-div">
            <button onClick={() => AddSerie(serie.id)} className="secondary plus">&#65291;</button>
            <h2 key={serie.id}>{serie.title}</h2>
            {serie.images.poster !== null ?(
            <img src={serie.images.poster}/>
            ) : (
                <img src={DefaultImage}/>
            )}
            
            <button onClick={() => navigate(`/episodes/${serie.id}`)} className="secondary">Voir épisodes</button>
            {/* <button onClick={() => Archivate(serie.id)} className="secondary">Archiver</button> */}
            </div>  
            );
             })}
             </div>
            

        </>
    )
}

export default Series;