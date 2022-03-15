import { useCallback, useState } from "react";

export type UseArrayReturn<T> = {
  values: T[];
  setValues: React.Dispatch<React.SetStateAction<T[]>>;
  add: (addedValue: T) => void;
  clear: () => void;
  removeById: (id: string) => void;
  removeByIndex: (index: number) => void;
};

/**
 * Hook to manipulate array data structure
 * @param {T[]} initialValue - an array of items
 * @returns
 */
export const useArray = <T extends { id: string }>(
  initialValue: T[]
): UseArrayReturn<T> => {
  const [values, setValues] = useState<T[]>(initialValue);

  const add = useCallback(
    (addedValue: T) =>
      setValues((previousArrayValue) => [...previousArrayValue, addedValue]),
    []
  );

  const clear = useCallback(() => {
    () => setValues([]);
  }, []);

  const removeById = useCallback(
    (id: string) =>
      setValues((previousArrayValue) =>
        previousArrayValue.filter((value) => value.id !== id)
      ),
    []
  );

  const removeByIndex = useCallback(
    (index: number) =>
      setValues((previousArrayValue) => {
        previousArrayValue.splice(index, 1);

        return previousArrayValue;
      }),
    []
  );

  return {
    add,
    clear,
    removeById,
    removeByIndex,
    setValues,
    values,
  };
};

/**
 * useArray() Usage
 *
 * const todoItems = useArray<string>([{ id: 1, todo: 'coding' }, { id: 2, todo: 'sleeping' }]);
 *
 * <button onClick={() => todoItems.add('shopping')}>add</button>
 */
