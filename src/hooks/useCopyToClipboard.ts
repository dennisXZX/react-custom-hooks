import { useEffect, useCallback, useState } from "react";
import copy from "copy-to-clipboard";

type UseCopyToClipboardReturn = [boolean, (text: string) => void];

export const useCopyToClipboard = (
  resetInterval: number = null
): UseCopyToClipboardReturn => {
  const [isCopied, setIsCopied] = useState(false);

  // Wrap it in useCallback to prevent creating the function on every re-rendering
  const handleCopy = useCallback((text: string | number): void => {
    if (typeof text === "string" || typeof text === "number") {
      copy(text.toString());
      setIsCopied(true);
    } else {
      console.error(
        `Cannot copy typeof ${typeof text} to clipboard, must be a string or number.`
      );
      setIsCopied(false);
    }
  }, []);

  // Reset the `isCopied` state after passing a time interval
  useEffect(() => {
    let timeoutId: number;

    if (isCopied && resetInterval) {
      timeoutId = setTimeout(() => setIsCopied(false), resetInterval);
    }

    return () => {
      clearTimeout(timeoutId);
    };
  }, [isCopied, resetInterval]);

  return [isCopied, handleCopy];
};

/**
 * useCopyToClipboard() Usage
 *
 * function CopyButton({ code }) {
 *   // isCopied is reset after 3 second timeout
 *   const [isCopied, handleCopy] = useCopyToClipboard(3000);
 *
 *   return (
 *     <button onClick={() => handleCopy(code)}>
 *       {isCopied ? <SuccessIcon /> : <ClipboardIcon />}
 *     </button>
 *   );
 * }
 */
