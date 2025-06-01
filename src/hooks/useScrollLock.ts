// useScrollLock.ts
import { useEffect } from 'react';

export function useScrollLock(lock: boolean) {
  useEffect(() => {
    const html = document.documentElement;
    if (lock) {
      html.style.overflow = 'hidden';
    } else {
      html.style.overflow = '';
    }

    return () => {
      html.style.overflow = '';
    };
  }, [lock]);
}
