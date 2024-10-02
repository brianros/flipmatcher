// src/components/GameBoard.jsx
import React from 'react';
import Card from './Card';

const GameBoard = ({ cards, onCardClick, rows, cols }) => {
  return (
    <div className="w-full h-[80vh] flex items-center justify-center border-2 border-red-600">
      <div 
        className="grid gap-1 sm:gap-2"
        style={{
          gridTemplateColumns: `repeat(${cols}, 1fr)`,
          gridTemplateRows: `repeat(${rows}, 1fr)`,
          aspectRatio: `${cols} / ${rows}`,
          width: cols >= rows ? '100%' : 'auto',
          height: rows > cols ? '100%' : 'auto',
          maxWidth: '100%',
          maxHeight: '80%',
          position: 'absolute',
          top: 0,
          left: 0,
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