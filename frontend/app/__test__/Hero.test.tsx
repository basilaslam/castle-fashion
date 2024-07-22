import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Hero from '@/components/Hero'; // Adjust the import path as necessary

// Mock the next/image component
jest.mock('next/image', () => ({
  __esModule: true,
  default: ({ src, alt, priority, ...props }: any) => {
    return <img src={src} alt={alt} {...props} data-priority={priority} />
  },
}));


describe('Hero component', () => {
  it('renders the hero section with correct content', async () => {
    render(await Hero());

    // Check if the main heading is present
    expect(screen.getByRole('heading', { name: /Top Fashion for a top price!/i })).toBeInTheDocument();

    // Check if the description paragraph is present
    expect(screen.getByText(/We sell only the most exclusive and high quality products for you./i)).toBeInTheDocument();

    // Check if both images are present
    const images = screen.getAllByRole('img');
    expect(images).toHaveLength(2);
    expect(images[0]).toHaveAttribute('src', expect.stringContaining('157675'));
    expect(images[1]).toHaveAttribute('src', expect.stringContaining('1183266'));

    // Check if the category links are present
    expect(screen.getByRole('link', { name: /T-shirts/i })).toHaveAttribute('href', '/products?query=tshirts');
    expect(screen.getByRole('link', { name: /Sweaters/i })).toHaveAttribute('href', '/products?query=sweaters');
    expect(screen.getByRole('link', { name: /Hoodies/i })).toHaveAttribute('href', '/products?query=hoodies');
  });
});