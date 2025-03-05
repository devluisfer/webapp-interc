import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import Filters from '../Filters';
import { FilterProvider } from '@/context/FilterContext';

const renderWithProviders = (ui: React.ReactElement) => {
  return render(<FilterProvider>{ui}</FilterProvider>);
};

describe('Filters Component', () => {
  beforeEach(() => {
    global.fetch = jest.fn(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve([
          { category: 'Phones', brand: 'TechCorp' },
          { category: 'Laptops', brand: 'TechCorp' },
          { category: 'Tablets', brand: 'TechCorp' },
        ]),
      })
    ) as jest.Mock;
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('maneja correctamente la selección de "Todas las marcas"', async () => {
    renderWithProviders(<Filters onCategoryChange={jest.fn()} onBrandChange={jest.fn()} />);

    await waitFor(() => expect(screen.getByText('Todas las marcas')).toBeInTheDocument());

    fireEvent.change(screen.getByRole('combobox', { name: '' }), { target: { value: '' } });

    expect(screen.getByText('Todas las marcas')).toBeInTheDocument();
  });

  it('maneja errores de la API correctamente', async () => {
    (global.fetch as jest.Mock).mockRejectedValueOnce(new Error('API no disponible'));

    renderWithProviders(<Filters onCategoryChange={jest.fn()} onBrandChange={jest.fn()} />);

    await waitFor(() => expect(screen.getByText(/API no disponible/i)).toBeInTheDocument());
  });
});
