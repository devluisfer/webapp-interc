import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import Pagination from '../Pagination';
import { FilterProvider } from '@/context/FilterContext';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

jest.mock('next/navigation', () => ({
  useRouter: () => ({
    push: jest.fn(),
  }),
  useSearchParams: () => ({
    get: jest.fn(),
  }),
}));

const renderWithProviders = (ui: React.ReactElement) => {
  const queryClient = new QueryClient();
  return render(
    <QueryClientProvider client={queryClient}>
      <FilterProvider>{ui}</FilterProvider>
    </QueryClientProvider>
  );
};

describe('Pagination Component', () => {
  test('debe renderizar botones de paginación', async () => {
    renderWithProviders(<Pagination currentPage={1} onPageChange={jest.fn()} limit={6} />);

    await waitFor(() => {
      expect(screen.getByText('Siguiente')).toBeInTheDocument();
      expect(screen.getByText('Anterior')).toBeInTheDocument();
    });
  });

  test('deshabilita el botón "Anterior" en la primera página', async () => {
    renderWithProviders(<Pagination currentPage={1} onPageChange={jest.fn()} limit={6} />);
    
    await waitFor(() => {
      expect(screen.getByText('Anterior')).toBeDisabled();
    });
  });

  test('deshabilita el botón "Siguiente" en la última página', async () => {
    renderWithProviders(<Pagination currentPage={4} onPageChange={jest.fn()} limit={6} />);
  
    await waitFor(() => {
      expect(screen.getByText('Siguiente')).toBeDisabled(); // ✅ Correcto, ahora estamos en la última página
    });
  });

  test('cambia de página al hacer clic en "Siguiente"', async () => {
    const mockOnPageChange = jest.fn();
    renderWithProviders(<Pagination currentPage={1} onPageChange={mockOnPageChange} limit={6} />);

    const nextButton = screen.getByText('Siguiente');
    fireEvent.click(nextButton);

    expect(mockOnPageChange).toHaveBeenCalledWith(2);
  });

  test('cambia de página al hacer clic en "Anterior"', async () => {
    const mockOnPageChange = jest.fn();
    renderWithProviders(<Pagination currentPage={2} onPageChange={mockOnPageChange} limit={6} />);

    const prevButton = screen.getByText('Anterior');
    fireEvent.click(prevButton);

    expect(mockOnPageChange).toHaveBeenCalledWith(1);
  });

  test('muestra correctamente el número de página actual', async () => {
    renderWithProviders(<Pagination currentPage={2} onPageChange={jest.fn()} limit={6} />);

    await waitFor(() => {
      expect(screen.getByText('Página 2 de')).toBeInTheDocument();
    });
  });

  test('muestra mensaje de carga cuando isLoading es true', async () => {
    // Mock de useTotalProducts para simular isLoading
    jest.mock('@/hooks/useTotalProducts', () => ({
      useTotalProducts: () => ({ data: undefined, isLoading: true }),
    }));
  
    renderWithProviders(<Pagination currentPage={1} onPageChange={jest.fn()} limit={6} />);
  
    expect(screen.getByText('Cargando paginación...')).toBeInTheDocument();
  });
  
});
