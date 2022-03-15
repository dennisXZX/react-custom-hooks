import axios from "axios";
import { useEffect, useState } from "react";

export type UseUnsplashPhotosReturn = [any[], boolean, boolean];

/**
 * Hook to fetch Unsplash photos
 * @param {string} secret
 * @param {string} query
 * @returns {UseUnsplashPhotosReturn}
 */
const useUnsplashPhotos = (
  secret: string,
  query: string
): UseUnsplashPhotosReturn => {
  const [images, setImages] = useState<any[]>([]);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  const unsplashUrl = "https://api.unsplash.com/search/photos";
  const url = `${unsplashUrl}?client_id=${secret}&query=${query}`;

  const fetchSplashPhotos = async () => {
    setLoading(true);

    try {
      const response = await axios(url);
      setLoading(false);
      setImages(response.data.results);
    } catch (error) {
      setLoading(false);
      setError(false);
    }
  };

  useEffect(() => {
    fetchSplashPhotos();
  }, [query]);

  return [images, error, loading];
};

/**
 * useUnsplashPhotos() Usage
 *
 * const [images, error, loading] = useUnsplashPhotos(CLIENT_SECRET, query);
 */
