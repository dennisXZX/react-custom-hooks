import {useEffect} from 'react';

export const useWindowSize = () => {
    // Check if we are doing server side rendering
    const isSSR = typeof window === 'undefined';

    const [windowSize, setWindowSize] = React.useState({
        width: isSSR ? 1200 : window.innerWidth,
        height: isSSR ? 800 : window.innerHeight,
    });

    const changeWindowSize = () => {
        setWindowSize({ width: window.innerWidth, height: window.innerHeight });
    }

    useEffect(() => {
        window.addEventListener('resize', changeWindowSize);

        return () => {
            window.removeEventListener('resize', changeWindowSize);
        }
    }, []);

    return windowSize;
}

/**
 * useWindowSize() Usage
 *
 * const { height, width } = useWindowSize();
 */
