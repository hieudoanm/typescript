import { useState, useEffect } from 'react';

export const useIsOnline = (): boolean => {
  const defaultOnline: boolean =
    typeof window !== 'undefined' ? window.navigator.onLine : true;
  const [isOnline, setIsOnline] = useState<boolean>(defaultOnline);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    window.addEventListener('offline', () => {
      console.info('offline', window.navigator.onLine);
      setIsOnline(window.navigator.onLine);
    });
    window.addEventListener('online', () => {
      console.info('online', window.navigator.onLine);
      setIsOnline(window.navigator.onLine);
    });

    return () => {
      if (typeof window === 'undefined') return;
      window.removeEventListener('offline', () => {});
      window.removeEventListener('online', () => {});
    };
  }, []);

  return isOnline;
};
