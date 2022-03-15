import { useState, useEffect } from "react";

type UseLocalStorageStateReturn = [any, React.Dispatch<any>];

/**
 * Hook to handle local storage
 * @param {string} key - the local storage key
 * @param {any} defaultValue - value you would like to store to the local storage key
 * @returns {UseLocalStorageStateReturn}
 */
export const useLocalStorageState = (
  key: string,
  defaultValue: any
): UseLocalStorageStateReturn => {
  // Pass a function to useState to initialise the state
  const [localStorageValue, setLocalStorageValue] = useState(() => {
    let value: any;

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

  // Update local storage value when `localStorageValue` state is changed
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
