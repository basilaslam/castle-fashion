// components/__tests__/Loader.test.tsx

import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Loader from '@/components/Loader';

// Mock the Loader2Icon from lucide-react
jest.mock('lucide-react', () => ({
  Loader2Icon: () => <div data-testid="loader-icon" className='w-10 h-10 animate-spin'/>
}));

describe('Loader component', () => {
  it('renders the loader with correct styling', () => {
    render(<Loader />);

    // Check if the main div is present with correct classes
    const loaderDiv = screen.getByTestId('loader-container');
    expect(loaderDiv).toBeInTheDocument();
    expect(loaderDiv).toHaveClass('fixed inset-0 flex items-center justify-center bg-white bg-opacity-50 z-50');

    // Check if the Loader2Icon is present
    const loaderIcon = screen.getByTestId('loader-icon');
    expect(loaderIcon).toBeInTheDocument();

    // Check if the Loader2Icon has the correct classes
    expect(loaderIcon).toHaveClass('w-10 h-10 animate-spin');
  });
});