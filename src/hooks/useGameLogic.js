// src/hooks/useGameLogic.js
import { useState, useEffect } from 'react';
import { PATTERNS } from '../constants'; // Assuming you have a constants file for patterns

const useGameLogic = (initialBoardSize) => {
    const [cards, setCards] = useState([]);
    const [flippedCards, setFlippedCards] = useState([]);
    const [matchedPairs, setMatchedPairs] = useState([]);
    const [score, setScore] = useState(0);
    const [moves, setMoves] = useState(0);

    const resetGame = (boardSize) => {
        const totalCards = boardSize.rows * boardSize.cols;
        const pairsNeeded = totalCards / 2;
        const selectedPatterns = [];

        for (let i = 0; i < pairsNeeded; i++) {
            const randomPattern = PATTERNS[Math.floor(Math.random() * PATTERNS.length)];
            selectedPatterns.push(randomPattern);
        }

        const newCards = selectedPatterns.flatMap((pattern, index) => [
            { id: `card-${index * 2}`, patternId: pattern, isFlipped: false },
            { id: `card-${index * 2 + 1}`, patternId: pattern, isFlipped: false }
        ]);
        setCards(newCards.sort(() => Math.random() - 0.5));
        setFlippedCards([]);
        setMatchedPairs([]);
        setScore(0);
        setMoves(0);
    };

    const handleCardClick = (id) => {
        if (flippedCards.length < 2) {
            setFlippedCards(prev => [...prev, id]);
            setMoves(prev => prev + 1);
        }
    };

    const checkMatch = (cardsToCheck) => {
        if (cardsToCheck.length !== 2) return;

        const [firstId, secondId] = cardsToCheck;
        const firstCard = cards.find(card => card.id === firstId);
        const secondCard = cards.find(card => card.id === secondId);

        if (firstCard && secondCard && firstCard.patternId === secondCard.patternId) {
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
    };

    useEffect(() => {
        resetGame(initialBoardSize);
    }, [initialBoardSize]);

    return {
        cards,
        flippedCards,
        matchedPairs,
        score,
        moves,
        resetGame,
        handleCardClick,
        checkMatch,
    };
};

export default useGameLogic;