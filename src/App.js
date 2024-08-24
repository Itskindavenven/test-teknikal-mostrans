import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import CharactersList from './pages/CharactersList';
import CharacterDetail from './pages/CharacterDetail';
import CharactersByLocation from './pages/CharactersByLocation';

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<CharactersList />} />
        <Route path="/character/:id" element={<CharacterDetail />} />
        <Route path="/locations" element={<CharactersByLocation />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
