// components/__tests__/Navbar.test.tsx

import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import Navbar from '@/components/Navbar';
import { useSession } from 'next-auth/react';
import { usePathname } from 'next/navigation';
import useCartStore from '@/store/cart';

// Mock the dependencies
jest.mock('next-auth/react', () => ({
  useSession: jest.fn(),
  signOut: jest.fn(),
}));
jest.mock('next/navigation', () => ({
  usePathname: jest.fn(),
}));
jest.mock('@/store/cart', () => ({
  __esModule: true,
  default: jest.fn(),
}));
jest.mock('next/link', () => {
  return ({ children, href }: any) => <a href={href}>{children}</a>;
});

// Mock the UI components
jest.mock('@/components/ui/badge', () => ({
  Badge: ({ children }: any) => <span data-testid="badge">{children}</span>,
}));
jest.mock('@/components/ui/dropdown-menu', () => ({
  DropdownMenu: ({ children }: any) => <div data-testid="dropdown-menu">{children}</div>,
  DropdownMenuTrigger: ({ children }: any) => <div data-testid="dropdown-trigger">{children}</div>,
  DropdownMenuContent: ({ children }: any) => <div data-testid="dropdown-content">{children}</div>,
  DropdownMenuItem: ({ children }: any) => <div data-testid="dropdown-item">{children}</div>,
  DropdownMenuSeparator: () => <hr data-testid="dropdown-separator" />,
}));
jest.mock('@/components/ui/avatar', () => ({
  Avatar: ({ children }: any) => <div data-testid="avatar">{children}</div>,
  AvatarImage: ({ src }: any) => <img src={src} alt="avatar" data-testid="avatar-image" />,
  AvatarFallback: ({ children }: any) => <div data-testid="avatar-fallback">{children}</div>,
}));

describe('Navbar component', () => {
  beforeEach(() => {
    (usePathname as jest.Mock).mockReturnValue('/');
    (useCartStore as unknown as jest.Mock).mockReturnValue({
      setShowCart: jest.fn(),
      showCart: false,
      cartCount: 0,
    });
  });

  it('renders the navbar with logo and links', () => {
    (useSession as jest.Mock).mockReturnValue({ data: null });

    render(<Navbar />);

    expect(screen.getByText('Castle Fashion')).toBeInTheDocument();
    expect(screen.getByText('Home')).toBeInTheDocument();
    expect(screen.getByText('All')).toBeInTheDocument();
    expect(screen.getByText('Hoodies')).toBeInTheDocument();
    expect(screen.getByText('T-shirts')).toBeInTheDocument();
    expect(screen.getByText('Sweaters')).toBeInTheDocument();
  });

  it('displays login and signup buttons when user is not authenticated', () => {
    (useSession as jest.Mock).mockReturnValue({ data: null });

    render(<Navbar />);

    expect(screen.getByText('Login')).toBeInTheDocument();
    expect(screen.getByText('Signup')).toBeInTheDocument();
  });

  it('displays user dropdown when user is authenticated', () => {
    (useSession as jest.Mock).mockReturnValue({
      data: { user: { token: 'mock-token', email: 'user@example.com' } },
    });

    render(<Navbar />);

    expect(screen.getByTestId('avatar')).toBeInTheDocument();
    expect(screen.queryByText('Login')).not.toBeInTheDocument();
    expect(screen.queryByText('Signup')).not.toBeInTheDocument();
  });

  it('displays correct cart count', () => {
    (useSession as jest.Mock).mockReturnValue({ data: null });
    (useCartStore as unknown as jest.Mock).mockReturnValue({
      setShowCart: jest.fn(),
      showCart: false,
      cartCount: 5,
    });

    render(<Navbar />);

    expect(screen.getByTestId('badge')).toHaveTextContent('5');
  });

  it('toggles cart visibility on cart icon click', () => {
    const setShowCart = jest.fn();
    (useSession as jest.Mock).mockReturnValue({ data: null });
    (useCartStore as unknown as jest.Mock).mockReturnValue({
      setShowCart,
      showCart: false,
      cartCount: 0,
    });

    render(<Navbar />);

    fireEvent.click(screen.getByTestId('badge').parentElement!);
    expect(setShowCart).toHaveBeenCalledWith(true);
  });
});