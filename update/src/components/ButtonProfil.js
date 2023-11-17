import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./Profile.css";

const Button = () => {

    const[token, seToken] = useState([]);
    const[userData, setUserData] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {

    
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
    }, [])

    return(
        <>
            <div className="avatar" onClick={navigate('/profil')}>
                <p>{userData.login}</p>
            <img src={userData.avatar}></img>
            
            </div>
        </>
    )
}

export default Button;