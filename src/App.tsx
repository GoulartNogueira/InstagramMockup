import React, { useState, useEffect } from 'react';
import { Camera, Home, Search, PlusSquare, Play, User, MoreHorizontal, ChevronLeft, PlusCircle, UserPlus, BadgeCheck, BadgeCheckIcon, Badge, Copy, Grid } from 'lucide-react';

const InstagramProfileMockup = () => {
  const [showConfig, setShowConfig] = useState(false);
  const [viewingOwnProfile, setViewingOwnProfile] = useState(true);

  // Default profile data
  const postsImages: string[] = [];
  for (let i = 10; i <= 70; i++) {
    postsImages.push(`https://picsum.photos/id/${i}/200`);
  }

  const defaultProfile = {
    username: 'murillo.smn',
    verified: false,
    name: 'Murillo Salles Nogueira',
    posts: '20',
    followers: '1,1 mi',
    following: '811',
    bio: [
      '🎧| Dj • Modelo • 🇧🇷 BBB16',
      '🔳| Travel • Lifestyle • Work',
      '🕺| Partner @galleriabarsp @vilajk'
    ],
    profilePicture: 'https://picsum.photos/id/1005/200',
    highlights: [
      { name: 'Pet', image: 'https://picsum.photos/id/237/200' },
      { name: 'Viagens', image: 'https://picsum.photos/id/1036/200' },
    ],
    posts_images: postsImages
  };

  const [profileData, setProfileData] = useState(defaultProfile);
  const [bioText, setBioText] = useState(defaultProfile.bio.join('\n'));

  // Load data from localStorage on initial render
  useEffect(() => {
    const savedData = localStorage.getItem('instagramProfileData');
    if (savedData) {
      try {
        const parsedData = JSON.parse(savedData);
        setProfileData(parsedData);
        setBioText(parsedData.bio.join('\n'));
      } catch (e) {
        console.error("Error parsing saved data:", e);
      }
    }
  }, []);

  // Save data to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('instagramProfileData', JSON.stringify(profileData));
  }, [profileData]);

  interface Highlight {
    name: string;
    image: string;
  }

  interface ProfileData {
    username: string;
    verified: boolean;
    name: string;
    posts: string;
    followers: string;
    following: string;
    bio: string[];
    profilePicture: string;
    highlights: Highlight[];
    posts_images: string[];
  }

  type ProfileField = keyof ProfileData;

  interface Highlight {
    name: string;
    image: string;
  }

  const handleChange = (field: ProfileField, value: ProfileData[ProfileField]) => {
    setProfileData((prev: ProfileData) => ({
      ...prev,
      [field]: value
    }));
  };

  interface BioTextChangeEvent extends React.ChangeEvent<HTMLTextAreaElement> { }

  const handleBioTextChange = (event: BioTextChangeEvent): void => {
    const value: string = event.target.value;
    setBioText(value);
    handleChange('bio', value.split('\n'));
  };


  const handleHighlightChange = (
    index: number,
    field: keyof Highlight,
    value: string
  ): void => {
    const newHighlights = [...profileData.highlights];
    newHighlights[index] = {
      ...newHighlights[index],
      [field]: value
    };
    handleChange('highlights', newHighlights);
  };

  const addHighlight = () => {
    handleChange('highlights', [...profileData.highlights, { name: 'New', image: 'https://picsum.photos/id/237/200' }]);
  };

  const removeHighlight = (index: number) => {
    const newHighlights = profileData.highlights.filter((_, i) => i !== index);
    handleChange('highlights', newHighlights);
  };

  const handlePostImageChange = (index: number, value: string | ArrayBuffer | null) => {
    const newPosts = [...profileData.posts_images];
    newPosts[index] = typeof value === 'string' ? value : '';
    handleChange('posts_images', newPosts);
  };

  const handleFileUpload = (event: Event, type: string, index = null) => {
    try {
      const file = event.target.files[0];
      if (!file) return;

      const reader = new FileReader();

      reader.onload = () => {
        try {
          const imageDataUrl = reader.result;

          if (type === 'profile') {
            handleChange('profilePicture', imageDataUrl);
          } else if (type === 'highlight' && index !== null) {
            handleHighlightChange(index, 'image', imageDataUrl);
          } else if (type === 'post' && index !== null) {
            handlePostImageChange(index, imageDataUrl);
          }
        } catch (error) {
          console.error("Error processing uploaded image:", error);
          alert("There was a problem processing the image. Please try another one.");
        }
      };

      reader.onerror = () => {
        console.error("FileReader error");
        alert("There was a problem reading the file. Please try again.");
      };

      reader.readAsDataURL(file);
    } catch (error) {
      console.error("Error in file upload handler:", error);
      alert("There was a problem with the file upload. Please try again.");
    }
  };

  const addPost = () => {
    const randomId = Math.floor(Math.random() * 1000);
    handleChange('posts_images', [...profileData.posts_images, `https://picsum.photos/id/${randomId}/200`]);
  };

  const removePost = (index: number) => {
    const newPosts = profileData.posts_images.filter((_, i) => i !== index);
    handleChange('posts_images', newPosts);
  };

  // Profile picture component - shared between views
  const ProfilePicture = ({ size = 20, editable = false, onClick = null }) => (
    <div className="relative">
      <div className={`w-${size} h-${size} rounded-full overflow-hidden border border-gray-300`}>
        <img
          src={profileData.profilePicture}
          className="w-full h-full object-cover"
          alt="Profile"
        />
      </div>
      {editable && (
        <div
          className="absolute bottom-0 right-0 bg-blue-500 rounded-full p-1"
        >
          <PlusCircle size={16} color="white" />
        </div>
      )}
    </div>
  );

  // Stats section - shared between views
  const ProfileStats = () => (
    <div className="flex-1 flex justify-around ml-4">
      <div className="text-center">
        <div className="font-bold">{profileData.posts}</div>
        <div className="text-sm">posts</div>
      </div>
      <div className="text-center">
        <div className="font-bold">{profileData.followers}</div>
        <div className="text-sm">seguidores</div>
      </div>
      <div className="text-center">
        <div className="font-bold">{profileData.following}</div>
        <div className="text-sm">seguindo</div>
      </div>
    </div>
  );

  // Bio section - shared between views
  const ProfileBio = () => (
    <div className="mt-3">
      <div className="font-bold">{profileData.name}</div>
      {profileData.bio.map((line, index) => (
        <div key={`bio-line-${index}`} className="text-sm">{line}</div>
      ))}
    </div>
  );

  // Story highlights - shared between views
  const StoryHighlights = ({ showAddNew = false }) => (
    <div className="px-2 py-3 overflow-x-auto">
      <div className="flex space-x-4">
        {showAddNew && (
          <div className="flex flex-col items-center">
            <div className="w-16 h-16 rounded-full border border-gray-300 flex items-center justify-center">
              <span className="text-3xl">+</span>
            </div>
            <span className="text-xs mt-1">Novo</span>
          </div>
        )}
        {profileData.highlights.map((highlight, index) => (
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

  // Content tabs - shared between views
  const ContentTabs = () => (
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

  // Posts grid - shared between views
  const PostsGrid = () => (
    <div className="flex-1">
      <div className="grid grid-cols-3 gap-0.5">
        {profileData.posts_images.map((image, index) => (
          <div key={`post-image-${index}`} className="aspect-square bg-gray-100 relative">
            <img
              src={image}
              className="w-full h-full object-cover"
              alt={`Post ${index + 1}`}
            />
            {/* Multi-image indicator for some posts */}
            {index % 3 === 0 && (
                <Copy size={16} className="absolute top-2 right-2" color="white" />
            )}
          </div>
        ))}
      </div>
    </div>
  );

  // Bottom navigation - shared between views
  const BottomNavigation = () => (
    <div className="border-t border-gray-300 flex justify-around py-2 mt-auto">
      <button onClick={() => setViewingOwnProfile(false)}>
        <Home size={24} color={!viewingOwnProfile ? "#0095F6" : undefined} />
      </button>
      <button>
        <Search size={24} />
      </button>
      <button>
        <PlusSquare size={24} />
      </button>
      <button>
        <Play size={24} />
      </button>
      <button onClick={() => setViewingOwnProfile(true)}>
        <User size={24} color={viewingOwnProfile ? "#0095F6" : undefined} />
      </button>
    </div>
  );

  // Configuration Panel
  const ConfigPanel = () => {
    return (
      <div className="bg-white p-4 max-h-screen overflow-y-auto">
        <div className="flex justify-between items-center mb-4 sticky top-0 bg-white pb-2 border-b">
          <h2 className="text-xl font-bold">Instagram Profile Configuration</h2>
          <button
            onClick={() => setShowConfig(false)}
            className="px-4 py-2 bg-blue-500 text-white rounded"
          >
            Save & View Profile
          </button>
        </div>

        <div className="space-y-6">
          {/* Profile picture */}
          <div className="flex flex-col items-center">
            <h3 className="text-lg font-medium mb-2">Profile Picture</h3>
            <div className="relative w-24 h-24 rounded-full mb-2 overflow-hidden border border-gray-300">
              <img
                src={profileData.profilePicture}
                alt="Profile"
                className="w-full h-full object-cover"
              />
              <button
                onClick={() => {
                  const input = document.createElement('input');
                  input.type = 'file';
                  input.accept = 'image/*';
                  input.onchange = (e) => handleFileUpload(e, 'profile');
                  input.click();
                }}
                className="absolute bottom-0 right-0 bg-blue-500 rounded-full p-1"
              >
                <Camera size={16} color="white" />
              </button>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Username</label>
            <input
              type="text"
              value={profileData.username}
              onChange={(e) => handleChange('username', e.target.value)}
              className="w-full p-2 border rounded"
            />
          </div>

          <div className="flex items-center">
            <input
              type="checkbox"
              checked={profileData.verified}
              onChange={(e) => handleChange('verified', e.target.checked)}
              className="mr-2"
            />
            <label>Verified (blue checkmark)</label>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Full Name</label>
            <input
              type="text"
              value={profileData.name}
              onChange={(e) => handleChange('name', e.target.value)}
              className="w-full p-2 border rounded"
            />
          </div>

          <div className="grid grid-cols-3 gap-2">
            <div>
              <label className="block text-sm font-medium mb-1">Posts</label>
              <input
                type="text"
                value={profileData.posts}
                onChange={(e) => handleChange('posts', e.target.value)}
                className="w-full p-2 border rounded"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Followers</label>
              <input
                type="text"
                value={profileData.followers}
                onChange={(e) => handleChange('followers', e.target.value)}
                className="w-full p-2 border rounded"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Following</label>
              <input
                type="text"
                value={profileData.following}
                onChange={(e) => handleChange('following', e.target.value)}
                className="w-full p-2 border rounded"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Bio</label>
            <textarea
              value={bioText}
              onChange={handleBioTextChange}
              className="w-full p-2 border rounded h-24"
              placeholder="Your bio here..."
            />
          </div>

          <div>
            <div className="flex justify-between items-center mb-2">
              <label className="block text-sm font-medium">Story Highlights</label>
              <button
                onClick={addHighlight}
                className="px-2 py-1 bg-gray-200 text-gray-800 rounded text-sm"
              >
                Add Highlight
              </button>
            </div>
            <div className="grid grid-cols-2 gap-2">
              {profileData.highlights.map((highlight, index) => (
                <div key={`highlight-${index}`} className="border rounded p-2 flex flex-col">
                  <div className="flex mb-2">
                    <input
                      type="text"
                      value={highlight.name}
                      onChange={(e) => handleHighlightChange(index, 'name', e.target.value)}
                      className="flex-1 p-2 border rounded mr-2"
                      placeholder="Name"
                    />
                    <button
                      onClick={() => removeHighlight(index)}
                      className="px-2 py-1 bg-red-500 text-white rounded"
                    >
                      ×
                    </button>
                  </div>

                  <div className="flex flex-col items-center">
                    <div className="w-16 h-16 rounded-full overflow-hidden border border-gray-300 mb-2 relative">
                      <img
                        src={highlight.image}
                        className="w-full h-full object-cover"
                        alt={highlight.name}
                      />
                      <button
                        onClick={() => {
                          const input = document.createElement('input');
                          input.type = 'file';
                          input.accept = 'image/*';
                          input.onchange = (e) => handleFileUpload(e, 'highlight', index);
                          input.click();
                        }}
                        className="absolute bottom-0 right-0 bg-blue-500 rounded-full p-1"
                      >
                        <Camera size={12} color="white" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div>
            <div className="flex justify-between items-center mb-2">
              <label className="block text-sm font-medium">Posts</label>
              <button
                onClick={addPost}
                className="px-2 py-1 bg-gray-200 text-gray-800 rounded text-sm"
              >
                Add Post
              </button>
            </div>
            <div className="grid grid-cols-3 gap-2">
              {profileData.posts_images.map((image, index) => (
                <div key={`post-${index}`} className="border rounded p-2">
                  <div className="mb-2 flex justify-end">
                    <button
                      onClick={() => removePost(index)}
                      className="px-1.5 py-0.5 bg-red-500 text-white rounded text-xs"
                    >
                      Remove
                    </button>
                  </div>
                  <div className="aspect-square relative overflow-hidden">
                    <img
                      src={image}
                      alt={`Post ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                    <button
                      onClick={() => {
                        const input = document.createElement('input');
                        input.type = 'file';
                        input.accept = 'image/*';
                        input.onchange = (e) => handleFileUpload(e, 'post', index);
                        input.click();
                      }}
                      className="absolute bottom-2 right-2 bg-blue-500 rounded-full p-1"
                    >
                      <Camera size={16} color="white" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  };

  // Instagram Profile View (Own Profile)
  const OwnProfileView = () => (
    <div className="max-w-md mx-auto bg-white h-screen flex flex-col overflow-hidden">
      {/* Profile header */}
      <div className="flex justify-between items-center px-4 py-3 border-b border-gray-200">
        <div className="flex items-center">
          <span className="text-xl font-semibold">{profileData.username}</span>
          <ChevronLeft className="ml-1" size={20} />
        </div>
        <div className="flex items-center space-x-4">
          <div className="relative">
            <div className="w-8 h-5 rounded-full bg-red-500 flex items-center justify-center text-white text-xs font-bold absolute -top-2 -right-4">999+</div>
            <UserPlus size={24} />
          </div>
          <PlusSquare size={24} />
          <button onClick={() => setShowConfig(true)}>
            <MoreHorizontal size={24} />
          </button>
        </div>
      </div>
      <div className="flex-1 overflow-y-auto">
        {/* Profile info section */}
        <div className="px-4 py-2">
          <div className="flex items-start">
            {/* Profile picture */}
            <ProfilePicture
              size={20}
              editable={true}
              onClick={() => {
                const input = document.createElement('input');
                input.type = 'file';
                input.accept = 'image/*';
                input.onchange = (e) => handleFileUpload(e, 'profile');
                input.click();
              }}
            />

            {/* Stats */}
            <ProfileStats />
          </div>

          {/* Name and bio */}
          <ProfileBio />

          {/* Action buttons */}
          <div className="grid grid-cols-3 gap-2 mt-3">
            <button className="bg-gray-100 py-1.5 px-2 rounded-md text-sm font-medium col-span-1"
            onClick={() => setShowConfig(true)}
            >
              Editar
            </button>
            <button className="bg-gray-100 py-1.5 px-2 rounded-md text-sm font-medium col-span-1">
              Compartilhar perfil
            </button>
            <button className="bg-gray-100 py-1.5 px-2 rounded-md text-sm font-medium col-span-1 flex items-center justify-center">
              <User size={16} />
            </button>
          </div>
        </div>

        {/* Story highlights */}
        <StoryHighlights showAddNew={true} />

        {/* Content tabs */}
        <ContentTabs />

        {/* Posts grid */}
        <PostsGrid />

      </div>
      {/* Bottom navigation */}
      <BottomNavigation />
    </div>
  );

  // Instagram Profile View (Other User)
  const OtherUserProfileView = () => (
    <div className="max-w-md mx-auto bg-white h-screen flex flex-col overflow-hidden">
      {/* Profile header */}
      <div className="flex justify-between items-center px-4 py-2">
        <div className="flex items-center">
          <ChevronLeft size={24} />
          <span className="ml-4 text-lg font-semibold">{profileData.username}</span>
          {profileData.verified && (
            <span className="relative inline-block ml-1 w-4 h-4">
              <BadgeCheck
              className="absolute inset-0"
              size={16}
              fill="#0095F6"
              color="#FFFFFF"
              />
              <Badge
              className="absolute inset-0"
              size={16}
              strokeWidth={3}
              color="#0095F6"
              />
            </span>
          )}
        </div>

        <MoreHorizontal size={24} />
      </div>
      <div className="flex-1 overflow-y-auto">

        {/* Profile info section */}
        <div className="px-4 py-2">
          <div className="flex items-start">
            {/* Profile picture */}
            <ProfilePicture size={20} />

            {/* Stats */}
            <ProfileStats />
          </div>

          {/* Name and bio */}
          <ProfileBio />

          {/* Action buttons */}
          <div className="grid grid-cols-4 gap-2 mt-3">
            <button className="bg-blue-500 text-white py-1.5 px-2 rounded-md text-sm font-medium col-span-1">
              Seguir
            </button>
            <button className="bg-gray-100 py-1.5 px-2 rounded-md text-sm font-medium col-span-1">
              Mensagem
            </button>
            <button className="bg-gray-100 py-1.5 px-2 rounded-md text-sm font-medium col-span-1">
              Email
            </button>
            <button className="bg-gray-100 py-1.5 px-2 rounded-md text-sm font-medium col-span-1 flex items-center justify-center">
              <User size={16} />
            </button>
          </div>
        </div>

        {/* Story highlights */}
        <StoryHighlights showAddNew={false} />

        {/* Content tabs */}
        <ContentTabs />

        {/* Posts grid */}
        <PostsGrid />
      </div>
      {/* Bottom navigation */}
      <BottomNavigation />
    </div>
  );

  return (
    <div className="h-screen overflow-hidden">
      {showConfig ? <ConfigPanel /> : (viewingOwnProfile ? <OwnProfileView /> : <OtherUserProfileView />)}
    </div>
  );
};

export default InstagramProfileMockup;