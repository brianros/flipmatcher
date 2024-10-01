// src/components/GameBoard.jsx
import React from 'react';
import Card from './Card';

const GameBoard = ({ cards, onCardClick, rows, cols }) => {
  return (
    <div className="w-full h-full flex items-center justify-center">
      <div 
        className="grid gap-1 sm:gap-2"
        style={{
          gridTemplateColumns: `repeat(${cols}, 1fr)`,
          gridTemplateRows: `repeat(${rows}, 1fr)`,
          aspectRatio: `${cols} / ${rows}`,
          width: cols > rows ? 'auto' : '100%',
          height: rows > cols ? 'auto' : '100%',
          maxWidth: '100%',
          maxHeight: '100%',
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
    </div>
  );
};

export default GameBoard;