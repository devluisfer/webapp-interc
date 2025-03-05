import { renderHook, act } from "@testing-library/react";
import { FilterProvider, useFilter } from "@/context/FilterContext";

describe("FilterContext Hook", () => {
  test("proporciona valores iniciales correctamente", () => {
    const { result } = renderHook(() => useFilter(), { wrapper: FilterProvider });

    expect(result.current.search).toBe("");
    expect(result.current.category).toBe("");
    expect(result.current.brand).toBe("");
  });

  test("permite actualizar el estado del filtro", () => {
    const { result } = renderHook(() => useFilter(), { wrapper: FilterProvider });

    act(() => {
      result.current.setSearch("laptop");
      result.current.setCategory("Laptops");
      result.current.setBrand("TechCorp");
    });

    expect(result.current.search).toBe("laptop");
    expect(result.current.category).toBe("Laptops");
    expect(result.current.brand).toBe("TechCorp");
  });

  test("mantiene el estado entre renders", () => {
    const { result, rerender } = renderHook(() => useFilter(), { wrapper: FilterProvider });

    act(() => {
      result.current.setSearch("tablet");
    });

    rerender();

    expect(result.current.search).toBe("tablet"); // ✅ Mantiene el valor tras renderizar de nuevo
  });

  test("arroja un error si se usa fuera de FilterProvider", () => {
    let caughtError: Error | null = null;
  
    try {
      renderHook(() => useFilter());
    } catch (error) {
      caughtError = error as Error;
    }
  
    expect(caughtError).toBeInstanceOf(Error);
    expect(caughtError?.message).toBe("useFilter must be used within a FilterProvider");
  });
  
});
