'use client';

import { useEffect, useState } from 'react';
import { useFilter } from '@/context/FilterContext';

interface Product {
  category: string;
  brand: string;
}

interface FiltersProps {
  onCategoryChange: (category: string) => void;
  onBrandChange: (brand: string) => void;
}

export default function Filters({ onCategoryChange, onBrandChange }: FiltersProps) {
  const { category, setCategory, brand, setBrand } = useFilter();
  const [categories, setCategories] = useState<string[]>([]);
  const [brands, setBrands] = useState<string[]>([]);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  /** 🔹 Obtener categorías y marcas dinámicamente desde la API */
  useEffect(() => {
    const fetchFilters = async () => {
      try {
        const res = await fetch('https://db-zzme.onrender.com/products');
        if (!res.ok) throw new Error(`Error HTTP: ${res.status}`);
        
        const products: Product[] = await res.json();

        if (!products || products.length === 0) {
          throw new Error("La API devolvió una respuesta vacía.");
        }

        const uniqueCategories: string[] = [...new Set(products.map((p) => p.category))];
        const uniqueBrands: string[] = [...new Set(products.map((p) => p.brand))];

        setCategories(uniqueCategories);
        setBrands(uniqueBrands);
      } catch (error) {
        if (error instanceof Error) {
          console.error("Error obteniendo filtros:", error.message);
          setErrorMessage(error.message);
        }
      }
    };

    fetchFilters();
  }, []);

  return (
    <div className="flex flex-col md:flex-row gap-4 mb-6">
      {errorMessage && <p className="text-red-500">{errorMessage}</p>}

      <select
        className="border p-2 w-full md:w-1/4"
        value={category || ''}
        onChange={(e) => {
          setCategory(e.target.value);
          onCategoryChange(e.target.value);
        }}
      >
        <option value="">Todas las categorías</option>
        {categories.map((cat) => (
          <option key={cat} value={cat}>{cat}</option>
        ))}
      </select>

      <select
        className="border p-2 w-full md:w-1/4"
        value={brand || ''}
        onChange={(e) => {
          setBrand(e.target.value);
          onBrandChange(e.target.value);
        }}
      >
        <option value="">Todas las marcas</option>
        {brands.map((brand) => (
          <option key={brand} value={brand}>{brand}</option>
        ))}
      </select>
    </div>
  );
}
