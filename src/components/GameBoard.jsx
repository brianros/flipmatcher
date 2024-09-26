import React from 'react'
import Card from './Card'

const GameBoard = ({ cards, onCardClick }) => {
  return (
    <div className="grid grid-cols-4 gap-4">
      {cards.map((card) => (
        <Card
          key={card.id}
          {...card}
          onClick={() => onCardClick(card.id)}
        />
      ))}
    </div>
  )
}

export default GameBoard