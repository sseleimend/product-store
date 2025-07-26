import { create } from "zustand";

export interface Product {
  name: string;
  price: number;
  image: string;
  _id?: string;
}

interface ProductStore {
  products: Product[];
  setProducts: (products: Product[]) => void;
  createProduct: (newProduct: Product) => Promise<{
    success: boolean;
    message: string;
  }>;
  fetchProducts: () => void;
  deleteProduct: (id: string) => Promise<{
    success: boolean;
    message: string;
  }>;
  updateProduct: (product: Product) => Promise<{
    success: boolean;
    message: string;
  }>;
}

export const useProductStore = create<ProductStore>((set) => ({
  products: [],
  setProducts: (products: Product[]) => set({ products }),
  createProduct: async (newProduct: Product) => {
    if (!newProduct.name || !newProduct.image || !newProduct.price) {
      return { success: false, message: "Please fill in all fields" };
    }
    const res = await fetch("/api/products", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newProduct),
    });
    const data = await res.json();
    set((state) => ({
      products: [...state.products, data.data],
    }));
    return { success: true, message: "Product created successfully" };
  },
  fetchProducts: async () => {
    const res = await fetch("api/products");
    const data = await res.json();
    set({ products: data.data });
  },
  deleteProduct: async (id) => {
    const res = await fetch(`/api/products/${id}`, {
      method: "DELETE",
    });
    const data = await res.json();
    if (!data.success) return { success: false, message: data.message };

    set((state) => ({ products: state.products.filter((p) => p._id !== id) }));

    return { success: true, message: data.message };
  },
  updateProduct: async (product) => {
    console.log(product);
    const res = await fetch(`/api/products/${product._id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: product.name,
        image: product.image,
        price: product.price,
      }),
    });
    const data = await res.json();
    if (!data.success) return { success: false, message: data.message };

    set((state) => ({
      products: state.products.map((p) =>
        p._id === product._id ? data.data : p
      ),
    }));

    return { success: true, message: data.message };
  },
}));
