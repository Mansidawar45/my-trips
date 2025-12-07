export const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:1337';

export function getApiUrl(path) {
  const cleanPath = path.startsWith('/') ? path : `/${path}`;
  return `${API_URL}${cleanPath}`;
}

export function getImageUrl(imagePath) {
  if (!imagePath) return '/placeholder.jpg';
  
  if (imagePath.startsWith('http')) return imagePath;
  
  const cleanPath = imagePath.startsWith('/') ? imagePath : `/${imagePath}`;
  return `${API_URL}${cleanPath}`;
}
