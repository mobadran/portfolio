import { useState } from 'react';

export function useSessionStorage<T>(key: string, initialValue: T) {
  const isClient = typeof window !== 'undefined' && window.sessionStorage;
  const [storedValue, setStoredValue] = useState<T>(() => {
    if (!isClient) return initialValue;

    try {
      const item = window.sessionStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.error(`Error reading sessionStorage key "${key}":`, error);
      return initialValue;
    }
  });

  const setValue = (value: T | ((val: T) => T)) => {
    try {
      const valueToStore = value instanceof Function ? value(storedValue) : value;
      setStoredValue(valueToStore);
      window.sessionStorage.setItem(key, JSON.stringify(valueToStore));
    } catch (error) {
      console.error(`Error setting sessionStorage key "${key}":`, error);
    }
  };

  return [storedValue, setValue] as const;
}
