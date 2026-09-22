export type AuthMode = "login" | "register"
export type CartItem = {
  description:string;
  id:number;
  price:number;
  images :string[];
  slug:string;
  title:string;
  quantity: number;
  cartItemId?: number;
  availableQuantity?: number;
};

export type User = {
  id: string;
  name: string;
  email: string;
  password:string;
  cart: CartItem[];
};