import { render, screen, waitFor } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { FilterProvider } from '@/context/FilterContext';
import ProductList from '../ProductList';

// Mock del servicio de productos
jest.mock('@/services/productService', () => ({
  getProducts: jest.fn(() =>
    Promise.resolve({
      products: [
        { id: 1, sku: '12345', name: 'Producto 1', brand: 'Marca A', category: 'Phones', price: 100, image: '/images/product1.jpg' },
        { id: 2, sku: '67890', name: 'Producto 2', brand: 'Marca B', category: 'Laptops', price: 200, image: '/images/product2.jpg' }
      ],
      total: 2,
    })
  ),
}));

// Función para renderizar con todos los contextos necesarios
const renderWithProviders = (ui: React.ReactElement) => {
  const queryClient = new QueryClient();
  return render(
    <QueryClientProvider client={queryClient}>
      <FilterProvider> {/* ✅ Envolver en FilterProvider */}
        {ui}
      </FilterProvider>
    </QueryClientProvider>
  );
};

describe('ProductList Component', () => {
  it('debe mostrar una lista de productos', async () => {
    renderWithProviders(<ProductList initialProducts={[]} />);

    // 🔹 Esperar hasta que los productos se rendericen
    await waitFor(() => expect(screen.getByText('Producto 1')).toBeInTheDocument());
    await waitFor(() => expect(screen.getByText('Producto 2')).toBeInTheDocument());

    // 🔥 Verifica que se renderiza correctamente
    expect(screen.getByText('Producto 1')).toBeInTheDocument();
    expect(screen.getByText('Producto 2')).toBeInTheDocument();
  });
});
