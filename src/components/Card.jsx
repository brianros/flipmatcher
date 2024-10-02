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
        duration: isFlipped ? 0.4 : 0.3, // Set different durations
        ease: "power2.inOut"
      });
    }
  }, [isFlipped]);

  return (
    <div className="aspect-square max-w-[250px] max-h-[250px] min-w-[60px] min-h-[60px] flex justify-center items-center mx-auto">
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
          className="absolute inset-0 backface-hidden rounded-sm sm:rounded-lg  flex items-center justify-center border-2 border-blue-600" 
          style={{backgroundImage: `repeating-conic-gradient(
            from 0deg at -30% -20%,
            rgba(255, 255, 255, 0.7) 0deg 6deg,
            rgba(255, 0, 0, 0.7) 4deg 8deg
            
          )`,
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