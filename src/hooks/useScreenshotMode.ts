import { useState, useEffect } from 'react';

export const useScreenshotMode = () => {
  const [isActive, setIsActive] = useState(false);

  const enableScreenshotMode = () => {
    setIsActive(true);
    document.querySelector('.header')?.classList.add('hidden');
    document.querySelector('.nav-sidebar')?.classList.add('hidden');
    document.body.style.padding = '0';
  };

  const disableScreenshotMode = () => {
    setIsActive(false);
    document.querySelector('.header')?.classList.remove('hidden');
    document.querySelector('.nav-sidebar')?.classList.remove('hidden');
    document.body.style.padding = '';
  };

  useEffect(() => {
    return () => {
      // Cleanup when component unmounts
      disableScreenshotMode();
    };
  }, []);

  return {
    isActive,
    enableScreenshotMode,
    disableScreenshotMode,
  };
}; 