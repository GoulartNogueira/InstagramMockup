import React from 'react';
import { Grid, Play, User } from 'lucide-react';

const ContentTabs: React.FC = () => {
  return (
    <div className="border-t border-gray-300 flex justify-around">
      <button className="py-2 px-4 border-b-2 border-black">
        <Grid size={24} />
      </button>
      <button className="py-2 px-4">
        <Play size={24} />
      </button>
      <button className="py-2 px-4">
        <User size={24} />
      </button>
    </div>
  );
};

export default ContentTabs;