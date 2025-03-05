'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';
import { getProducts } from '@/services/productService';
import { useDebounce } from '@/hooks/useDebounce';
import { useFilter } from '@/context/FilterContext';
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
  category?: string;
}

export default function ProductList({ initialProducts, category }: ProductListProps) {
  const { search, setSearch, category: selectedCategory, setCategory, brand, setBrand } = useFilter();
  const [localCategory, setLocalCategory] = useState(category || selectedCategory || '');
  const debouncedSearch = useDebounce(search, 500);
  const router = useRouter();
  // const pathname = usePathname();

  /** 🔹 Obtener productos con React Query */
  const { data, error, isLoading, refetch } = useQuery({
    queryKey: ['products', debouncedSearch, localCategory ?? '', brand], // 🔥 Se asegura de detectar cambios en la búsqueda
    queryFn: () => {
      console.log("🔵 Haciendo consulta a la API con categoría:", localCategory, "y búsqueda:", debouncedSearch);
      return getProducts({ search: debouncedSearch, category: localCategory, brand });
    },
    initialData: { products: initialProducts ?? [], total: initialProducts?.length ?? 0 },
    staleTime: 1000 * 60 * 5, // Cache de 5 minutos
  });

  /** 🔹 Refrescar productos cuando cambia el search */
  useEffect(() => {
    if (debouncedSearch !== undefined) {
      console.log("🔄 Refrescando productos por búsqueda...");
      refetch();
    }
  }, [debouncedSearch, refetch]);

  /** 🔹 Actualizar la URL y la categoría de inmediato al cambiar de filtro */
  const handleCategoryChange = (newCategory: string) => {
    console.log("🟢 Cambiando categoría a:", newCategory);

    setCategory(newCategory);
    setLocalCategory(newCategory); // 🔥 Asegurar que `queryKey` lo detecte de inmediato

    if (newCategory === '') {
      router.push('/'); // 🔥 Ir a la página de todas las categorías
    } else {
      router.push(`/category/${newCategory.toLowerCase()}`); // 🔥 Actualizar la URL con la nueva categoría
    }

    /** 🔥 Refrescar productos inmediatamente con la categoría correcta */
    setTimeout(() => {
      refetch();
    }, 50);
  };

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

        <select
          className="border p-2 w-full md:w-1/4"
          value={localCategory || ''}
          onChange={(e) => handleCategoryChange(e.target.value)}
        >
          <option value="">Todas las categorías</option>
          <option value="Phones">Teléfonos</option>
          <option value="Laptops">Laptops</option>
        </select>

        <select
          className="border p-2 w-full md:w-1/4"
          value={brand}
          onChange={(e) => {
            setBrand(e.target.value);
            refetch();
          }}
        >
          <option value="">Todas las marcas</option>
          <option value="TechCorp">TechCorp</option>
        </select>
      </div>

      {/* Lista de Productos con Skeleton Loaders */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {isLoading
          ? Array.from({ length: 6 }).map((_, index) => <ProductSkeleton key={index} />)
          : data?.products.length > 0
          ? data.products.map((product) => <ProductCard key={product.id} {...product} />)
          : <p className="text-center col-span-3">No se encontraron productos.</p>
        }
      </div>
    </div>
  );
}
