'use client';

import { createContext, useContext, useState } from 'react';

interface FilterContextProps {
  search: string;
  setSearch: (value: string) => void;
  category: string;
  setCategory: (value: string) => void;
  brand: string;
  setBrand: (value: string) => void;
}

const FilterContext = createContext<FilterContextProps | undefined>(undefined);

export function FilterProvider({ children }: { children: React.ReactNode }) {
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('');
  const [brand, setBrand] = useState('');

  return (
    <FilterContext.Provider value={{ search, setSearch, category, setCategory, brand, setBrand }}>
      {children}
    </FilterContext.Provider>
  );
}

export function useFilter() {
  const context = useContext(FilterContext);
  if (!context) {
    throw new Error('useFilter must be used within a FilterProvider');
  }
  return context;
}
