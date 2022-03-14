import { useState, useEffect } from "react";

export const useLocalStorageState = (key: string, defaultValue: any) => {
  // Pass a function to useState to initialise the state
  const [localStorageValue, setLocalStorageValue] = useState(() => {
    let value;

    try {
      // If currently there is no local storage value, use the default value passed in
      value = JSON.parse(
        window.localStorage.getItem(key) || String(defaultValue)
      );
    } catch (e) {
      value = defaultValue;
    }

    return value;
  });

  useEffect(() => {
    window.localStorage.setItem(key, localStorageValue);
  }, [localStorageValue]);

  return [localStorageValue, setLocalStorageValue];
};

/**
 * useLocalStorageState() Usage
 *
 * const [count, setCount] = useLocalStorageState('app-count', 0);
 */
