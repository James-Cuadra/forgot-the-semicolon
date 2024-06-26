import { Routes, Route } from 'react-router-dom';
import React from 'react';
import HomePage from './pages/HomePage';
import PasswordGenerator from './pages/PasswordGenerator';
import Woops from './pages/Woops';
import TicTacToe from './pages/TicTacToe';
import Weather from './pages/Weather';
import Connect4 from './pages/Connect4';

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/challenge1" element={<PasswordGenerator />} />
        <Route path="/challenge2" element={<TicTacToe />} />
        <Route path="/challenge3" element={<Weather />} />
        <Route path="/challenge4" element={<Connect4 />} />
      </Routes>
    </div>
  );
}

export default App;
