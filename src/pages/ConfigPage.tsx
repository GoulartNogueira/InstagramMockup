import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Camera, ArrowLeft, Save } from 'lucide-react';
import { ProfileData, Highlight } from '../types';
import { useProfileContext } from '../context/ProfileContext';

const ConfigPage: React.FC = () => {
  const { profileData, updateProfileData } = useProfileContext();
  const navigate = useNavigate();
  
  // Create a local copy of profile data to work with
  const [localData, setLocalData] = useState<ProfileData>({...profileData});
  const [bioText, setBioText] = useState<string>(profileData.bio.join('\n'));

  // Generic handler for input changes
  const handleChange = <K extends keyof ProfileData>(field: K, value: ProfileData[K]) => {
    setLocalData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  // Handle bio text changes
  const handleBioTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value;
    setBioText(value);
    handleChange('bio', value.split('\n'));
  };

  // Handle highlight changes
  const handleHighlightChange = (
    index: number,
    field: keyof Highlight,
    value: string
  ) => {
    const newHighlights = [...localData.highlights];
    newHighlights[index] = {
      ...newHighlights[index],
      [field]: value
    };
    handleChange('highlights', newHighlights);
  };

  // Add a new highlight
  const addHighlight = () => {
    handleChange('highlights', [
      ...localData.highlights, 
      { name: 'New', image: 'https://picsum.photos/id/237/200' }
    ]);
  };

  // Remove a highlight
  const removeHighlight = (index: number) => {
    const newHighlights = localData.highlights.filter((_, i) => i !== index);
    handleChange('highlights', newHighlights);
  };

  // File upload handler
  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>, type: string, index?: number) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      const imageDataUrl = reader.result as string;
      
      if (type === 'profile') {
        handleChange('profilePicture', imageDataUrl);
      } else if (type === 'highlight' && index !== undefined) {
        handleHighlightChange(index, 'image', imageDataUrl);
      } else if (type === 'post' && index !== undefined) {
        const newPosts = [...localData.posts_images];
        newPosts[index] = imageDataUrl;
        handleChange('posts_images', newPosts);
      }
    };
    
    reader.readAsDataURL(file);
  };

  // Add a new post
  const addPost = () => {
    const randomId = Math.floor(Math.random() * 1000);
    handleChange('posts_images', [
      ...localData.posts_images, 
      `https://picsum.photos/id/${randomId}/200`
    ]);
  };

  // Remove a post
  const removePost = (index: number) => {
    const newPosts = localData.posts_images.filter((_, i) => i !== index);
    handleChange('posts_images', newPosts);
  };

  // Save changes and navigate back
  const saveChanges = () => {
    updateProfileData(localData);
    navigate('/');
  };

  // Cancel changes and navigate back
  const cancelChanges = () => {
    navigate('/');
  };

  return (
    <div className="max-w-4xl mx-auto bg-white min-h-screen">
      {/* Header */}
      <div className="sticky top-0 z-10 bg-white border-b border-gray-200 px-4 py-3 flex justify-between items-center">
        <button 
          onClick={cancelChanges}
          className="flex items-center text-blue-500"
        >
          <ArrowLeft size={20} className="mr-1" />
          Cancel
        </button>
        <h1 className="text-xl font-semibold">Edit Profile</h1>
        <button 
          onClick={saveChanges}
          className="flex items-center text-blue-500 font-medium"
        >
          <Save size={20} className="mr-1" />
          Save
        </button>
      </div>

      {/* Content */}
      <div className="p-4 max-h-[calc(100vh-3.5rem)] overflow-y-auto">
        <div className="space-y-6">
          {/* Profile picture */}
          <div className="flex flex-col items-center">
            <h3 className="text-lg font-medium mb-2">Profile Picture</h3>
            <div className="relative w-24 h-24 mb-2">
              <div className="w-24 h-24 rounded-full overflow-hidden border border-gray-300">
                <img
                  src={localData.profilePicture}
                  alt="Profile"
                  className="w-full h-full object-cover"
                />
              </div>
              <label className="absolute bottom-0 right-0 bg-blue-500 rounded-full p-2 cursor-pointer">
                <Camera size={16} color="white" />
                <input 
                  type="file" 
                  accept="image/*" 
                  className="hidden"
                  onChange={(e) => handleFileUpload(e, 'profile')} 
                />
              </label>
            </div>
          </div>

          {/* Account information */}
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">Username</label>
              <input
                type="text"
                value={localData.username}
                onChange={(e) => handleChange('username', e.target.value)}
                className="w-full p-2 border rounded"
              />
            </div>

            <div className="flex items-center">
              <input
                type="checkbox"
                checked={localData.verified}
                onChange={(e) => handleChange('verified', e.target.checked)}
                className="mr-2"
              />
              <label>Verified (blue checkmark)</label>
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Full Name</label>
              <input
                type="text"
                value={localData.name}
                onChange={(e) => handleChange('name', e.target.value)}
                className="w-full p-2 border rounded"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-1">Followers</label>
                <input
                  type="text"
                  value={localData.followers}
                  onChange={(e) => handleChange('followers', e.target.value)}
                  className="w-full p-2 border rounded"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Following</label>
                <input
                  type="text"
                  value={localData.following}
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
          </div>

          {/* Story Highlights */}
          <div>
            <div className="flex justify-between items-center mb-2">
              <label className="block text-lg font-medium">Story Highlights</label>
              <button
                onClick={addHighlight}
                className="px-3 py-1 bg-gray-200 text-gray-800 rounded text-sm"
              >
                Add Highlight
              </button>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {localData.highlights.map((highlight, index) => (
                <div key={`highlight-${index}`} className="border rounded p-3 flex flex-col">
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
                      <label className="absolute bottom-0 right-0 bg-blue-500 rounded-full p-1 cursor-pointer">
                        <Camera size={12} color="white" />
                        <input 
                          type="file" 
                          accept="image/*" 
                          className="hidden"
                          onChange={(e) => handleFileUpload(e, 'highlight', index)} 
                        />
                      </label>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Posts */}
          <div>
            <div className="flex justify-between items-center mb-2">
              <label className="block text-lg font-medium">Posts</label>
              <button
                onClick={addPost}
                className="px-3 py-1 bg-gray-200 text-gray-800 rounded text-sm"
              >
                Add Post
              </button>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {localData.posts_images.map((image, index) => (
                <div key={`post-${index}`} className="border rounded p-2">
                  <div className="mb-2 flex justify-end">
                    <button
                      onClick={() => removePost(index)}
                      className="px-2 py-1 bg-red-500 text-white rounded text-xs"
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
                    <label className="absolute bottom-2 right-2 bg-blue-500 rounded-full p-1 cursor-pointer">
                      <Camera size={16} color="white" />
                      <input 
                        type="file" 
                        accept="image/*" 
                        className="hidden"
                        onChange={(e) => handleFileUpload(e, 'post', index)} 
                      />
                    </label>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConfigPage;
