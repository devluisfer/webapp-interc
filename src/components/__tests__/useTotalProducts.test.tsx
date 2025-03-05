import { renderHook, waitFor } from '@testing-library/react';
import { useTotalProducts } from '@/hooks/useTotalProducts';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import axios from 'axios';

// 🔥 Mockeamos axios para simular la API sin hacer llamadas reales
jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

// 📌 Función para envolver el hook en React Query Provider
const createWrapper = () => {
  const queryClient = new QueryClient({
    defaultOptions: { queries: { retry: false } }, // Evita reintentos automáticos en pruebas
  });

  return ({ children }: { children: React.ReactNode }) => (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
};

describe('useTotalProducts Hook', () => {
  test('devuelve el total de productos correctamente', async () => {
    mockedAxios.get.mockResolvedValue({ data: Array(20).fill({}) });

    const { result } = renderHook(() => useTotalProducts({}), {
      wrapper: createWrapper(),
    });

    await waitFor(() => {
      expect(result.current.data).toBe(20);
      expect(result.current.isError).toBe(false);
    });
  });

  test('maneja errores si la API falla en obtener el total de productos', async () => {
    mockedAxios.get.mockRejectedValue(new Error('Error al obtener productos'));

    const { result } = renderHook(() => useTotalProducts({}), {
      wrapper: createWrapper(),
    });

    await waitFor(() => {
      expect(result.current.isError).toBe(true);
      expect(result.current.data).toBeUndefined(); // 🔥 Confirma que `data` no tiene valores
      expect(result.current.error).toBeInstanceOf(Error);
      expect(result.current.error?.message).toBe('Error al obtener productos');
    });
  });
});
