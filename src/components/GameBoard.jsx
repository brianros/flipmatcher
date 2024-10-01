// src/components/GameBoard.jsx
import React from 'react';
import Card from './Card';

const GameBoard = ({ cards, onCardClick, rows, cols }) => {
  return (
    <div 
      className="grid gap-2"
      style={{
        gridTemplateColumns: `repeat(${cols}, minmax(0, 1fr))`,
        width: '100%',
        maxWidth: '600px', 
      }}
    >
      {cards.map((card) => (
        <Card
          key={card.id}
          {...card}
          onClick={() => onCardClick(card.id)}
        />
      ))}
    </div>
  );
};

export default GameBoard;