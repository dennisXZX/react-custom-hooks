import { useEffect, useState } from "react";
import { isSSR } from "../misc/util";

interface WindowSize {
  width: number;
  height: number;
}

/**
 * Hook to detect window size
 * @returns {WindowSize} - the width and height of the window
 */
export const useWindowSize = (): WindowSize => {
  const [windowSize, setWindowSize] = useState<WindowSize>({
    width: isSSR ? 1200 : window.innerWidth,
    height: isSSR ? 800 : window.innerHeight,
  });

  // Calculate the current window size
  const updateWindowSize = () => {
    setWindowSize({ width: window.innerWidth, height: window.innerHeight });
  };

  useEffect(() => {
    window.addEventListener("resize", updateWindowSize);

    return () => {
      window.removeEventListener("resize", updateWindowSize);
    };
  }, []);

  return windowSize;
};

/**
 * useWindowSize() Usage
 *
 * const { height, width } = useWindowSize();
 */
