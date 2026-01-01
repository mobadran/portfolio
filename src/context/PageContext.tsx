import { createContext, useContext, useState } from 'react';
import type { ReactNode } from 'react';

// Define the page types
type Page = 'home' | 'cli';

// Define the context shape
interface PageContextType {
  currentPage: Page;
  setPage: (page: Page) => void;
}

// Create context
const PageContext = createContext<PageContextType | undefined>(undefined);

// Provider component
export const PageContextProvider = ({ children }: { children: ReactNode }) => {
  const [currentPage, setCurrentPage] = useState<Page>('home');

  return <PageContext.Provider value={{ currentPage, setPage: setCurrentPage }}>{children}</PageContext.Provider>;
};

// Custom hook for consuming context
export const usePage = () => {
  const context = useContext(PageContext);
  if (!context) {
    throw new Error('usePage must be used within a PageContextProvider');
  }
  return context;
};
