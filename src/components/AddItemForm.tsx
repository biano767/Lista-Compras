
import React, { useState } from "react";
import { Category } from "@/types";
import { useShoppingList } from "@/context/ShoppingListContext";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { Label } from "@/components/ui/label";
import { useIsMobile } from "@/hooks/use-mobile";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";

const AddItemForm: React.FC = () => {
  const { addItem } = useShoppingList();
  const { toast } = useToast();
  const [name, setName] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [price, setPrice] = useState<string>("");
  const [category, setCategory] = useState<Category>("groceries");
  const [isFormOpen, setIsFormOpen] = useState(false);
  const isMobile = useIsMobile();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!name.trim()) {
      toast({
        title: "Erro",
        description: "Por favor, digite o nome do item",
        variant: "destructive"
      });
      return;
    }
    
    // Converter o preço para número ou undefined se vazio
    // Nota: o preço armazenado é o preço unitário
    const priceNumber = price.trim() ? parseFloat(price.replace(',', '.')) : undefined;
    
    addItem(name, quantity, category, priceNumber);
    toast({
      title: "Item adicionado",
      description: `${quantity} ${name} adicionado à sua lista de compras`,
    });
    
    // Reset form
    setName("");
    setQuantity(1);
    setPrice("");
    setCategory("groceries");
    setIsFormOpen(false);
  };

  const formContent = (
    <div className="flex flex-col space-y-4">
      <Input
        type="text"
        placeholder="Nome do item"
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="flex-1"
        autoFocus
      />
      
      <div className="grid grid-cols-2 gap-2">
        <div>
          <Label htmlFor="quantity" className="text-xs mb-1 block">Quantidade</Label>
          <Input
            id="quantity"
            type="number"
            min="1"
            max="99"
            value={quantity}
            onChange={(e) => setQuantity(Number(e.target.value))}
            className="w-full"
          />
        </div>
        
        <div>
          <Label htmlFor="price" className="text-xs mb-1 block">Valor unitário (R$)</Label>
          <Input
            id="price"
            type="text"
            placeholder="0,00"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            className="w-full"
          />
        </div>
      </div>
      
      <div>
        <Label htmlFor="category" className="text-xs mb-1 block">Categoria</Label>
        <Select
          value={category}
          onValueChange={(value) => setCategory(value as Category)}
        >
          <SelectTrigger id="category">
            <SelectValue placeholder="Categoria" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="groceries">Mercado</SelectItem>
            <SelectItem value="household">Casa</SelectItem>
            <SelectItem value="electronics">Eletrônicos</SelectItem>
            <SelectItem value="clothing">Roupas</SelectItem>
            <SelectItem value="other">Outros</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );

  // Para dispositivos móveis, usamos Drawer
  if (isMobile) {
    return (
      <Drawer>
        <DrawerTrigger asChild>
          <Button 
            className="w-full bg-purple-500 hover:bg-purple-600 text-white flex items-center"
          >
            <Plus className="mr-2 h-4 w-4" /> Adicionar novo item
          </Button>
        </DrawerTrigger>
        <DrawerContent>
          <form onSubmit={handleSubmit}>
            <DrawerHeader>
              <DrawerTitle>Adicionar item</DrawerTitle>
              <DrawerDescription>Preencha os detalhes do novo item para sua lista de compras.</DrawerDescription>
            </DrawerHeader>
            
            <div className="px-4">
              {formContent}
            </div>
            
            <DrawerFooter className="pt-2">
              <Button type="submit" className="bg-purple-500 hover:bg-purple-600">
                Adicionar item
              </Button>
              <DrawerClose asChild>
                <Button variant="outline">Cancelar</Button>
              </DrawerClose>
            </DrawerFooter>
          </form>
        </DrawerContent>
      </Drawer>
    );
  }

  // Para desktop, mantemos o comportamento original
  if (!isFormOpen) {
    return (
      <Button 
        onClick={() => setIsFormOpen(true)}
        className="w-full bg-purple-500 hover:bg-purple-600 text-white flex items-center"
      >
        <Plus className="mr-2 h-4 w-4" /> Adicionar novo item
      </Button>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="p-4 bg-white border rounded-lg shadow-sm mb-4">
      {formContent}
      
      <div className="flex space-x-2 mt-4">
        <Button
          type="button"
          variant="outline"
          onClick={() => setIsFormOpen(false)}
          className="flex-1"
        >
          Cancelar
        </Button>
        <Button type="submit" className="flex-1 bg-purple-500 hover:bg-purple-600">
          Adicionar
        </Button>
      </div>
    </form>
  );
};

export default AddItemForm;
