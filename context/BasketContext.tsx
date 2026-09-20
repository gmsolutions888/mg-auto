"use client";

import { createContext, useContext, useEffect, useState } from "react";

export interface BasketCar {
  id: string;
  slug: string;
  brand: string;
  model: string;
  year: number;
  sellingPrice: number;
  photoUrl?: string;
}

export interface BasketCustomization {
  colorPreference: string;
  financingInterest: boolean;
  notes: string;
}

export interface BasketItem {
  car: BasketCar;
  customization: BasketCustomization;
}

interface BasketContextValue {
  item: BasketItem | null;
  addToBasket: (car: BasketCar) => void;
  removeFromBasket: () => void;
  updateCustomization: (c: Partial<BasketCustomization>) => void;
}

const defaultCustomization: BasketCustomization = {
  colorPreference: "",
  financingInterest: false,
  notes: "",
};

const BasketContext = createContext<BasketContextValue>({
  item: null,
  addToBasket: () => {},
  removeFromBasket: () => {},
  updateCustomization: () => {},
});

export function BasketProvider({ children }: { children: React.ReactNode }) {
  const [item, setItem] = useState<BasketItem | null>(null);

  // Load from localStorage on mount
  useEffect(() => {
    try {
      const saved = localStorage.getItem("mg_basket");
      if (saved) setItem(JSON.parse(saved));
    } catch {}
  }, []);

  // Persist to localStorage on change
  useEffect(() => {
    if (item) localStorage.setItem("mg_basket", JSON.stringify(item));
    else localStorage.removeItem("mg_basket");
  }, [item]);

  const addToBasket = (car: BasketCar) => {
    setItem({ car, customization: defaultCustomization });
  };

  const removeFromBasket = () => setItem(null);

  const updateCustomization = (c: Partial<BasketCustomization>) => {
    setItem((prev) =>
      prev ? { ...prev, customization: { ...prev.customization, ...c } } : prev
    );
  };

  return (
    <BasketContext.Provider value={{ item, addToBasket, removeFromBasket, updateCustomization }}>
      {children}
    </BasketContext.Provider>
  );
}

export function useBasket() {
  return useContext(BasketContext);
}
