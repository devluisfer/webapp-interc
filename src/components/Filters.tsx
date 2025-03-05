'use client';

import { useEffect, useState } from 'react';
import { useFilter } from '@/context/FilterContext';
import '@/styles/globals.css';

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

  /** 🔹 Obtener categorías y marcas dinámicamente desde la API */
  useEffect(() => {
    fetch('http://localhost:3001/products')
      .then((res) => res.json())
      .then((products: Product[]) => { // ✅ 🔥 Especificamos que `products` es un array de `Product`
        const uniqueCategories: string[] = [...new Set(products.map((p) => p.category))];
        const uniqueBrands: string[] = [...new Set(products.map((p) => p.brand))];

        setCategories(uniqueCategories);
        setBrands(uniqueBrands);
      })
      .catch((error) => console.error("Error obteniendo filtros:", error));
  }, []);

  return (
    <div className="flex flex-col md:flex-row gap-4 mb-6">
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
