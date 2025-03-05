'use client';

import { useSearchParams, useRouter } from 'next/navigation';
import { useTotalProducts } from '@/hooks/useTotalProducts';
import { useFilter } from '@/context/FilterContext';
import '@/styles/globals.css';

interface PaginationProps {
  currentPage: number;
  onPageChange: (newPage: number) => void;
  limit: number;
}

export default function Pagination({ currentPage, onPageChange, limit }: PaginationProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { search, category, brand } = useFilter();

  const { data: totalProducts, isLoading } = useTotalProducts({ search, category, brand });

  const totalPages = totalProducts ? Math.ceil(totalProducts / limit) : 1;

  const handlePageChange = (newPage: number) => {
    if (newPage < 1 || newPage > totalPages) return;

    const params = new URLSearchParams(searchParams);
    params.set('page', String(newPage));

    router.push(`${window.location.pathname}?${params.toString()}`, { scroll: false });

    onPageChange(newPage);
  };

  if (isLoading) return <p className="text-center">Cargando paginación...</p>;

  return (
    <div className="flex justify-center gap-4 mt-6">
      <button
        className="px-4 py-2 border bg-gray-200 disabled:opacity-50 hover:cursor-pointer"
        onClick={() => handlePageChange(currentPage - 1)}
        disabled={currentPage === 1}
      >
        Anterior
      </button>
      <span className="text-lg font-semibold">
        Página {currentPage} de {totalPages}
      </span>
      <button
        className="px-4 py-2 border bg-gray-200 disabled:opacity-50 hover:cursor-pointer"
        onClick={() => handlePageChange(currentPage + 1)}
        disabled={currentPage >= totalPages}
      >
        Siguiente
      </button>
    </div>
  );
}
