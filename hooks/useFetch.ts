import { useState, useEffect } from "react";

export const FETCH_STATUS = {
  IDLE: "IDLE",
  FETCHING: "FETCHING",
  FETCHED: "FETCHED",
};

export const useFetch = (url) => {
  const [status, setStatus] = useState(FETCH_STATUS.IDLE);
  const [data, setData] = useState([]);

  useEffect(() => {
    if (!url) return;

    const fetchData = async () => {
      setStatus(FETCH_STATUS.FETCHING);

      const response = await fetch(url);
      const data = await response.json();

      setData(data);
      setStatus(FETCH_STATUS.FETCHED);
    };

    fetchData();
  }, [url]);

  return { status, data };
};

/**
 * useFetch() Usage
 *
 * const isMobile = useFetch();
 */
