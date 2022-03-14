// Check if it's on a browser
export const isBrowser = typeof window !== "undefined";

// Check if it's on server side rendering
export const isSSR = typeof window === "undefined";
