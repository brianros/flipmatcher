// src/App.jsx
import React, { useState, useEffect } from 'react';
import GameBoard from './components/GameBoard';

// Dynamically import all SVGs
const svgFiles = import.meta.glob('./assets/svg/*.svg');

// Extract filenames without extension
const PATTERNS = Object.keys(svgFiles).map(file => {
  const filename = file.split('/').pop();
  return filename.substring(0, filename.lastIndexOf('.'));
});

function App() {
  const [cards, setCards] = useState([]);

  useEffect(() => {
    const newCards = PATTERNS.flatMap((pattern, index) => [
      { id: index * 2, patternId: pattern, isFlipped: false },
      { id: index * 2 + 1, patternId: pattern, isFlipped: false }
    ]);
    setCards(newCards.sort(() => Math.random() - 0.5));
  }, []);

  const handleCardClick = (id) => {
    setCards(cards.map(card => 
      card.id === id ? { ...card, isFlipped: !card.isFlipped } : card
    ));
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center">
      <h1 className="text-4xl font-bold mb-8">Memory Match</h1>
      <GameBoard cards={cards} onCardClick={handleCardClick} />
    </div>
  );
}

export default App;