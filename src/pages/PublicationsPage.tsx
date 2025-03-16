import React, { useEffect, useRef, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useProfileContext } from '../context/ProfileContext';
import { Heart, MessageCircle, Send, Bookmark, MoreHorizontal, ChevronLeft } from 'lucide-react';
import VerifiedBadge from '../components/VerifiedBadge';

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
  likedBy: string;
}

// Array of motivational captions
const CAPTIONS = [
  "Embracing every moment of this beautiful journey. ✨",
  "Making sustainable choices for a better tomorrow. 🌱",
  "Innovation starts with a single idea. Let's build the future together.",
  "Quality over quantity, always.",
  "Committed to positive change in everything we do. 💫",
  "The journey of a thousand miles begins with a single step. #Motivation",
  "Turning dreams into reality, one day at a time. 🌈",
  "Behind every success is a story of dedication.",
  "Finding beauty in simplicity. ✨",
  "Making a difference through mindful choices. 🌍",
  "Stronger together. Building communities that last.",
  "Pushing boundaries and redefining possibilities.",
  "The best investment? Knowledge and growth. 📈",
  "Sustainable solutions for a changing world. 🌱",
  "Creating moments that matter. ❤️",
  "Excellence is not a skill, it's an attitude.",
  "Connecting people with purpose. 🤝",
  "Small changes lead to big results. #Progress",
  "Authenticity is our foundation. Always real, always us.",
  "Rising to challenges and embracing opportunities.",
  "Today's efforts are tomorrow's success. 💪",
  "Driving innovation through collaboration. #TeamWork",
  "Celebrating diversity in all its forms. 🎉",
  "Building a legacy of positive impact.",
  "Every challenge is an opportunity in disguise.",
  "Quality isn't just a standard—it's our promise.",
  "Empowering communities through sustainable practices. 🌿",
  "The future belongs to those who believe in their dreams.",
  "Growth happens outside your comfort zone. #Challenge",
  "Turning vision into action, one step at a time.",
  "Striving for excellence in everything we touch. ✨",
  "Creating ripples of positive change across the globe. 🌊",
  "Behind every product is a story of passion and purpose.",
  "Committed to making a difference, every single day.",
  "Building bridges, not walls. #Connection",
  "Innovation is the heart of evolution. 💡",
  "Cultivating relationships that stand the test of time.",
  "Progress over perfection. #Growth",
  "Inspired by nature, driven by purpose. 🍃",
  "The best view comes after the hardest climb.",
  "Creating a better world for future generations. 🌎",
  "Every ending is a new beginning. #NewChapter",
  "Empowering others is the greatest success.",
  "Living our values in everything we do.",
  "Simplicity is the ultimate sophistication. ✨",
  "Turning challenges into opportunities since day one.",
  "Building a sustainable future, one choice at a time. 🌱",
  "Dream big, work hard, stay focused.",
  "Finding joy in the journey, not just the destination. 🛤️",
  "Making a positive impact, one day at a time."
];

// Array of usernames for "liked by"
const USERNAMES = [
  "gilsonluiznogueira", "andre.g.n", "maria_silva", "joao.costa", 
  "ana.beatriz", "pedro_santos", "juliana.oliveira", "carlos_1992",
  "fernanda.lima", "rafael_souza", "camila.mendes", "lucas_oliv",
  "beatriz.azevedo", "leonardo_soares", "amanda.ferreira", "bruno_reis",
  "larissa.castro", "marcelo_82", "bianca.martins", "thiago_rodrigues",
  "isadora.campos", "roberto_alves", "gabriela.dias", "felipe_pereira",
  "natalia.cardoso", "gustavo_almeida", "renata.barbosa", "diego_lopes",
  "carolina.ribeiro", "vinicius_carvalho"
];

// Helper function to get a random item from an array
const getRandomItem = (array: any[]) => {
  return array[Math.floor(Math.random() * array.length)];
};

// Helper function to generate dates going back from today
const generateDate = (daysBack: number): string => {
  const date = new Date();
  date.setDate(date.getDate() - daysBack);
  return date.toLocaleDateString('en-US', { month: 'long', day: 'numeric' });
};

const PublicationsPage: React.FC = () => {
  const { profileData } = useProfileContext();
  const { photoIndex } = useParams<{ photoIndex: string }>();
  const photoRefs = useRef<(HTMLDivElement | null)[]>([]);
  const navigate = useNavigate();
  
  // Generate post data for each image in the profile
  const [posts, setPosts] = useState<PostData[]>(() => 
    profileData.posts_images.map((image, index) => {
      return {
        id: index,
        image: image,
        likes: Math.floor(Math.random() * 10000) + 100,
        caption: getRandomItem(CAPTIONS),
        comments: Math.floor(Math.random() * 50) + 5,
        timestamp: generateDate(index * 7), // Each post is 7 days apart
        liked: false,
        saved: false,
        likedBy: getRandomItem(USERNAMES),
      };
    })
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

  // Helper function to format numbers (e.g., 1500 -> 1.5K)
  const formatNumber = (num: number): string => {
    if (num >= 1000000) {
      return (num / 1000000).toFixed(1) + 'M';
    } else if (num >= 1000) {
      return (num / 1000).toFixed(1) + 'K';
    }
    return num.toString();
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
                    <VerifiedBadge />
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

            {/* Likes count and liked by */}
            <div className="px-3 pb-1">
              <div className="flex items-center mb-1">
                <div className="flex -space-x-2 mr-2">
                  {/* Show 3 random profile pictures */}
                  {[...Array(3)].map((_, i) => (
                    <div key={`liker-${i}`} className="w-5 h-5 rounded-full overflow-hidden border border-black">
                      {renderProfileImage(i)}
                    </div>
                  ))}
                </div>
                <p className="font-medium">
                  Liked by <span className="font-semibold">{post.likedBy}</span> and <span className="font-semibold">{formatNumber(post.likes)} others</span>
                </p>
              </div>
            </div>

            {/* Caption */}
            <div className="px-3 pb-1">
              <p>
                <span className="font-semibold mr-1">{profileData.username}</span>
                {post.caption} 
                {post.caption.length > 100 && (
                  <span className="text-gray-500 block mt-1">more</span>
                )}
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

  function renderProfileImage(i: number) {
    const randomImage = Math.floor(Math.random() * 100);
    const gender = Math.random() < 0.5 ? 'men' : 'women';
    return (
      <img
        src={`https://randomuser.me/api/portraits/thumb/${gender}/${randomImage}.jpg`}
        alt={`Liker ${i + 1}`}
        className="w-full h-full object-cover"
      />
    );
  }
};

export default PublicationsPage;