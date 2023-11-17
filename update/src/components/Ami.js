import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import './FriendList.css';
const FriendList = () => {
    const [requests, setRequests] = useState([]);
    const navigate = useNavigate();
    const [amis, setAmis] = useState([]);
    const [blocked, setBlocked] = useState([]);
    const [requestSend, setRequestSend] = useState([]);
    const [searchQuery, setSearchQuery] = useState("");
    const [recherche, setRecherche] = useState(null);
    useEffect(() => {
        getRequests();
    }, [])

    const getRequests = () => {
        const token = localStorage.getItem("token");
         axios.get(`https://api.betaseries.com/friends/requests?token=${token}&received=true&client_id=be42888c11dd`)
            .then(response => {
                console.log(response.data.users);
                setRequests(response.data.users);
            })
            .catch(error => {
                console.error(error);
            })
        
        axios.get(`https://api.betaseries.com/friends/list?token=${token}&blocked=true&client_id=be42888c11dd`)
            .then(response => {
                console.log(response.data.users);
                setBlocked(response.data.users);
            })
            .catch(error => {
                console.error(error);
            })

        axios.get(`https://api.betaseries.com/friends/list?token=${token}&client_id=be42888c11dd`)
            .then(response => {
                console.log(response.data.users);
                setAmis(response.data.users);
            })
            .catch(error => {
                console.error(error);
            })

        axios.get(`https://api.betaseries.com/friends/requests?token=${token}&client_id=be42888c11dd`)
            .then(response => {
                console.log(response.data.users);
                setRequestSend(response.data.users);
            })
            .catch(error => {
                console.error(error);
            })
    };

    const AddFriends = (requestId) => {
        const token = localStorage.getItem("token");
        axios.post(`https://api.betaseries.com/friends/friend?&token=${token}&id=${requestId}&client_id=be42888c11dd`)
            .then(response => {
                console.log(response.data);
                console.log("Ami ajouté");
                getRequests();
            })

            .catch(error => {
                console.error(error);
            })
    }

    const Delete = (requestId) => {
        const token = localStorage.getItem("token");
        axios.delete(`https://api.betaseries.com/friends/friend?&token=${token}&id=${requestId}&client_id=be42888c11dd`)
            .then(response => {
                console.log(response.data);
                console.log("Ami supprimé");
                getRequests();
            })

            .catch(error => {
                console.error(error);
            })
    }

    const BlockFriends = (requestId) => {
        const token = localStorage.getItem("token");
        axios.post(`https://api.betaseries.com/friends/block?&token=${token}&id=${requestId}&client_id=be42888c11dd`)
            .then(response => {
                console.log(response.data);
                console.log("Tu l'as bien bloqué c'est pas sympa");
                getRequests();
            })
    }

    const UnBlock = (requestId) => {
        const token = localStorage.getItem("token");
        axios.delete(`https://api.betaseries.com/friends/block?&token=${token}&id=${requestId}&client_id=be42888c11dd`)
            .then(response => {
                console.log(response.data);
                console.log("Tu l'as débloqué c'est cool");
                getRequests();
            })
    };

    const handleSearch = (value) => {
        axios.get(`https://api.betaseries.com/members/search?&login=${value}&client_id=be42888c11dd`)
        .then(response => {
                console.log(response.data.users[0])
                setRecherche(response.data.users[0])
        })

        .catch(error => {
            console.error(error);
        })
      };

    return (
        <>
        <button onClick={() => navigate('/profil')} className="secondary retour-button">Aller sur profil</button>
        <div className="friend-list-container">
            
          <div className="friend-list">
        <div className="search-bar">
          <input
            type="text"
            placeholder="Rechercher des amis..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <button onClick={() => handleSearch(searchQuery)}>Rechercher</button>

            {recherche == null ? (
                <p>Aucun resultat trouvé</p>
            ): (
                <p>{recherche.login} <button onClick={() => AddFriends(recherche.id)}>Ajouter en ami</button></p>
            )}
          
        </div>

      
            <div className="friend-category">
              <h4>Voici tes demandes d'amis</h4>
              {requests.map((request) => (
                <div key={request.id} className="friend-item">
                  <p>{request.login}</p>
                  <button onClick={() => AddFriends(request.id)}>Accepter</button>
                </div>
              ))}
            </div>

            <div className="friend-category">
                    <h4>Voici tes demandes d'amis envoyées</h4>
                    {requestSend.map((request) => (
                        <div key={request.id} className="friend-item">
                            <p>{request.login}</p>
                            <button disabled>En attente</button>
                        </div>
                    ))}
                </div>
    
            <div className="friend-category">
              <h4>Voici tes amis</h4>
              {amis.map((ami) => (
                <div key={ami.id} className="friend-item">
                  <p>{ami.login}</p>
                  <button onClick={() => BlockFriends(ami.id)}>Bloquer</button>
                  <button onClick={() => Delete(ami.id)}>Supprimer</button>
                </div>
              ))}
            </div>
    
            <div className="friend-category">
              <h4>Voici tes amis que tu as bloqués</h4>
              {blocked.map((ami) => (
                <div key={ami.id} className="friend-item">
                  <p>{ami.login}</p>
                  <button onClick={() => UnBlock(ami.id)}>Débloquer</button>
                </div>
              ))}
            </div>
          </div>
        </div>
        </>
      );
}

export default FriendList;