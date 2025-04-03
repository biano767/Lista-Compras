
import React, { useState } from "react";
import { useShoppingList } from "@/context/ShoppingListContext";
import ShoppingItem from "@/components/ShoppingItem";
import AddItemForm from "@/components/AddItemForm";
import { Button } from "@/components/ui/button";
import { ShoppingBag, Filter, CheckCheck } from "lucide-react";
import { Category } from "@/types";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useIsMobile } from "@/hooks/use-mobile";
import { ScrollArea } from "@/components/ui/scroll-area";

const Index = () => {
  const { items, clearCompletedItems } = useShoppingList();
  const [filterCategory, setFilterCategory] = useState<Category | "all">("all");
  const [showFilters, setShowFilters] = useState(false);
  const isMobile = useIsMobile();

  const completedItems = items.filter((item) => item.completed);
  const activeItems = items.filter((item) => !item.completed);
  const hasCompletedItems = completedItems.length > 0;

  const filteredItems = items.filter(
    (item) => filterCategory === "all" || item.category === filterCategory
  );

  const categories: Array<{ value: Category | "all"; label: string }> = [
    { value: "all", label: "Todos" },
    { value: "groceries", label: "Mercado" },
    { value: "household", label: "Casa" },
    { value: "electronics", label: "Eletrônicos" },
    { value: "clothing", label: "Roupas" },
    { value: "other", label: "Outros" },
  ];

  const renderShoppingList = (items: typeof filteredItems) => {
    if (items.length === 0) {
      return (
        <div className="py-10 text-center">
          <ShoppingBag className="h-12 w-12 mx-auto text-gray-300 mb-2" />
          <p className="text-gray-500">Sua lista de compras está vazia</p>
        </div>
      );
    }

    return items.map((item) => <ShoppingItem key={item.id} item={item} />);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className={`mx-auto p-4 ${isMobile ? 'w-full' : 'max-w-md'}`}>
        <div className="flex justify-between items-center mb-6">
          <h1 className="font-bold text-xl sm:text-2xl flex items-center">
            <ShoppingBag className="mr-2 h-5 w-5 sm:h-6 sm:w-6 text-purple-500" />
            Lista de Compras
          </h1>
          <Button
            variant="ghost"
            size="sm"
            className="text-gray-500"
            onClick={() => setShowFilters(!showFilters)}
          >
            <Filter className="h-4 w-4 mr-1" />
            Filtrar
          </Button>
        </div>

        {showFilters && (
          <div className="mb-4 bg-gray-50 p-3 rounded-lg">
            <p className="text-sm text-gray-500 mb-2">Filtrar por categoria:</p>
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <Badge
                  key={category.value}
                  variant={filterCategory === category.value ? "default" : "outline"}
                  className="cursor-pointer"
                  onClick={() => setFilterCategory(category.value)}
                >
                  {category.label}
                </Badge>
              ))}
            </div>
          </div>
        )}

        <AddItemForm />

        <ScrollArea className={`mt-4 ${isMobile ? 'h-[calc(100vh-240px)]' : ''}`}>
          <Tabs defaultValue="active" className="mt-4">
            <TabsList className="grid grid-cols-2 mb-4 sticky top-0 bg-gray-50 z-10">
              <TabsTrigger value="active" className="relative">
                Ativos
                {activeItems.length > 0 && (
                  <Badge className="ml-2 bg-purple-500">{activeItems.length}</Badge>
                )}
              </TabsTrigger>
              <TabsTrigger value="completed" className="relative">
                Concluídos
                {completedItems.length > 0 && (
                  <Badge className="ml-2 bg-gray-500">{completedItems.length}</Badge>
                )}
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="active" className="space-y-2">
              {renderShoppingList(filteredItems.filter(item => !item.completed))}
            </TabsContent>
            
            <TabsContent value="completed" className="space-y-2">
              {hasCompletedItems && (
                <Button
                  variant="outline"
                  size="sm"
                  className="mb-2 text-gray-500 w-full border-dashed"
                  onClick={clearCompletedItems}
                >
                  <CheckCheck className="h-4 w-4 mr-1" /> Limpar itens concluídos
                </Button>
              )}
              {renderShoppingList(filteredItems.filter(item => item.completed))}
            </TabsContent>
          </Tabs>
        </ScrollArea>
      </div>
    </div>
  );
};

export default Index;
