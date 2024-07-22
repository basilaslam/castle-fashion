import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Footer from '@/components/Footer'; // Adjust the import path as necessary

// Mock the next/link component


describe('Footer component', () => {
  it('renders the footer with correct content', () => {
    render(<Footer />);

    // Check if the Castle Fashion text is present
    expect(screen.getByText('Castle Fashion')).toBeInTheDocument();

    // Check if all navigation links are present
    const navLinks = ['Home', 'Shop', 'About', 'Contact'];
    navLinks.forEach(linkText => {
      const link = screen.getByRole('link', { name: linkText });
      expect(link).toBeInTheDocument();
      expect(link).toHaveAttribute('href', '#');
    });

    // Check if the copyright text is present
    expect(screen.getByText(/© 2024 Castle Fashion. All rights reserved./)).toBeInTheDocument();

    // Check if the CastleIcon is rendered
    const castleIcon = screen.getByTestId('castle-icon');
    expect(castleIcon).toBeInTheDocument();
  });
});