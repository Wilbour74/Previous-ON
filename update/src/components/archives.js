import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import DefaultImage from "./baby-foot.jpg";
const Archives = () => {
    const navigate = useNavigate();
    const[series, setSeries] = useState([]);

    useEffect(() => {
        const token = localStorage.getItem("token");
    }, [])
}

export default Archives;