import { useState, useEffect } from 'react';

export const useFocusMode = () => {
  const [isActive, setIsActive] = useState(false);

  const enableFocusMode = () => {
    setIsActive(true);
    document.querySelector('.header')?.classList.add('hidden');
    document.querySelector('.nav-sidebar')?.classList.add('hidden');
  };

  const disableFocusMode = () => {
    setIsActive(false);
    document.querySelector('.header')?.classList.remove('hidden');
    document.querySelector('.nav-sidebar')?.classList.remove('hidden');
  };

  useEffect(() => {
    return () => {
      // Cleanup when component unmounts
      disableFocusMode();
    };
  }, []);

  return {
    isActive,
    enableFocusMode,
    disableFocusMode,
  };
}; 