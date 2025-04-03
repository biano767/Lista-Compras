
import React from "react";
import { Badge } from "@/components/ui/badge";
import { Category } from "@/types";
import { ShoppingBag, Home, Laptop, Shirt, Package } from "lucide-react";

interface CategoryBadgeProps {
  category: Category;
}

const CategoryBadge: React.FC<CategoryBadgeProps> = ({ category }) => {
  const getCategoryDetails = (category: Category) => {
    switch (category) {
      case "groceries":
        return { icon: <ShoppingBag className="w-3 h-3 mr-1" />, color: "bg-emerald-100 text-emerald-800 hover:bg-emerald-100", label: "Mercado" };
      case "household":
        return { icon: <Home className="w-3 h-3 mr-1" />, color: "bg-blue-100 text-blue-800 hover:bg-blue-100", label: "Casa" };
      case "electronics":
        return { icon: <Laptop className="w-3 h-3 mr-1" />, color: "bg-amber-100 text-amber-800 hover:bg-amber-100", label: "Eletrônicos" };
      case "clothing":
        return { icon: <Shirt className="w-3 h-3 mr-1" />, color: "bg-purple-100 text-purple-800 hover:bg-purple-100", label: "Roupas" };
      default:
        return { icon: <Package className="w-3 h-3 mr-1" />, color: "bg-gray-100 text-gray-800 hover:bg-gray-100", label: "Outros" };
    }
  };

  const { icon, color, label } = getCategoryDetails(category);

  return (
    <Badge variant="outline" className={`${color} flex items-center`}>
      {icon}
      {label}
    </Badge>
  );
};

export default CategoryBadge;
