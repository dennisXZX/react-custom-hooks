import { useEffect, useState } from "react";

/**
 * Hook to detect whether a user has reached the bottom of the page
 * @returns {boolean} - whether use has reached the bottom of the page
 */
export const usePageBottom = (): boolean => {
  const [isPageBottom, setIsPageBottom] = useState(false);

  // Calculate whether user has scrolled to the bottom of the page
  const handleScroll = () => {
    const hasReachedBottom =
      window.innerHeight + document.documentElement.scrollTop ===
      document.documentElement.offsetHeight;

    setIsPageBottom(hasReachedBottom);
  };

  // Use useEffect to make sure our component that uses this hook is mounted
  useEffect(() => {
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return isPageBottom;
};

/**
 * usePageBottom() Usage
 *
 * const isPageBottom = usePageBottom();
 */
