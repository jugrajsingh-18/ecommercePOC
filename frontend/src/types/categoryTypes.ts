import type React from "react";
import type { CartItem } from "./AuthTypes";

export interface CategoryType {
  id: number;
  name: string;
  slug: string;
  image: string;
  creationAt: string;
  updatedAt: string;
}
export interface CategoryProduct {
  category:CategoryType;
  creationAt: string;
  updatedAt: string;
  description:string;
  id:number;
  price:number;
  images :string[];
  slug:string;
  title:string;
  availableQuantity?: number;
}


export interface IncreaseDecreaseQuantity {
  item:CartItem,
  e:React.MouseEvent<HTMLButtonElement, MouseEvent>
}
