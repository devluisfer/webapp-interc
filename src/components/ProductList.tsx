'use client';

import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { getProducts } from '@/services/productService';
import { useDebounce } from '@/hooks/useDebounce';
import ProductCard from './ProductCard';
import ProductSkeleton from './ProductSkeleton';

// Definimos la estructura de un producto
interface Product {
  id: number;
  sku: string;
  name: string;
  brand: string;
  category: string;
  price: number;
  image: string;
}

// Definimos la estructura de la respuesta de la API
interface ProductsResponse {
  products: Product[];
  total: number;
}

export default function ProductList() {
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('');
  const [brand, setBrand] = useState('');
  const [page, setPage] = useState(1);
  const limit = 6; // Número de productos por página
  const debouncedSearch = useDebounce(search, 500);

  const { data, error, isLoading } = useQuery<ProductsResponse>({
    queryKey: ['products', debouncedSearch, category, brand, page],
    queryFn: () => getProducts({ search: debouncedSearch, category, brand, page, limit }),
    placeholderData: (previousData) => previousData, // Mantiene los datos previos mientras carga
  });

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
        <select className="border p-2 w-full md:w-1/4" value={category} onChange={(e) => setCategory(e.target.value)}>
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
        {isLoading ? (
          Array.from({ length: limit }).map((_, index) => <ProductSkeleton key={index} />)
        ) : data?.products && data.products.length > 0 ? (
          data.products.map((product: Product) => <ProductCard key={product.id} {...product} />)
        ) : (
          <p className="text-center col-span-3">No se encontraron productos.</p>
        )}
      </div>

      {/* Controles de paginación */}
      {data?.products && data.products.length > 0 && (
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
            onClick={() => setPage((prev) => (data?.products.length === limit ? prev + 1 : prev))}
            disabled={data?.products.length !== limit}
          >
            Siguiente
          </button>
        </div>
      )}
    </div>
  );
}
