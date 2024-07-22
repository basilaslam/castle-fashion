// components/__tests__/ProductCard.test.tsx

import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import ProductCard from '@/components/ProductCard';
import useCartStore from '@/store/cart';
import { toast } from 'sonner';
import { IProduct } from '@/types/interfaces';

// Mock the dependencies
jest.mock('next/image', () => ({
  __esModule: true,
  default: (props: any) => {
    return <img {...props} />;
  },
}));

jest.mock('@/store/cart', () => ({
  __esModule: true,
  default: jest.fn(),
}));

jest.mock('sonner', () => ({
  toast: {
    success: jest.fn(),
  },
}));

jest.mock('next/link', () => {
  return ({ children, href }: any) => <a href={href}>{children}</a>;
});

describe('ProductCard component', () => {
  const mockProduct = {
    _id: '1',
    name: 'Test Product',
    description: 'This is a test product',
    price: 19.99,
    image1: '/test-image.jpg',
    image2: '/test-image.jpg',
    image3: '/test-image.jpg',
    category: 'Test Category',
    createdAt: '2022-01-01',
    quantity: 10
  } satisfies IProduct;

  beforeEach(() => {
    (useCartStore as unknown as jest.Mock).mockReturnValue({
      addToCart: jest.fn(),
    });
  });

  it('renders the product card with correct information', () => {
    render(<ProductCard product={mockProduct} />);

    expect(screen.getByText('Test Product')).toBeInTheDocument();
    expect(screen.getByText('This is a test product')).toBeInTheDocument();
    expect(screen.getByText('$19.99')).toBeInTheDocument();
    expect(screen.getByRole('img')).toHaveAttribute('src', '/test-image.jpg');
    expect(screen.getByRole('button', { name: 'Add to Cart' })).toBeInTheDocument();
  });

  it('links to the product detail page', () => {
    render(<ProductCard product={mockProduct} />);

    const productLink = screen.getByText('Test Product').closest('a');
    expect(productLink).toHaveAttribute('href', '/products/1');
  });

  it('adds the product to cart when "Add to Cart" button is clicked', () => {
    const addToCart = jest.fn();
    (useCartStore as unknown as jest.Mock).mockReturnValue({ addToCart });

    render(<ProductCard product={mockProduct} />);

    const addToCartButton = screen.getByRole('button', { name: 'Add to Cart' });
    fireEvent.click(addToCartButton);

    expect(addToCart).toHaveBeenCalledWith(mockProduct);
    expect(toast.success).toHaveBeenCalledWith('Product added to cart');
  });

  it('truncates long product names', () => {
    const longNameProduct = {
      ...mockProduct,
      name: 'This is a very long product name that should be truncated',
    };

    render(<ProductCard product={longNameProduct} />);

    const productName = screen.getByText(/This is a very long product name/);
    expect(productName).toHaveClass('line-clamp-1');
  });

  it('truncates long product descriptions', () => {
    const longDescriptionProduct = {
      ...mockProduct,
      description: 'This is a very long product description that should be truncated. '.repeat(10),
    };

    render(<ProductCard product={longDescriptionProduct} />);

    const productDescription = screen.getByText(/This is a very long product description/);
    expect(productDescription).toHaveClass('line-clamp-2');
  });
});