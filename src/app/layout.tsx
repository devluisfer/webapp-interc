'use client';

import { FilterProvider } from '@/context/FilterContext';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useState } from 'react';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const [queryClient] = useState(() => new QueryClient());

  return (
    <html lang="es">
      <body>
        <QueryClientProvider client={queryClient}>
          <FilterProvider>
            {children}
          </FilterProvider>
        </QueryClientProvider>
      </body>
    </html>
  );
}
