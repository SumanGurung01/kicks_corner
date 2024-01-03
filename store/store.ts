"use client";

import { create } from "zustand";

export const zustandStore = create((set) => ({
  cart: JSON.parse(localStorage.getItem("cart")) || [],
  setCart: (item) => set((state) => ({ cart: item })),
}));
