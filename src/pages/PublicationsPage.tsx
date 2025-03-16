import React, { useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';
import { useProfileContext } from '../context/ProfileContext';

const PublicationsPage: React.FC = () => {
  const { profileData } = useProfileContext();
  const { photoIndex } = useParams<{ photoIndex: string }>();
  const photoRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    if (photoIndex && photoRefs.current[parseInt(photoIndex)]) {
      photoRefs.current[parseInt(photoIndex)]?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [photoIndex]);

  return (
    <div className="flex flex-col items-center">
      {profileData.posts_images.map((image, index) => (
        <div
          key={`post-image-${index}`}
          ref={(el: HTMLDivElement | null) => (photoRefs.current[index] = el)}
          className="w-full max-w-md mb-4"
        >
          <img
            src={image}
            className="w-full h-auto object-cover"
            alt={`Post ${index + 1}`}
          />
        </div>
      ))}
    </div>
  );
};

export default PublicationsPage;
