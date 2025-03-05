'use client';

import { useFilter } from '@/context/FilterContext';
import '@/styles/globals.css';

interface SearchBarProps {
  onSearchChange: (search: string) => void;
}

export default function SearchBar({ onSearchChange }: SearchBarProps) {
  const { search, setSearch } = useFilter();

  return (
    <input
      type="text"
      placeholder="Buscar productos..."
      className="border p-2 w-full md:w-1/3"
      value={search}
      onChange={(e) => {
        setSearch(e.target.value);
        onSearchChange(e.target.value);
      }}
    />
  );
}
