import React, { useEffect, useCallback } from "react";
import copy from "copy-to-clipboard";

export default function useCopyToClipboard(resetInterval = null) {
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

    useEffect(() => {
        let timeout;

        if (isCopied && resetInterval) {
            timeout = setTimeout(() => setIsCopied(false), resetInterval);
        }

        return () => {
            clearTimeout(timeout);
        };
    }, [isCopied, resetInterval]);

    return [isCopied, handleCopy];
}

/**
 * useCopyToClipboard() Usage
 *
 * import React from "react";
 * import ClipboardIcon from "../svg/ClipboardIcon";
 * import SuccessIcon from "../svg/SuccessIcon";
 * import useCopyToClipboard from "../utils/useCopyToClipboard";
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
