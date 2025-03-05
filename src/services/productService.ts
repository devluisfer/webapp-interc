import axios from 'axios';

export interface Product {
  id: number;
  sku: string;
  name: string;
  brand: string;
  category: string;
  price: number;
  image: string;
}

export interface ProductsResponse {
  products: Product[];
  total: number;
}

// 🔥 Aseguramos que la URL siempre tenga un dominio válido
const API_URL = process.env.NEXT_PUBLIC_API_URL || 'https://localhost:3001/api/products';


export const getProducts = async ({
  search = '',
  category = '',
  brand = '',
  page = 1,
  limit = 6,
}): Promise<ProductsResponse> => {
  try {
    const params = new URLSearchParams();
    if (search) params.append('q', search);
    if (category) params.append('category_like', category.charAt(0).toUpperCase() + category.slice(1));
    if (brand) params.append('brand', brand);
    params.append('_page', page.toString());
    params.append('_limit', limit.toString());

    const url = `${API_URL}?${params.toString()}`;


    // const url = params.toString() ? `${API_URL}?${params.toString()}` : API_URL;

    console.log('📡 Fetching products from:', url);

    const response = await axios.get(url);

    if (!Array.isArray(response.data)) {
      console.warn("⚠️ La API no devolvió un array. Intentando sin paginación...");
      const fallbackResponse = await axios.get(API_URL);
      return {
        products: fallbackResponse.data,
        total: fallbackResponse.data.length,
      };
    }

    return {
      products: response.data,
      total: Number(response.headers['x-total-count']) || 0,
    };
  } catch (error) {
    console.error('❌ Error en getProducts:', error);
    throw error;
  }
};

export const getProductBySku = async (sku: string) => {
  try {
    const url = `${API_URL}?sku=${sku}`;
    console.log('📡 Fetching product by SKU from:', url);

    const response = await axios.get(url);
    return response.data.length > 0 ? response.data[0] : null;
  } catch (error) {
    console.error('❌ Error en getProductBySku:', error);
    return null;
  }
};
