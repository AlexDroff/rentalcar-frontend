export const getSafeImage = (url?: string): string => {
  const fallback = '/images/car-placeholder.jpg';

  if (!url) return fallback;

  try {
    const parsed = new URL(url);

    if (parsed.protocol === 'https:' || parsed.protocol === 'http:') {
      return url;
    }

    return fallback;
  } catch {
    return fallback;
  }
};
