import {useEffect, useState} from 'react';

export const usePageBottom = (): boolean => {
    const [isPageBottom, setIsPageBottom] = useState(false);

    // Use useEffect to make sure our component that uses this hook is mounted
    useEffect(() => {
        const handleScroll = () => {
            // Calculate whether user has scrolled to the bottom of the page
            const hasReachedBottom = window.innerHeight + document.documentElement.scrollTop === document.documentElement.offsetHeight;

            setIsPageBottom(hasReachedBottom);
        }

        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll)
        }
    }, []);

    return isPageBottom;
}

/**
 * usePageBottom() Usage
 *
 * const isPageBottom = usePageBottom();
 */
