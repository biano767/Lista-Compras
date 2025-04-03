
import React from "react";
import { ShoppingItem as ShoppingItemType } from "@/types";
import { useShoppingList } from "@/context/ShoppingListContext";
import CategoryBadge from "@/components/CategoryBadge";
import { Trash2, Check, Plus, Minus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useIsMobile } from "@/hooks/use-mobile";

interface ShoppingItemProps {
  item: ShoppingItemType;
}

const ShoppingItem: React.FC<ShoppingItemProps> = ({ item }) => {
  const { toggleItem, removeItem } = useShoppingList();
  const isMobile = useIsMobile();

  // Calcular o valor total (preço unitário × quantidade)
  const totalPrice = item.price !== undefined ? item.price * item.quantity : null;
  
  // Formatar o preço total para exibição
  const formattedPrice = totalPrice 
    ? `R$ ${totalPrice.toFixed(2).replace('.', ',')}`
    : null;

  return (
    <div className={cn(
      "flex items-center justify-between p-3 rounded-lg mb-2 transition-all",
      "bg-white border shadow-sm hover:shadow",
      item.completed && "bg-gray-50 opacity-60"
    )}>
      <div className="flex items-center space-x-3">
        <Button
          onClick={() => toggleItem(item.id)}
          variant="outline"
          size="icon"
          className={cn(
            "h-6 w-6 rounded-full border-2",
            item.completed 
              ? "bg-purple-500 border-purple-500 text-white hover:bg-purple-600 hover:border-purple-600" 
              : "bg-white hover:bg-purple-50 border-gray-300"
          )}
        >
          {item.completed && <Check className="h-3 w-3" />}
        </Button>
        
        <div className="flex flex-col">
          <span className={cn(
            "text-sm font-medium",
            item.completed && "line-through text-gray-500"
          )}>
            {item.name} {item.quantity > 1 && <span className="text-gray-500">x{item.quantity}</span>}
          </span>
          <div className="flex items-center gap-2 mt-1">
            <CategoryBadge category={item.category} />
            {formattedPrice && (
              <span className="text-xs font-medium text-green-700 bg-green-50 px-2 py-0.5 rounded">
                {formattedPrice}
              </span>
            )}
          </div>
        </div>
      </div>
      
      <Button
        onClick={() => removeItem(item.id)}
        variant="ghost"
        size="icon"
        className="h-8 w-8 text-gray-400 hover:text-red-500 hover:bg-red-50"
      >
        <Trash2 className="h-4 w-4" />
      </Button>
    </div>
  );
};

export default ShoppingItem;
