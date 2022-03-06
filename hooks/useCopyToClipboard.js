import { useEffect, useCallback, useState } from 'react';
import copy from 'copy-to-clipboard';

export const useCopyToClipboard = (resetInterval = null) => {
    const [isCopied, setIsCopied] = useState(false);

    const handleCopy = useCallback((text) => {
        if (typeof text === 'string' || typeof text === 'number') {
            copy(text.toString());
            setIsCopied(true);
        } else {
            console.error(
                `Cannot copy typeof ${typeof text} to clipboard, must be a string or number.`
            );
            setIsCopied(false);
        }
    }, [])

    // Reset the `isCopied` state after passing a time interval
    useEffect(() => {
        let timeoutId;

        if (isCopied && resetInterval) {
            timeoutId = setTimeout(() => setIsCopied(false), resetInterval);
        }

        return () => {
            clearTimeout(timeoutId);
        };
    }, [isCopied, resetInterval]);

    return [isCopied, handleCopy];
}

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
