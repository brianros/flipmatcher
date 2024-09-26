// src/components/Card.jsx
import React, { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import SVGPattern from './SVGPattern';

const Card = ({ id, isFlipped, patternId, onClick }) => {
  const cardRef = useRef(null);

  useEffect(() => {
    if (cardRef.current) {
      gsap.to(cardRef.current, {
        rotationY: isFlipped ? 180 : 0,
        duration: 0.6,
        ease: "power2.inOut"
      });
    }
  }, [isFlipped]);

  return (
    <div 
      ref={cardRef}
      onClick={onClick}
      className="w-24 h-24 bg-white rounded-lg shadow-md cursor-pointer relative"
      style={{ transformStyle: 'preserve-3d' }}
    >
      {/* Back of the card */}
      <div 
        className="w-full h-full absolute bg-blue-500 rounded-lg flex items-center justify-center"
        style={{ 
          backfaceVisibility: 'hidden',
          transform: 'rotateY(0deg)'
        }}
      >
        <div className="w-16 h-16 bg-white rounded-full"></div>
      </div>
      
      {/* Front of the card (with SVG pattern) */}
      <div 
        className="w-full h-full absolute bg-white rounded-lg flex items-center justify-center" 
        style={{ 
          backfaceVisibility: 'hidden',
          transform: 'rotateY(180deg)'
        }}
      >
        <div className="w-full h-full p-2">
          <SVGPattern patternId={patternId} />
        </div>
      </div>
    </div>
  );
};

export default Card;