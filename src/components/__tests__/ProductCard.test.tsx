import { render, screen } from '@testing-library/react';
import ProductCard from '../ProductCard';

const mockProduct = {
  id: 1,
  sku: '12345',
  name: 'Smartphone XYZ',
  brand: 'TechCorp',
  category: 'Phones',
  price: 499.99,
  image: '/images/smartphone.jpg',
};

describe('ProductCard Component', () => {
  it('debe renderizar correctamente la información del producto', () => {
    render(<ProductCard {...mockProduct} />);

    expect(screen.getByText(/Smartphone XYZ/i)).toBeInTheDocument();
    expect(screen.getByText(/TechCorp - Phones/i)).toBeInTheDocument();
    expect(screen.getByText(/\$499.99/i)).toBeInTheDocument();
  });

  it('debe contener un enlace al detalle del producto', () => {
    render(<ProductCard {...mockProduct} />);

    const linkElement = screen.getByRole('link', { name: /Ver detalles/i });
    expect(linkElement).toHaveAttribute('href', `/products/${mockProduct.sku}`);
  });
});
