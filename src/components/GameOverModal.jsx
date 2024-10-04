import React from 'react';

const GameOverModal = ({ onClose, onPlayAgain }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4" onClick={onClose}>
      <div className="bg-white p-6 sm:p-8 rounded-lg text-center max-w-xs sm:max-w-sm" onClick={(e) => e.stopPropagation()}>
        <h2 className="text-xl sm:text-2xl font-bold mb-4">Congratulations! You've won!</h2>
        <button 
          className="bg-red-700 hover:bg-red-800 text-white font-bold py-2 px-4 rounded text-sm sm:text-base"
          onClick={onPlayAgain}
        >
          Play Again
        </button>
      </div>
    </div>
  );
};

export default GameOverModal;