import axios from 'axios';


// Definir la estructura de un producto
export interface Product {
    id: number;
    sku: string;
    name: string;
    brand: string;
    category: string;
    price: number;
    image: string;
  }
  
  // Definir la estructura de la respuesta esperada
  export interface ProductsResponse {
    products: Product[];
    total: number;
  }

const API_URL = 'http://localhost:3001/products';

/**
 * Obtiene la lista de productos desde la API.
 */export const getProducts = async ({
  search = '',
  category = '',
  brand = '',
  page = 1,
  limit = 6,
}): Promise<ProductsResponse> => {
  try {
    const params = new URLSearchParams();
    if (search) params.append('q', search);
    // if (category) params.append('category', category);
    if (category) params.append('category_like', category.charAt(0).toUpperCase() + category.slice(1));
    if (brand) params.append('brand', brand);
    params.append('_page', page.toString()); // Paginación
    params.append('_limit', limit.toString()); // Límite de productos por página

    const response = await axios.get(`${API_URL}?${params.toString()}`);

    console.log("🟢 Respuesta de la API en getProducts():", response.data);
    return {
      products: response.data,
      total: Number(response.headers['x-total-count']) || 0, // Total de productos
    };
  } catch (error) {
    console.error('Error fetching products:', error);
    throw error;
  }
};

/**
 * Obtiene los detalles de un producto por SKU.
 */
export const getProductBySku = async (sku: string) => {
  try {
    const response = await axios.get(`${API_URL}?sku=${sku}`);
    return response.data.length > 0 ? response.data[0] : null;
  } catch (error) {
    console.error('Error fetching product:', error);
    return null;
  }
};
