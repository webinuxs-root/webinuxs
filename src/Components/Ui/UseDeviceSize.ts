"use client"
import { useState, useEffect } from 'react';

interface DeviceSize {
    width: number;
    height: number;
}

const useDeviceSize = (): DeviceSize => {
    const [deviceSize, setDeviceSize] = useState<DeviceSize>({
        width: window.innerWidth,
        height: window.innerHeight,
    });

    useEffect(() => {
        const handleResize = () => {
            setDeviceSize({
                width: window.innerWidth,
                height: window.innerHeight,
            });
        };
        window.addEventListener('resize', handleResize);
        handleResize();
        return () => window.removeEventListener('resize', handleResize);
    }, []);
    return deviceSize;
};

export default useDeviceSize;
