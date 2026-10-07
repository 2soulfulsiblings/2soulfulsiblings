import hawaiiSunset from '@/assets/hawaii-sunset.jpg';
import arizonaSunset from '@/assets/arizona-sunset.jpg';
import coloradoSunset from '@/assets/colorado-sunset.jpg';
import mississippiSunset from '@/assets/mississippi-sunset.jpg';
import massachusettsSunset from '@/assets/massachusetts-sunset.jpg';
import dadSunset1 from '@/assets/dad-sunset-1.jpg';
import dadSunset2 from '@/assets/dad-sunset-2.jpg';
import placeholderImage from '/placeholder.svg';
import { StateData } from '@/data/states';

// Map of photo URLs to imported images
export const imageMap: Record<string, string> = {
  '/src/assets/hawaii-sunset.jpg': hawaiiSunset,
  '/src/assets/arizona-sunset.jpg': arizonaSunset,
  '/src/assets/colorado-sunset.jpg': coloradoSunset,
  '/src/assets/mississippi-sunset.jpg': mississippiSunset,
  '/src/assets/massachusetts-sunset.jpg': massachusettsSunset,
  '/src/assets/dad-sunset-1.jpg': dadSunset1,
  '/src/assets/dad-sunset-2.jpg': dadSunset2,
};

// Get featured image for a state
export const getStateFeaturedImage = (photos: StateData['photos']): string => {
  if (!photos) return placeholderImage;
  return imageMap[photos.featured] || placeholderImage;
};

// Get all images for carousel (featured + additional)
export const getStateImages = (photos: StateData['photos']): string[] => {
  if (!photos) return [placeholderImage];

  const featured = imageMap[photos.featured] || placeholderImage;
  const additional = photos.additional.map(url => imageMap[url] || placeholderImage);

  return [featured, ...additional];
};

// Legacy function for backward compatibility
export const getStateImage = (photoURL: string | null): string => {
  if (!photoURL) return placeholderImage;
  return imageMap[photoURL] || placeholderImage;
};
