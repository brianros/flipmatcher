// src/App.jsx
import React from 'react';
import GameFlow from './components/GameFlow';
import Footer from './components/Footer';
import Header from './components/Header';
function App() {
  return (
    <div className="h-screen flex flex-col bg-transparent overflow-hidden relative">
      <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: "url('/src/assets/bkg.jpg')", opacity: 0.5, zIndex: -1 }}></div>
      <div><Header />
      <GameFlow />
      <div className="absolute bottom-0 w-full"><Footer /></div></div>
    </div>
  );
}
export default App;