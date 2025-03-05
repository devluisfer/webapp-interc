import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

const API_URL = 'http://localhost:3001/products';

interface TotalProductsParams {
  search?: string;
  category?: string;
  brand?: string;
}

/**
 * Hook para obtener el total de productos según los filtros seleccionados.
 */
export const useTotalProducts = ({ search = '', category = '', brand = '' }: TotalProductsParams) => {
  return useQuery<number>({
    queryKey: ['totalProducts', search, category, brand], // 🔥 Se actualiza si cambian filtros
    queryFn: async () => {
      const params = new URLSearchParams();
      if (search) params.append('q', search);
      if (category) params.append('category_like', category.charAt(0).toUpperCase() + category.slice(1));
      if (brand) params.append('brand', brand);
    //   await new Promise((resolve) => setTimeout(resolve, 2000));
      /** Consultar sin paginación para obtener el total real */
      const response = await axios.get(API_URL, { params });

      console.log("📊 Total de productos:", response.data.length); // ✅ Ahora obtenemos el total real
      return response.data.length;
    },
    staleTime: 1000 * 60 * 5, // Cache de 5 minutos
  });
};
