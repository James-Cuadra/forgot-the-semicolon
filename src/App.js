import { Routes, Route } from 'react-router-dom';
import React from 'react';
import HomePage from './pages/HomePage';
import PasswordGenerator from './pages/PasswordGenerator';
import Woops from './pages/Woops';
import TicTacToe from './pages/TicTacToe';

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/week1" element={<PasswordGenerator />} />
        <Route path="/week2" element={<TicTacToe />} />
        <Route path="/week3" element={<Woops />} />
        <Route path="/week4" element={<Woops />} />
      </Routes>
    </div>
  );
}

export default App;
