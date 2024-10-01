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
        duration: 0.4,
        ease: "power2.inOut"
      });
    }
  }, [isFlipped]);

  return (
    <div className="aspect-square w-full h-full">
      <div 
        ref={cardRef}
        onClick={onClick}
        className="w-full h-full bg-white rounded-sm sm:rounded-lg shadow-md cursor-pointer relative"
        style={{ transformStyle: 'preserve-3d' }}
      >
        {/* Back of the card */}
        <div 
          className="absolute inset-0 backface-hidden bg-white hover:bg-red-100 border-black border-2 rounded-sm sm:rounded-lg flex items-center justify-center"
          style={{ 
            backfaceVisibility: 'hidden',
            transform: 'rotateY(0deg)'
          }}
        >
          <div className="w-1/2 h-1/2 bg-red-600 rounded-full"></div>
        </div>
        
        {/* Front of the card (with SVG pattern) */}
        <div 
          className="absolute inset-0 backface-hidden bg-white rounded-sm sm:rounded-lg flex items-center justify-center" 
          style={{ 
            backfaceVisibility: 'hidden',
            transform: 'rotateY(180deg)'
          }}
        >
          <div className="w-full h-full p-1 sm:p-2">
            <SVGPattern patternId={patternId} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card;