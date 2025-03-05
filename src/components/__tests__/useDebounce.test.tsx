import { renderHook, act } from '@testing-library/react';
import { useDebounce } from '@/hooks/useDebounce';

jest.useFakeTimers(); // Simulamos temporizadores para controlar el tiempo en las pruebas

describe('useDebounce Hook', () => {
  test('devuelve el valor inicial inmediatamente', () => {
    const { result } = renderHook(() => useDebounce('Test', 500));

    expect(result.current).toBe('Test');
  });

  test('retrasa la actualización del valor', () => {
    const { result, rerender } = renderHook(({ value }) => useDebounce(value, 500), {
      initialProps: { value: 'Inicial' },
    });

    expect(result.current).toBe('Inicial');

    // 🔄 Se cambia el valor antes de 500ms
    rerender({ value: 'Nuevo valor' });

    expect(result.current).toBe('Inicial');

    // ⏳ Avanzamos el tiempo a 500ms
    act(() => {
      jest.advanceTimersByTime(500);
    });

    expect(result.current).toBe('Nuevo valor');
  });

  test('cancela la actualización si cambia antes de completarse', () => {
    const { result, rerender } = renderHook(({ value }) => useDebounce(value, 500), {
      initialProps: { value: 'Primero' },
    });

    expect(result.current).toBe('Primero');

    rerender({ value: 'Segundo' });
    act(() => {
      jest.advanceTimersByTime(250);
    });

    rerender({ value: 'Tercero' });

    act(() => {
      jest.advanceTimersByTime(500);
    });

    expect(result.current).toBe('Tercero');
  });

  test('se limpia correctamente al desmontarse', () => {
    const { result, unmount, rerender } = renderHook(({ value }) => useDebounce(value, 500), {
      initialProps: { value: 'Antes' },
    });

    rerender({ value: 'Después' });

    unmount(); // 🔥 Desmontamos el hook

    act(() => {
      jest.advanceTimersByTime(500); //Avanzamos el tiempo
    });

    expect(result.current).toBe('Antes'); //No se actualiza después de desmontar
  });
});
