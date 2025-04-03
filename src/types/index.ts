
export type Category = 
  | "groceries" 
  | "household" 
  | "electronics" 
  | "clothing" 
  | "other";

export interface ShoppingItem {
  id: string;
  name: string;
  quantity: number;
  category: Category;
  completed: boolean;
  price?: number; // Adicionando campo de preço como opcional
}
