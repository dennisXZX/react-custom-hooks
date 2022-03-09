import {useState, useEffect} from "react";
import {isSSR} from "../misc/util";

const MobileDeviceDetectionRegex = /Android|BlackBerry|iPhone|iPad|iPod|Opera Mini|IEMobile|WPDesktop/i;

export const useDeviceDetect = (): boolean => {
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const userAgent = isSSR ? "" : window.navigator.userAgent;
        const isUserOnMobile = Boolean(userAgent.match(MobileDeviceDetectionRegex));

        setIsMobile(isUserOnMobile);
    }, []);

    return isMobile;
}

/**
 * useDeviceDetect() Usage
 *
 * const isMobile = useDeviceDetect();
 */
