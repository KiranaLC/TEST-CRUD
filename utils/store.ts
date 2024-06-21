import { create } from 'zustand';
import { combine } from 'zustand/middleware';
import Product from '../interface/product';

const useProductStore = create(
  combine(
    {
      products: [] as Product[],
    },
    (set) => ({
      setProducts: (products: Product[]) => set({ products }),
      addProduct: (product: Product) => set((state) => ({ products: [...state.products, product] })),
      updateProduct: (product: Product) =>
        set((state) => ({
          products: state.products.map((p) => (p._id === product._id ? product : p)),
        })),
      deleteProduct: (id: string) =>
        set((state) => ({
          products: state.products.filter((p) => p._id !== id),
        })),
    })
  )
);

export default useProductStore;

