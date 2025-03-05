'use client';

import { useEffect, useState, useMemo, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';
import { getProducts } from '@/services/productService';
import { useDebounce } from '@/hooks/useDebounce';
import { useFilter } from '@/context/FilterContext';
import ProductCard from './ProductCard';
import ProductSkeleton from './ProductSkeleton';
import Filters from './Filters';
import SearchBar from './SearchBar';
import Pagination from './Pagination';
import { useTotalProducts } from '@/hooks/useTotalProducts';
import '@/styles/globals.css';

interface Product {
  id: number;
  sku: string;
  name: string;
  brand: string;
  category: string;
  price: number;
  image: string;
}

interface ProductListProps {
  initialProducts: Product[];
  category?: string;
}

export default function ProductList({ initialProducts, category }: ProductListProps) {
  const { search, category: selectedCategory, brand } = useFilter();
  const [localCategory, setLocalCategory] = useState(category || selectedCategory || '');
  const debouncedSearch = useDebounce(search, 500);
  const router = useRouter();
  const [page, setPage] = useState(1);
  const limit = 6;

  const { data: totalProducts, isLoading: isLoadingTotal } = useTotalProducts({
    search: debouncedSearch,
    category: selectedCategory,
    brand
  });

  /** 🔹 Obtener productos con React Query */
  const { data, error, isLoading, refetch } = useQuery({
    queryKey: ['products', debouncedSearch, localCategory ?? '', brand, page],
    queryFn: async () => {
      console.log("🔵 Haciendo consulta a la API con categoría:", localCategory, "y búsqueda:", debouncedSearch);
      return getProducts({ search: debouncedSearch, category: localCategory, brand, page });
    },
    placeholderData: { products: initialProducts ?? [], total: initialProducts?.length ?? 0 },
    staleTime: 1000 * 60 * 5,
  });

  /** 🔹 Memoizar productos para evitar recalcular en cada render */
  const memoizedProducts = useMemo(() => {
    return data?.products ?? [];
  }, [data]);

  /** 🔹 Memoizar total de productos para evitar cálculos innecesarios */
  const memoizedTotalProducts = useMemo(() => {
    return totalProducts ?? 0;
  }, [totalProducts]);

  /** 🔹 Resetear página a 1 cuando cambia la categoría o la marca */
  useEffect(() => {
    setPage(1);
  }, [selectedCategory, brand]);

  /** 🔹 Refrescar productos cuando cambia la búsqueda */
  useEffect(() => {
    if (debouncedSearch !== undefined) {
      console.log("🔄 Refrescando productos por búsqueda...");
      refetch();
    }
  }, [debouncedSearch, refetch]);

  /** 🔹 Memoizar el cambio de categoría para evitar re-render innecesarios */
  const handleCategoryChange = useCallback((newCategory: string) => {
    setLocalCategory(newCategory);
    setPage(1);
    
    if (newCategory === '') {
      router.push('/');
    } else {
      router.push(`/category/${newCategory.toLowerCase()}`);
    }

    setTimeout(() => {
      refetch();
    }, 50);
  }, [router, refetch]);

  /** 🔹 Refrescar productos cuando cambia la página */
  useEffect(() => {
    refetch();
  }, [page, refetch]);

  return (
    <div className="container mx-auto p-4">
      {/* Búsqueda y Filtros */}
      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <SearchBar onSearchChange={() => refetch()} />
        <Filters onCategoryChange={handleCategoryChange} onBrandChange={() => refetch()} />
      </div>

      {/* Lista de Productos con Skeleton Loaders */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {isLoading
          ? Array.from({ length: limit }).map((_, index) => <ProductSkeleton key={index} />)
          : memoizedProducts.length > 0
          ? memoizedProducts.map((product) => <ProductCard key={product.id} {...product} />)
          : <p className="text-center col-span-3">No se encontraron productos.</p>
        }
      </div>

      {!isLoadingTotal && memoizedTotalProducts > limit && (
        <Pagination
          currentPage={page}
          onPageChange={setPage}
          limit={limit}
        />
      )}
    </div>
  );
}
