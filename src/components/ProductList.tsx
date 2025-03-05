'use client';

import { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { getProducts } from '@/services/productService';
import { useDebounce } from '@/hooks/useDebounce';
import ProductCard from './ProductCard';
import ProductSkeleton from './ProductSkeleton';

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
  category?: string; // 🔥 Recibe la categoría de `page.tsx`
}

export default function ProductList({ initialProducts, category }: ProductListProps) {
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState(category || ''); // 🔥 Sincroniza el filtro con la URL
  const [brand, setBrand] = useState('');
  const [page, setPage] = useState(1);
  const limit = 6;
  const debouncedSearch = useDebounce(search, 500);

  // 🔹 React Query para obtener productos
  const { data, error, isLoading, refetch } = useQuery({
    queryKey: ['products', debouncedSearch, selectedCategory, brand, page], // 🔥 Se asegura de actualizar al cambiar `category`
    queryFn: () => getProducts({ search: debouncedSearch, category: selectedCategory, brand, page, limit }),
    initialData: { products: initialProducts ?? [], total: initialProducts?.length ?? 0 },
  });

  // 🔹 Actualiza productos cuando `category` cambia desde la URL (breadcrumb)
  useEffect(() => {
    if (category && category !== selectedCategory) {
      console.log("🟢 Cambio de categoría detectado desde URL:", category);
      setSelectedCategory(category);
      refetch(); // 🔥 Forzamos una nueva carga
    }
  }, [category, refetch]);

  console.log("🔵 Datos obtenidos de la API:", data?.products);
  console.log("🟢 Categoría actual:", selectedCategory);

  const products = data?.products ?? [];

  return (
    <div className="container mx-auto p-4">
      {/* Búsqueda y Filtros */}
      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <input
          type="text"
          placeholder="Buscar productos..."
          className="border p-2 w-full md:w-1/3"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <select className="border p-2 w-full md:w-1/4" value={selectedCategory} onChange={(e) => setSelectedCategory(e.target.value)}>
          <option value="">Todas las categorías</option>
          <option value="Phones">Teléfonos</option>
          <option value="Laptops">Laptops</option>
        </select>

        <select className="border p-2 w-full md:w-1/4" value={brand} onChange={(e) => setBrand(e.target.value)}>
          <option value="">Todas las marcas</option>
          <option value="TechCorp">TechCorp</option>
        </select>
      </div>

      {/* Lista de Productos con Skeleton Loaders */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {isLoading
          ? Array.from({ length: limit }).map((_, index) => <ProductSkeleton key={index} />)
          : products.length > 0
          ? products.map((product) => <ProductCard key={product.id} {...product} />)
          : <p className="text-center col-span-3">No se encontraron productos en esta categoría.</p>
        }
      </div>

      {/* Controles de paginación */}
      {products.length > 0 && (
        <div className="flex justify-center gap-4 mt-6">
          <button
            className="px-4 py-2 border bg-gray-200"
            onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
            disabled={page === 1}
          >
            Anterior
          </button>
          <span className="text-lg font-semibold">Página {page}</span>
          <button
            className="px-4 py-2 border bg-gray-200"
            onClick={() => setPage((prev) => (products.length === limit ? prev + 1 : prev))}
            disabled={products.length !== limit}
          >
            Siguiente
          </button>
        </div>
      )}
    </div>
  );
}
