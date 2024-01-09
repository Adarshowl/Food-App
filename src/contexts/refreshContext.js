import {createContext} from 'react';

export const RefreshContext = createContext(() => {
  console.warn('Re-rendering application!');
});
