import { renderHook, act } from '@testing-library/react';
import { useDebounce } from '@/hooks/useDebounce';

jest.useFakeTimers(); // Simulamos temporizadores para controlar el tiempo en las pruebas

describe('useDebounce Hook', () => {
  test('devuelve el valor inicial inmediatamente', () => {
    const { result } = renderHook(() => useDebounce('Test', 500));

    expect(result.current).toBe('Test'); // ✅ El valor inicial se mantiene sin cambios
  });

  test('retrasa la actualización del valor', () => {
    const { result, rerender } = renderHook(({ value }) => useDebounce(value, 500), {
      initialProps: { value: 'Inicial' },
    });

    expect(result.current).toBe('Inicial'); // ✅ Mantiene el valor inicial

    // 🔄 Se cambia el valor antes de 500ms
    rerender({ value: 'Nuevo valor' });

    expect(result.current).toBe('Inicial'); // ⏳ Aún no se ha actualizado

    // ⏳ Avanzamos el tiempo a 500ms
    act(() => {
      jest.advanceTimersByTime(500);
    });

    expect(result.current).toBe('Nuevo valor'); // ✅ Después del debounce, se actualiza
  });

  test('cancela la actualización si cambia antes de completarse', () => {
    const { result, rerender } = renderHook(({ value }) => useDebounce(value, 500), {
      initialProps: { value: 'Primero' },
    });

    expect(result.current).toBe('Primero'); // ✅ Valor inicial

    rerender({ value: 'Segundo' });
    act(() => {
      jest.advanceTimersByTime(250); // ⏳ Avanzamos solo 250ms (mitad del debounce)
    });

    rerender({ value: 'Tercero' }); // ⏳ Antes de que termine, cambia el valor

    act(() => {
      jest.advanceTimersByTime(500); // ⏳ Ahora dejamos correr el tiempo
    });

    expect(result.current).toBe('Tercero'); // ✅ Solo el último valor se aplica
  });

  test('se limpia correctamente al desmontarse', () => {
    const { result, unmount, rerender } = renderHook(({ value }) => useDebounce(value, 500), {
      initialProps: { value: 'Antes' },
    });

    rerender({ value: 'Después' });

    unmount(); // 🔥 Desmontamos el hook

    act(() => {
      jest.advanceTimersByTime(500); // ⏳ Avanzamos el tiempo
    });

    expect(result.current).toBe('Antes'); // ✅ No se actualiza después de desmontar
  });
});
