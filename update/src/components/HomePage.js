import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
const HomePage = () => {
    return (
        <>
        
        <button>
        <Link to="https://www.betaseries.com/authorize?client_id=be42888c11dd&redirect_uri=http://localhost:3000/profil">
          Connecte toi
        </Link>
      </button>
        <p>Bienvenue ton explorateur de séries</p>
        </>
    )
}

export default HomePage;