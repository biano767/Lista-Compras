
import React, { createContext, useContext, useState, ReactNode, useEffect } from "react";
import { ShoppingItem, Category } from "@/types";

interface ShoppingListContextType {
  items: ShoppingItem[];
  addItem: (name: string, quantity: number, category: Category, price?: number) => void;
  toggleItem: (id: string) => void;
  removeItem: (id: string) => void;
  clearCompletedItems: () => void;
}

const ShoppingListContext = createContext<ShoppingListContextType | undefined>(undefined);

// Chave para armazenar no localStorage
const STORAGE_KEY = "shopping-list-items";

// Dados iniciais para quando não houver nada no localStorage
const initialItems: ShoppingItem[] = [
  { id: "1", name: "Leite", quantity: 1, category: "groceries", completed: false, price: 5.99 },
  { id: "2", name: "Pão", quantity: 2, category: "groceries", completed: false, price: 4.50 },
  { id: "3", name: "Sabonete", quantity: 1, category: "household", completed: false, price: 3.25 },
  { id: "4", name: "Pilhas", quantity: 4, category: "electronics", completed: false, price: 12.90 },
];

export const ShoppingListProvider = ({ children }: { children: ReactNode }) => {
  // Inicializa o estado com os itens do localStorage ou com os itens iniciais
  const [items, setItems] = useState<ShoppingItem[]>(() => {
    try {
      const storedItems = localStorage.getItem(STORAGE_KEY);
      return storedItems ? JSON.parse(storedItems) : initialItems;
    } catch (error) {
      console.error("Erro ao carregar dados do localStorage:", error);
      return initialItems;
    }
  });

  // Salva os itens no localStorage sempre que houver mudanças
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    } catch (error) {
      console.error("Erro ao salvar dados no localStorage:", error);
    }
  }, [items]);

  const addItem = (name: string, quantity: number, category: Category, price?: number) => {
    const newItem: ShoppingItem = {
      id: Date.now().toString(),
      name,
      quantity, 
      category,
      completed: false,
      price,
    };
    setItems([...items, newItem]);
  };

  const toggleItem = (id: string) => {
    setItems(
      items.map((item) =>
        item.id === id ? { ...item, completed: !item.completed } : item
      )
    );
  };

  const removeItem = (id: string) => {
    setItems(items.filter((item) => item.id !== id));
  };

  const clearCompletedItems = () => {
    setItems(items.filter((item) => !item.completed));
  };

  return (
    <ShoppingListContext.Provider
      value={{
        items,
        addItem,
        toggleItem,
        removeItem,
        clearCompletedItems,
      }}
    >
      {children}
    </ShoppingListContext.Provider>
  );
};

export const useShoppingList = () => {
  const context = useContext(ShoppingListContext);
  if (context === undefined) {
    throw new Error("useShoppingList must be used within a ShoppingListProvider");
  }
  return context;
};
