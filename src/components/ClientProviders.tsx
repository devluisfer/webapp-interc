"use client";

import { FilterProvider } from '@/context/FilterContext';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useState } from 'react';

export default function ClientProviders({ children }: { children: React.ReactNode }) {
  const [queryClient] = useState(() => new QueryClient());

  return (
    <QueryClientProvider client={queryClient}>
      <FilterProvider>
        {children}
      </FilterProvider>
    </QueryClientProvider>
  );
}
