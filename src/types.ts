export interface Highlight {
    name: string;
    image: string;
  }
  
  export interface ProfileData {
    username: string;
    verified: boolean;
    name: string;
    followers: string;
    following: string;
    bio: string[];
    profilePicture: string;
    highlights: Highlight[];
    posts_images: string[];
  }
  
  // Generate random post images
  const generatePostImages = (): string[] => {
    const images: string[] = [];
    for (let i = 10; i <= 70; i++) {
      images.push(`https://picsum.photos/id/${i}/200`);
    }
    return images;
  };
  
  // Default profile data
  export const defaultProfile: ProfileData = {
    username: 'famous_person',
    verified: true,
    name: 'Famous Person',
    followers: '1.1M',
    following: '811',
    bio: [
      '🎧| Dj • Modelo • 🇧🇷 BBB16',
      '🔳| Travel • Lifestyle • Work',
      '🕺| Partner @galleriabarsp @vilajk'
    ],
    profilePicture: 'https://picsum.photos/id/1005/200',
    highlights: [
      { name: '❤️', image: 'https://picsum.photos/id/237/200' },
      { name: 'norway24', image: 'https://picsum.photos/id/1036/200' },
      { name: 'viena24', image: 'https://picsum.photos/id/953/200' },
      { name: 'rj', image: 'https://picsum.photos/id/849/200' },
      { name: '🎉', image: 'https://picsum.photos/id/849/200' },
    ],
    posts_images: generatePostImages()
  };