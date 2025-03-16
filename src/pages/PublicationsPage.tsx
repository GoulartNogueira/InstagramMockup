import React, { useEffect, useRef, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useProfileContext } from '../context/ProfileContext';
import { Heart, MessageCircle, Send, Bookmark, MoreHorizontal, ChevronLeft } from 'lucide-react';

// New interface for post data
interface PostData {
  id: number;
  image: string;
  likes: number;
  caption: string;
  comments: number;
  timestamp: string;
  liked: boolean;
  saved: boolean;
}

const PublicationsPage: React.FC = () => {
  const { profileData } = useProfileContext();
  const { photoIndex } = useParams<{ photoIndex: string }>();
  const photoRefs = useRef<(HTMLDivElement | null)[]>([]);
  const navigate = useNavigate();
  
  // Generate post data for each image in the profile
  const [posts, setPosts] = useState<PostData[]>(() => 
    profileData.posts_images.map((image, index) => ({
      id: index,
      image: image,
      likes: Math.floor(Math.random() * 100000) + 5000,
      caption: "Our investment in regenerative agriculture is strengthening our supply chain and making the business more resilient.",
      comments: Math.floor(Math.random() * 500) + 5,
      timestamp: "February 27",
      liked: false,
      saved: false
    }))
  );
  
  useEffect(() => {
    if (photoIndex && photoRefs.current[parseInt(photoIndex)]) {
      photoRefs.current[parseInt(photoIndex)]?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [photoIndex]);

  const goBack = () => {
    navigate('/');
  };

  const toggleLike = (postId: number) => {
    setPosts(prev => prev.map(post => {
      if (post.id === postId) {
        return {
          ...post,
          liked: !post.liked,
          likes: post.liked ? post.likes - 1 : post.likes + 1
        };
      }
      return post;
    }));
  };

  const toggleSave = (postId: number) => {
    setPosts(prev => prev.map(post => {
      if (post.id === postId) {
        return {
          ...post,
          saved: !post.saved
        };
      }
      return post;
    }));
  };

  return (
    <div className="flex flex-col items-center bg-black text-white min-h-screen">
      {/* Fixed top header */}
      <div className="w-full max-w-md flex justify-between items-center p-4 sticky top-0 bg-black z-10 border-b border-gray-800">
        <button onClick={goBack} className="text-white">
          <ChevronLeft size={24} />
        </button>
        <h1 className="text-lg font-medium">Post</h1>
        <div className="w-6"></div> {/* Empty div for spacing */}
      </div>

      {/* Posts */}
      <div className="w-full max-w-md">
        {posts.map((post, index) => (
          <div
            key={`post-${index}`}
            ref={(el: HTMLDivElement | null) => {
              photoRefs.current[index] = el;
            }}
            className="mb-6 border-b border-gray-800 pb-2"
          >
            {/* Post header */}
            <div className="flex justify-between items-center p-3">
              <div className="flex items-center">
                <div className="w-8 h-8 rounded-full overflow-hidden mr-2">
                  <img 
                    src={profileData.profilePicture} 
                    alt={profileData.username} 
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex items-center">
                  <span className="font-semibold">{profileData.username}</span>
                  {profileData.verified && (
                    <span className="ml-1 text-blue-500">
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
                        <path fillRule="evenodd" d="M8.603 3.799A4.49 4.49 0 0112 2.25c1.357 0 2.573.6 3.397 1.549a4.49 4.49 0 013.498 1.307 4.491 4.491 0 011.307 3.497A4.49 4.49 0 0121.75 12a4.49 4.49 0 01-1.549 3.397 4.491 4.491 0 01-1.307 3.497 4.491 4.491 0 01-3.497 1.307A4.49 4.49 0 0112 21.75a4.49 4.49 0 01-3.397-1.549 4.49 4.49 0 01-3.498-1.306 4.491 4.491 0 01-1.307-3.498A4.49 4.49 0 012.25 12c0-1.357.6-2.573 1.549-3.397a4.49 4.49 0 011.307-3.497 4.49 4.49 0 013.497-1.307zm7.007 6.387a.75.75 0 10-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 00-1.06 1.06l2.25 2.25a.75.75 0 001.14-.094l3.75-5.25z" clipRule="evenodd" />
                      </svg>
                    </span>
                  )}
                </div>
                <span className="mx-1">•</span>
                <button className="text-blue-500 font-medium">Follow</button>
              </div>
              <button>
                <MoreHorizontal size={20} />
              </button>
            </div>

            {/* Post image */}
            <div className="w-full aspect-square">
              <img
                src={post.image.includes("picsum") ? post.image.replace(/\/200$/, "/800") : post.image}
                className="w-full h-full object-cover"
                alt={`Post ${index + 1}`}
                onClick={() => toggleLike(post.id)}
                style={{ objectFit: 'cover', objectPosition: 'center' }}
              />
            </div>

            {/* Post actions */}
            <div className="flex justify-between items-center p-3">
              <div className="flex items-center space-x-4">
                <button onClick={() => toggleLike(post.id)}>
                  <Heart 
                    size={24} 
                    fill={post.liked ? "#ff3040" : "none"} 
                    color={post.liked ? "#ff3040" : "white"} 
                  />
                </button>
                <button>
                  <MessageCircle size={24} />
                </button>
                <button>
                  <Send size={24} />
                </button>
              </div>
              <button onClick={() => toggleSave(post.id)}>
                <Bookmark 
                  size={24} 
                  fill={post.saved ? "white" : "none"} 
                />
              </button>
            </div>

            {/* Likes count */}
            <div className="px-3 pb-1">
              <p className="font-semibold">Liked by <span>hedernilce</span> and others</p>
            </div>

            {/* Caption */}
            <div className="px-3 pb-1">
              <p>
                <span className="font-semibold mr-1">{profileData.username}</span>
                {post.caption} 
                <span className="text-gray-500 block mt-1">more</span>
              </p>
            </div>

            {/* Comments count */}
            <div className="px-3 pb-1">
              <button className="text-gray-500">
                View all {post.comments} comments
              </button>
            </div>

            {/* Timestamp */}
            <div className="px-3 pb-1">
              <p className="text-xs text-gray-500">{post.timestamp}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Bottom navigation spacer to ensure the last post isn't cut off */}
      <div className="h-12"></div>
    </div>
  );
};

export default PublicationsPage;