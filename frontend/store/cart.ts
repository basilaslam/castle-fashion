import { IProduct } from '@/types/interfaces';
import { create } from 'zustand';
interface CartState {
  cart: IProduct[];
  showCart: boolean;
  cartCount: number;
  totalPrice: number;
  addToCart: (product: IProduct) => void;
  removeFromCart: (id: string) => void;
  setShowCart: (show: boolean) => void;
}

const useCartStore = create<CartState>((set, get) => ({
  cart: [],
  showCart: false,
  cartCount: 0,
  totalPrice: 0,
  addToCart: (product) => {
    const cart = get().cart;
    const existingProduct = cart.find((item) => item._id === product._id);
    let updatedCart;

    if (existingProduct) {
      updatedCart = cart.map((item) =>
        item._id === product._id
          ? { ...item, quantity: item.quantity + 1 }
          : item
      );
    } else {
      updatedCart = [...cart, { ...product, quantity: 1 }];
    }

    const totalPrice = updatedCart.reduce(
      (acc, item) => acc + item.price * item.quantity,
      0
    );
    const cartCount = updatedCart.reduce((acc, item) => acc + item.quantity, 0);

    set({ cart: updatedCart, totalPrice, cartCount });
  },
  removeFromCart: (id) => {
    const cart = get().cart;
    const updatedCart = cart.filter((item) => item._id !== id);
    const totalPrice = updatedCart.reduce(
      (acc, item) => acc + item.price * item.quantity,
      0
    );
    const cartCount = updatedCart.reduce((acc, item) => acc + item.quantity, 0);

    set({ cart: updatedCart, totalPrice, cartCount });
  },
  setShowCart: (show) => set({ showCart: show }),
}));

export default useCartStore;
