import { render, screen } from '@testing-library/react';
import ProductSkeleton from '../ProductSkeleton';

test('renderiza correctamente el skeleton loader', () => {
  render(<ProductSkeleton />);
  expect(screen.getByTestId('product-skeleton')).toBeInTheDocument();
});
