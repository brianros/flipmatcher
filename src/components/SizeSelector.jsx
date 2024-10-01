// src/components/SizeSelector.jsx
import React from 'react';

const SizeSelector = ({ sizes, value, onChange }) => {
  return (
    <div className="mb-4 w-full max-w-xs">
      <label htmlFor="size-selector" className="block text-sm font-medium text-gray-700 mb-2">
        Board Size: {sizes[value][0]}x{sizes[value][1]}
      </label>
      <input
        type="range"
        id="size-selector"
        min={0}
        max={sizes.length - 1}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="w-full"
      />
      <div className="flex justify-between text-xs text-gray-500 mt-1">
        <span>{sizes[0][0]}x{sizes[0][1]}</span>
        <span>{sizes[sizes.length - 1][0]}x{sizes[sizes.length - 1][1]}</span>
      </div>
    </div>
  );
};

export default SizeSelector;