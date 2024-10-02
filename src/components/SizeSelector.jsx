import React from 'react';

const SizeSelector = ({ sizes, value, onChange }) => {
  return (
    <div className="h-full flex flex-col justify-center items-center">
      <label htmlFor="size-selector" className="text-sm font-medium text-gray-700 mb-2 writing-mode-vertical-rl transform">
      <br /> Board Size: <br /> {sizes[value][0]}x{sizes[value][1]}
      <div className="flex flex-col items-center text-xs text-gray-500 mt-1"><br /><span>{sizes[sizes.length - 1][0]}x{sizes[sizes.length - 1][1]}</span></div>
      </label>
      <input
        type="range"
        id="size-selector"
        min={0}
        max={sizes.length - 1}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="h-48 -rotate-90"
        orient="vertical"
      />
      <div className="flex flex-col items-center text-xs text-gray-500 mt-1">
        
        <span>{sizes[0][0]}x{sizes[0][1]}</span>
      </div>
    </div>
  );
};

export default SizeSelector;