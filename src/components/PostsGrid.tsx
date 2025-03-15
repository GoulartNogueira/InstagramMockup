import React from 'react';
import { Copy } from 'lucide-react';

interface PostsGridProps {
  posts: string[];
}

const PostsGrid: React.FC<PostsGridProps> = ({ posts }) => {
  return (
    <div className="flex-1">
      <div className="grid grid-cols-3 gap-0.5">
        {posts.map((image, index) => (
          <div key={`post-image-${index}`} className="aspect-square bg-gray-100 relative">
            <img
              src={image}
              className="w-full h-full object-cover"
              alt={`Post ${index + 1}`}
            />
            {/* Multi-image indicator for some posts */}
            {index % 7 === 0 && (
              <Copy size={16} className="absolute top-2 right-2" color="white" />
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default PostsGrid;