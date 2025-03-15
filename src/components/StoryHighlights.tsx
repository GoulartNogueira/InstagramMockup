import React from 'react';
import { Highlight } from '../types';

interface StoryHighlightsProps {
  highlights: Highlight[];
  showAddNew: boolean;
}

const StoryHighlights: React.FC<StoryHighlightsProps> = ({ highlights, showAddNew }) => {
  return (
    <div
      className="px-2 py-3 overflow-x-auto"
      style={{ msOverflowStyle: 'none', scrollbarWidth: 'none' }}
    >
      <div className="flex space-x-4">
        {showAddNew && (
          <div className="flex flex-col items-center">
            <div className="w-16 h-16 rounded-full border border-gray-300 flex items-center justify-center">
              <span className="text-3xl">+</span>
            </div>
            <span className="text-xs mt-1">Novo</span>
          </div>
        )}
        {highlights.map((highlight, index) => (
          <div key={`highlight-${index}`} className="flex flex-col items-center">
            <div className="w-16 h-16 rounded-full border border-gray-300 overflow-hidden">
              <img
                src={highlight.image}
                className="w-full h-full object-cover"
                alt={highlight.name}
              />
            </div>
            <span className="text-xs mt-1">{highlight.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default StoryHighlights;