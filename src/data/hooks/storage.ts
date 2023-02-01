import { Buffer } from 'buffer';
import { useState } from 'react';

export const useStorage = (key: string, initialValue: any) => {
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const item = window.localStorage.getItem(key);
      const buffer = item ? Buffer.from(item, 'base64') : null;
      return buffer ? JSON.parse(buffer.toLocaleString()) : initialValue;
    } catch (error) {
      console.error(error);
      return initialValue;
    }
  });

  const setValue = (value: any) => {
    try {
      const valueToStore =
        value instanceof Function ? value(storedValue) : value;
      setStoredValue(valueToStore);
      const buffer = Buffer.from(JSON.stringify(valueToStore));
      window.localStorage.setItem(key, buffer.toString('base64'));
    } catch (error) {
      console.error(error);
    }
  };

  const clearValue = () => {
    try {
      window.localStorage.removeItem(key);
    } catch (error) {
      console.error(error);
    }
  };

  return [storedValue, setValue, clearValue];
};
