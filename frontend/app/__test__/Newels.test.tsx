import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Newest from '@/components/Newels'; // Ensure this path is correct

// Mock the dependencies
jest.mock('@/lib/axios', () => ({
  get: jest.fn(),
}));

jest.mock('@/lib/auth', () => ({
  getCurrentToken: jest.fn(),
}));

// Update the path to ProductCard
jest.mock('@/components/ProductCard', () => {
  return function MockProductCard({ product }: { product: any }) {
    return <div data-testid="product-card">{product.name}</div>;
  };
});

jest.mock('next/link', () => {
  return ({ children, href }: any) => <a href={href}>{children}</a>;
});

jest.mock('lucide-react', () => ({
  ArrowRight: () => <span data-testid="arrow-right">→</span>,
}));

describe('Newest component', () => {
  const mockProducts = [
    { _id: '1', name: 'Product 1' },
    { _id: '2', name: 'Product 2' },
    { _id: '3', name: 'Product 3' },
    { _id: '4', name: 'Product 4' },
    { _id: '5', name: 'Product 5' },
  ];

  beforeEach(() => {
    process.env.NEXT_PUBLIC_API_BASE_URL = 'http://test-api.com';
    (require('@/lib/axios').get as jest.Mock).mockResolvedValue({ data: mockProducts });
    (require('@/lib/auth').getCurrentToken as jest.Mock).mockResolvedValue('mock-token');
  });

  it('renders the newest products section', async () => {
    render(await Newest());

    expect(screen.getByText('Our Newest products')).toBeInTheDocument();
    expect(screen.getByText('See All')).toBeInTheDocument();
    expect(screen.getByTestId('arrow-right')).toBeInTheDocument();
  });

  it('displays only the first 4 products', async () => {
    render(await Newest());

    const productCards = screen.getAllByTestId('product-card');
    expect(productCards).toHaveLength(4);
    expect(screen.getByText('Product 1')).toBeInTheDocument();
    expect(screen.getByText('Product 2')).toBeInTheDocument();
    expect(screen.getByText('Product 3')).toBeInTheDocument();
    expect(screen.getByText('Product 4')).toBeInTheDocument();
    expect(screen.queryByText('Product 5')).not.toBeInTheDocument();
  });

  it('calls the API with the correct URL and token', async () => {
    await Newest();

    expect(require('@/lib/axios').get).toHaveBeenCalledWith(
      'http://test-api.com/product/v1',
      {
        headers: {
          Authorization: 'Bearer mock-token',
        },
      }
    );
  });

  it('links to the products page', async () => {
    render(await Newest());

    const link = screen.getByText('See All').closest('a');
    expect(link).toHaveAttribute('href', '/products');
  });
});
