import './App.css';
import React from "react";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './components/HomePage';
import Profil from './components/Profil';
import Description from './components/Description';
import Episode from './components/Episodes'; 
import Commentaires from './components/Commentaires';
import MemberEpisodes from './components/MemberEpisodes';
import FriendList from './components/Ami';
import Series from './components/Serie';


function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/profil" element={<Profil />} />
          <Route path="/Description/:id" element={<Description />}/>
          <Route path="/episodes/:id" element={<Episode />}/>
          <Route path="/commentaires/:id" element={<Commentaires />} />
          <Route path="/memberEpisodes" element={<MemberEpisodes />} />
          <Route path="/friends" element={<FriendList />} />
          <Route path="/series" element={<Series />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
