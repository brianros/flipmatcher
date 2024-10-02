// src/components/SVGPattern.jsx
import React, { useState, useEffect } from 'react';

const SVGPattern = ({ patternId }) => {
  const [svgContent, setSvgContent] = useState('');

  useEffect(() => {
    const loadSVG = async () => {
      try {
        const svgModule = await import(`../assets/svg/${patternId}.svg`);
        const response = await fetch(svgModule.default);
        const svgText = await response.text();
        // Remove width and height attributes to allow SVG to scale
        const modifiedSvgText = svgText.replace(/(width|height)="[^"]*"/g, '');
        setSvgContent(modifiedSvgText);
      } catch (error) {
        console.error('Error loading SVG:', error);
      }
    };

    loadSVG();
  }, [patternId]);

  return (
    <div className="w-[90] h-[90]" dangerouslySetInnerHTML={{ __html: svgContent }} />
  );
};

export default SVGPattern;