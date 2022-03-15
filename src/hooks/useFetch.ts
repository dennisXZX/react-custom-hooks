import { useEffect, useRef, useReducer } from "react";

export enum FETCH_STATUS {
  IDLE = "IDLE",
  FETCH_ERROR = "FETCH_ERROR",
  FETCHING = "FETCHING",
  FETCHED = "FETCHED",
}

const initialState = {
  status: FETCH_STATUS.IDLE,
  error: null,
  data: [],
};

export type InitialState = typeof initialState;

export type ActionFetching = {
  type: FETCH_STATUS.FETCHING;
};

export type ActionFetched = {
  type: FETCH_STATUS.FETCHED;
  payload: {
    data: any;
  };
};

export type ActionError = {
  type: FETCH_STATUS.FETCH_ERROR;
  payload: {
    error: string;
  };
};

export type FetchAction = ActionFetching | ActionFetched | ActionError;

export const useFetch = (url: string) => {
  const cache = useRef({});

  // Use `useReducer` so we can control 
  const [state, dispatch] = useReducer(
    (state: InitialState, action: FetchAction) => {
      switch (action.type) {
        case FETCH_STATUS.FETCHING:
          return { ...initialState, status: FETCH_STATUS.FETCHING };

        case FETCH_STATUS.FETCHED:
          return {
            ...initialState,
            status: FETCH_STATUS.FETCHED,
            data: action.payload.data,
          };

        case FETCH_STATUS.FETCH_ERROR:
          return {
            ...initialState,
            status: FETCH_STATUS.FETCH_ERROR,
            error: action.payload.error,
          };

        default:
          return state;
      }
    },
    initialState
  );

  useEffect(() => {
    let cancelRequest = false;

    if (!url || !url.trim()) return;

    const fetchData = async () => {
      dispatch({ type: FETCH_STATUS.FETCHING });

      // Return cached result if we have fetched the URL before
      if (cache.current[url]) {
        const data = cache.current[url];
        dispatch({ type: FETCH_STATUS.FETCHED, payload: data });
      } else {
        try {
          const response = await fetch(url);
          const data = await response.json();

          // Update cache object
          cache.current[url] = data;

          if (cancelRequest) return;

          dispatch({ type: FETCH_STATUS.FETCHED, payload: data });
        } catch (error) {
          if (cancelRequest) return;

          dispatch({ type: FETCH_STATUS.FETCH_ERROR, payload: error.message });
        }
      }
    };

    fetchData();

    return function cleanup() {
      cancelRequest = true;
    };
  }, [url]);

  return state;
};

/**
 * useFetch() Usage
 *
 * const [query, setQuery] = useState('');
 *
 * const url = query && `https://hn.algolia.com/api/v1/search?query=${query}`;
 * const { status, data } = useFetch(url);
 */
