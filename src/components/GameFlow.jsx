import React, { useState, useEffect, useCallback } from 'react';
import GameBoard from './GameBoard';
import SizeSelector from './SizeSelector';
import LoadingOverlay from './LoadingOverlay';


// Dynamically import all SVGs
const svgFiles = import.meta.glob('../assets/svg/*.svg');

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


const GameFlow = () => {
  const [cards, setCards] = useState([]);
  const [boardSizeIndex, setBoardSizeIndex] = useState(4); // Default to 4x4
  const [flippedCards, setFlippedCards] = useState([]);
  const [matchedPairs, setMatchedPairs] = useState([]);
  const [isChecking, setIsChecking] = useState(false);
  const [score, setScore] = useState(0);
  const [moves, setMoves] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  const loadAssets = useCallback(async () => {
    const startTime = Date.now();

    try {
      await Promise.all(
        Object.entries(svgFiles).map(async ([path, importFn]) => {
          const module = await importFn();
          return [path, module.default];
        })
      );
    } catch (error) {
      console.error('Failed to load assets:', error);
    } finally {
      const endTime = Date.now();
      const loadTime = endTime - startTime;
      const remainingTime = Math.max(2000 - loadTime, 0);

      // Ensure a minimum loading time of 2 seconds
      setTimeout(() => {
        setIsLoading(false);
      }, remainingTime);
    }
  }, []);

  useEffect(() => {
    loadAssets();
  }, [loadAssets]);

  useEffect(() => {
    resetGame(BOARD_SIZES[boardSizeIndex]);
  }, [boardSizeIndex]);

  const resetGame = ([rows, cols]) => {
    const totalCards = rows * cols;
    const pairsNeeded = totalCards / 2;

    // Create an array to hold the selected patterns
    const selectedPatterns = [];

    // Randomly select patterns, allowing for repetition
    for (let i = 0; i < pairsNeeded; i++) {
      const randomPattern = PATTERNS[Math.floor(Math.random() * PATTERNS.length)];
      selectedPatterns.push(randomPattern);
    }

    const newCards = selectedPatterns.flatMap((pattern, index) => [
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
      setTimeout(() => checkMatch(newFlippedCards), 500);
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
    // Unflip any currently flipped cards
    setCards(prevCards => 
      prevCards.map(card => ({ ...card, isFlipped: false }))
    );

    // Delay the reshuffle to allow the unflip animation to complete
    setTimeout(() => {
      setBoardSizeIndex(newSizeIndex);
    }, 400); // Adjust the delay as needed (400ms for example)
  };

  const [rows, cols] = BOARD_SIZES[boardSizeIndex];
  const isGameOver = matchedPairs.length === (rows * cols) / 2;

  return (
    <div>
      <main className="flex-grow flex flex-col lg:flex-row items-start justify-center p-1 overflow-hidden">
        {/* Game Area Column */}
        <div className="w-full lg:w-[60%] h-full flex flex-col items-center relative top-0 border-2 border-blue-700">
          <div className="mb-0 text-xs sm:text-sm"> 
            <span className="mr-4">Score: {score}</span>
            <span>Moves: {Math.ceil(moves / 2)}</span>
          </div>
          <div className="w-full flex-grow flex items-start justify-center">
            <div 
              className="relative"
              style={{
                width: cols >= rows ? '100%' : 'auto',
                height: rows >= cols ? '80%' : 'auto',
                aspectRatio: `${cols} / ${rows}`,
                maxWidth: '80%',
                maxHeight: '80%',
              }}
            >
              <GameBoard cards={cards} onCardClick={handleCardClick} rows={rows} cols={cols} />
            </div>
          </div>
        </div>

        {/* Size Selector Column */}
        <div className="w-full lg:w-[10%] h-full mr-2 border-blue-800 border-2 lg:mr-0 lg:mb-0 mb-2 flex justify-center">
          <SizeSelector 
            sizes={BOARD_SIZES}
            value={boardSizeIndex} 
            onChange={handleSizeChange} 
            className="lg:rotate-0 rotate-180" // Rotate for small screens
          />
        </div>
      </main>
      

      {/* Game over modal */}
      {isGameOver && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
          <div className="bg-white p-6 sm:p-8 rounded-lg text-center max-w-xs sm:max-w-sm">
            <h2 className="text-xl sm:text-2xl font-bold mb-4">Congratulations! You've won!</h2>
            <button 
              className="bg-red-700 hover:bg-red-700 text-white font-bold py-2 px-4 rounded text-sm sm:text-base"
              onClick={() => {
                // Unflip any currently flipped cards
                setCards(prevCards => 
                  prevCards.map(card => ({ ...card, isFlipped: false }))
                );

                // Delay the reshuffle to allow the unflip animation to complete
                setTimeout(() => {
                  resetGame(BOARD_SIZES[boardSizeIndex]);
                }, 400); // Adjust the delay as needed (400ms for example)
              }}
            >
              Play Again
            </button>
          </div>
        </div>
      )}

      {/* Loading overlay */}
      {isLoading && <LoadingOverlay />}
    </div>
  );
};

export default GameFlow;
