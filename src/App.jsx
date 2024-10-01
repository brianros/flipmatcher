// src/App.jsx
import React, { useState, useEffect } from 'react';
import GameBoard from './components/GameBoard';
import SizeSelector from './components/SizeSelector';

// Dynamically import all SVGs
const svgFiles = import.meta.glob('./assets/svg/*.svg');

// Extract filenames without extension
const PATTERNS = Object.keys(svgFiles).map(file => {
  const filename = file.split('/').pop();
  return filename.substring(0, filename.lastIndexOf('.'));
});

// Define board sizes: [rows, columns]
const BOARD_SIZES = [
  [2, 2], [2, 3], [2, 4], [3, 4], [4, 4], [4, 5],
  [4, 6], [5, 6], [6, 6], [6, 7], [6, 8], [7, 8], [8, 8]
];

function App() {
  const [cards, setCards] = useState([]);
  const [boardSizeIndex, setBoardSizeIndex] = useState(4); // Default to 4x4
  const [flippedCards, setFlippedCards] = useState([]);
  const [matchedPairs, setMatchedPairs] = useState([]);
  const [isChecking, setIsChecking] = useState(false);
  const [score, setScore] = useState(0);
  const [moves, setMoves] = useState(0);

  useEffect(() => {
    resetGame(BOARD_SIZES[boardSizeIndex]);
  }, [boardSizeIndex]);

  const resetGame = ([rows, cols]) => {
    const totalCards = rows * cols;
    const pairsNeeded = totalCards / 2;
    
    let patterns = [...PATTERNS];
    while (patterns.length < pairsNeeded) {
      patterns = [...patterns, ...PATTERNS];
    }
    patterns = patterns.slice(0, pairsNeeded);

    const newCards = patterns.flatMap((pattern, index) => [
      { id: index * 2, patternId: pattern, isFlipped: false },
      { id: index * 2 + 1, patternId: pattern, isFlipped: false }
    ]);
    setCards(newCards.sort(() => Math.random() - 0.5));
    setFlippedCards([]);
    setMatchedPairs([]);
    setScore(0);
    setMoves(0);
  };

  const handleCardClick = (id) => {
    if (isChecking || flippedCards.length === 2 || flippedCards.includes(id) || matchedPairs.includes(cards.find(card => card.id === id).patternId)) return;

    const newFlippedCards = [...flippedCards, id];

    setCards(prevCards => 
      prevCards.map(card => 
        card.id === id ? { ...card, isFlipped: true } : card
      )
    );
    
    setFlippedCards(newFlippedCards);
    setMoves(prev => prev + 1);

    if (newFlippedCards.length === 2) {
      setIsChecking(true);
      setTimeout(() => checkMatch(newFlippedCards), 1000);
    }
  };

  const checkMatch = (cardsToCheck) => {
    if (cardsToCheck.length !== 2) {
      console.error('checkMatch called with incorrect number of flipped cards');
      setIsChecking(false);
      return;
    }

    const [firstId, secondId] = cardsToCheck;
    const firstCard = cards.find(card => card.id === firstId);
    const secondCard = cards.find(card => card.id === secondId);

    if (!firstCard || !secondCard) {
      console.error('Unable to find one or both cards');
      setFlippedCards([]);
      setIsChecking(false);
      return;
    }

    if (firstCard.patternId === secondCard.patternId) {
      setMatchedPairs(prev => [...prev, firstCard.patternId]);
      setScore(prev => prev + 1);
    } else {
      setCards(prevCards => 
        prevCards.map(card => 
          (card.id === firstId || card.id === secondId)
            ? { ...card, isFlipped: false } 
            : card
        )
      );
    }

    setFlippedCards([]);
    setIsChecking(false);
  };

  const handleSizeChange = (newSizeIndex) => {
    setBoardSizeIndex(newSizeIndex);
  };

  const [rows, cols] = BOARD_SIZES[boardSizeIndex];
  const isGameOver = matchedPairs.length === (rows * cols) / 2;

  return (
    <div className="h-screen flex flex-col bg-gray-100 overflow-hidden">
      {/* Navbar */}
      <nav className="flex-shrink-0 h-[10vh] min-h-[60px] flex items-center justify-center bg-blue-500 text-white">
        <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold">Memory Match</h1>
      </nav>

      {/* Main content */}
      <main className="flex-grow flex flex-col items-center justify-center p-2 sm:p-4 md:p-6 overflow-hidden">
        <div className="w-full h-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg xl:max-w-xl flex flex-col items-center">
          <SizeSelector 
            sizes={BOARD_SIZES}
            value={boardSizeIndex} 
            onChange={handleSizeChange} 
          />
          <div className="mb-2 text-xs sm:text-sm md:text-base lg:text-lg">
            <span className="mr-4">Score: {score}</span>
            <span>Moves: {Math.ceil(moves / 2)}</span>
          </div>
          <div className="flex-grow w-full flex items-center justify-center">
            <div className="w-full h-full max-w-[80vmin] max-h-[80vmin] aspect-square">
              <GameBoard cards={cards} onCardClick={handleCardClick} rows={rows} cols={cols} />
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="flex-shrink-0 h-[5vh] min-h-[30px] flex items-center justify-center bg-gray-200 text-xs sm:text-sm">
        <p>&copy; 2023 Memory Match Game</p>
      </footer>

      {/* Game over modal */}
      {isGameOver && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
          <div className="bg-white p-6 sm:p-8 rounded-lg text-center max-w-xs sm:max-w-sm">
            <h2 className="text-xl sm:text-2xl font-bold mb-4">Congratulations! You've won!</h2>
            <button 
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded text-sm sm:text-base"
              onClick={() => resetGame(BOARD_SIZES[boardSizeIndex])}
            >
              Play Again
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;