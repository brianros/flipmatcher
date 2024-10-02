// src/App.jsx
import React from 'react';
import GameFlow from './components/GameFlow';
import Footer from './components/Footer';
import Header from './components/Header';
function App() {
  return (
    <div className="h-screen flex flex-col bg-gray-100 overflow-hidden">
      <Header />
      <GameFlow />
      <Footer />
    </div>
  );
}

export default App;