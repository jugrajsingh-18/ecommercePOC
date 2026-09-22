/* eslint-disable react-refresh/only-export-components */
import { createContext, useState, useContext, useEffect } from "react";
import type { CartItem, User } from "../types/AuthTypes";

import * as authApi from "../api/authApi";
import * as cartApi from "../api/cartApi";

interface BackendUser {
  id: string;
  username: string;
  email: string;
  role: string;
}

interface AuthContextType {
  users: User[];
  currentUser: User | null;
  backendUser: BackendUser | null;
  addUser: (user: User) => void;
  loginUser: (data: User) => { status: number; message: string };
  addToCart: (item: CartItem) => Promise<{ status: number; message: string }>;
  registerUser: (data: User) => { status: number; message: string };
  handleLogout: () => void;
  cartCount: number;
  removeItem: (id: string) => void;
  totalValue: number;
  backendLogin: (data: { email: string; password: string }) => Promise<{ status: number; message: string }>;
  backendRegister: (data: { username: string; email: string; password: string }) => Promise<{ status: number; message: string }>;
  clearCart: () => void;
  isLoading: boolean;
}
const AuthContext = createContext<AuthContextType | undefined>(undefined);
const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [users, setUsers] = useState<User[]>(() => {
    const storedUsers = localStorage.getItem("allUsers");
    return storedUsers ? JSON.parse(storedUsers) : [];
  });
  const [currentUser, setCurrentUser] = useState<User | null>(() => {
    const storedUser = localStorage.getItem("currentUser");
    return storedUser ? JSON.parse(storedUser) : null;
  });
  const cartCount = currentUser?.cart?.reduce((sum, item) => sum + item.quantity, 0) || 0;
  const totalValue = currentUser?.cart?.reduce((sum, item) => sum + item.quantity * item.price, 0) || 0;

  const [backendUser, setBackendUser] = useState<BackendUser | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const fetchCart = async () => {
    try {
      const data = await cartApi.getCart();
      // map backend cart item to frontend expected structure
      const formattedCart = data.map((item: { product: Omit<CartItem, 'cartItemId' | 'quantity'>; id: number; quantity: number }) => ({
        ...item.product,
        cartItemId: item.id,
        quantity: item.quantity
      }));
      
      setCurrentUser((prev: User | null) => {
        if (!prev) return prev;
        const updatedUser = { ...prev, cart: formattedCart };
        localStorage.setItem("currentUser", JSON.stringify(updatedUser));
        return updatedUser;
      });
      
    } catch (e) {
      console.error("Failed to fetch cart", e);
    }
  };

  // On mount, try to restore session from backend cookie
  useEffect(() => {
    const restoreSession = async () => {
      try {
        const user = await authApi.getMe();
        setBackendUser(user);
        
        // Also set currentUser for cart compatibility
        const storedUser = localStorage.getItem("currentUser");
        const localUser: User = {
          id: user.id,
          name: user.username,
          email: user.email,
          password: '',
          cart: [],
        };
        
        if (storedUser) {
           const parsed = JSON.parse(storedUser);
           if (parsed.email === user.email) {
             setCurrentUser(parsed);
           } else {
             setCurrentUser(localUser);
           }
        } else {
           setCurrentUser(localUser);
        }
        
        await fetchCart();
      } catch {
        // Not logged in or token expired
        setBackendUser(null);
      } finally {
        setIsLoading(false);
      }
    };
    restoreSession();
  }, []);

  // fetchCart moved above where it is used

  useEffect(() => {
    localStorage.setItem("allUsers", JSON.stringify(users));
  }, [users]);

  useEffect(() => {
    if (currentUser) {
      localStorage.setItem("currentUser", JSON.stringify(currentUser));
    }
  }, [currentUser]);

  const addUser = (newUser: User) => {
    const userWithCart = {
      ...newUser,
      cart: newUser.cart || [],
    };

    setUsers((prev) => [...prev, userWithCart]);
  };

  const loginUser = (user: User) => {
    const LoginUserData = users.find(u => u.email == user.email && u.password == user.password);
    if (!LoginUserData) {
      return { status: 404, message: "User with this credentials not found." }
    }
    setCurrentUser(LoginUserData);
    return { status: 200, message: "Login successful!" }


  };

  // Backend login
  const backendLogin = async (data: { email: string; password: string }): Promise<{ status: number; message: string }> => {
    try {
      await authApi.loginUser(data);
      const user = await authApi.getMe();
      setBackendUser(user);
      
      const localUser: User = {
        id: user.id,
        name: user.username,
        email: user.email,
        password: '',
        cart: [],
      };
      setCurrentUser(localUser);
      
      // Fetch user's cart from backend
      await fetchCart();
      
      return { status: 200, message: "Login successful!" };
    } catch (error: unknown) {
      const err = error as { response?: { data?: { message?: string }, status?: number } };
      const msg = err?.response?.data?.message || "Invalid credentials.";
      return { status: err?.response?.status || 500, message: msg };
    }
  };

  // Backend register
  const backendRegister = async (data: { username: string; email: string; password: string }): Promise<{ status: number; message: string }> => {
    try {
      await authApi.registerUser(data);
      const user = await authApi.getMe();
      setBackendUser(user);
      const localUser: User = {
        id: user.id,
        name: user.username,
        email: user.email,
        password: '',
        cart: [],
      };
      setCurrentUser(localUser);
      setUsers((prev) => [...prev, localUser]);
      await fetchCart();
      return { status: 200, message: "User registered successfully!" };
    } catch (error: unknown) {
      const err = error as { response?: { data?: { message?: string }, status?: number } };
      const msg = err?.response?.data?.message || "Registration failed.";
      return { status: err?.response?.status || 500, message: msg };
    }
  };
  
  const registerUser = (userData: User) => {
    if (users.find(u => u.email == userData.email)) {
      return { status: 409, message: "Email is already registered!" }
    }
    const newUser = {
      ...userData,
      cart: [],
    };

    setUsers((prev) => [...prev, newUser]);

    setCurrentUser(newUser);
    return { status: 200, message: "User registered successfully!" }
  };

  const handleLogout = async () => {
    try {
      await authApi.logoutUser();
    } catch (e) {
      console.error("Logout failed", e);
    }
    localStorage.removeItem('currentUser')
    setCurrentUser(null)
    setBackendUser(null)
  }

  const addToCart = async (item: CartItem): Promise<{ status: number; message: string }> => {
    if (!currentUser) {
      return { status: 400, message: "Unauthorized,please login." }
    };
    
    // Add logic to handle adding vs decreasing vs removing if needed
    // Wait, the frontend triggers addToCart with negative quantity to decrease. Let's fix that.
    const existingItem = currentUser.cart.find((it: CartItem) => it.id === item.id);
    
    try {
      if (item.quantity > 0) {
        await cartApi.addToCartApi({ productId: item.id, quantity: item.quantity });
      } else if (item.quantity < 0 && existingItem) {
        const newQuant = existingItem.quantity + item.quantity; // item.quantity is negative
        if (newQuant > 0) {
          await cartApi.updateCartItemQuantity(existingItem.cartItemId!, newQuant);
        } else {
          await cartApi.removeCartItem(existingItem.cartItemId!);
        }
      }
      await fetchCart();
      return { status: 200, message: "Cart updated." };
    } catch (e: unknown) {
      const err = e as { response?: { data?: { message?: string } } };
      return { status: 400, message: err.response?.data?.message || "Failed to update cart." };
    }
  };

const removeItem = async (id: string) => {
  if (!currentUser) return;
  const existingItem = currentUser.cart.find((it: CartItem) => it.id === Number(id));
  if (!existingItem) return;
  
  try {
    await cartApi.removeCartItem(existingItem.cartItemId!);
    await fetchCart();
  } catch (e) {
    console.error("Failed to remove item", e);
  }
};

const clearCart = async () => {
  if (!currentUser) return;
  try {
    await cartApi.clearCartApi();
    await fetchCart();
  } catch (e) {
    console.error("Failed to clear cart", e);
  }
};
  return (
    <AuthContext.Provider
      value={{
        users,
        currentUser,
        backendUser,
        addUser,
        loginUser,
        addToCart,
        registerUser,
        handleLogout,
        cartCount,
        removeItem,
        totalValue,
        backendLogin,
        backendRegister,
        clearCart,
        isLoading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// export const useAuth = () => useContext(AuthContext);
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export default AuthProvider;