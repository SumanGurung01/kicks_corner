import { Order } from "@/typing";
import { create } from "zustand";

interface AppState {
  cart: Order[];
  setCart: (item: Order[]) => void;
}

export const useStore = create<AppState>((set) => ({
  cart: [],
  setCart: (item: Order[]) => set(() => ({ cart: item })),
}));
