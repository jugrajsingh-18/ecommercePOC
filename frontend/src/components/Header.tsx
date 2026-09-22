import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/Authcontext";
import AuthDialog from "./Auth";

import { toast } from "sonner";
import { useState, useEffect, useRef } from "react";
import {
  getProducts,
  defaultImage,
  checkInvalidImageOrNot,
} from "../api/product";
import type { CategoryProduct } from "../types/categoryTypes";
import {
  Shield,
  ShoppingCart,
  LogOut,
  User as UserIcon,
  Package,
  Search,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { ThemeToggle } from "./ThemeToggle";
import { NotificationDropdown } from "./NotificationDropdown";

export default function Header() {
  const { currentUser, handleLogout, cartCount, backendUser } = useAuth();
  const navigate = useNavigate();

  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<CategoryProduct[]>([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const [isSearching, setIsSearching] = useState(false);
  const searchRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        searchRef.current &&
        !searchRef.current.contains(event.target as Node)
      ) {
        setShowDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    if (searchQuery.trim().length >= 2) {
      setIsSearching(true);
      const timeoutId = setTimeout(async () => {
        try {
          const res = await getProducts(searchQuery);
          setSearchResults(res.data);
          setShowDropdown(true);
        } catch (error) {
          console.error("Search error", error);
        } finally {
          setIsSearching(false);
        }
      }, 300);
      return () => clearTimeout(timeoutId);
    } else {
      setSearchResults([]);
      setShowDropdown(false);
    }
  }, [searchQuery]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setShowDropdown(false);
    if (searchQuery.trim()) {
      navigate(`/?search=${encodeURIComponent(searchQuery)}`);
    } else {
      navigate("/");
    }
  };

  const userInitial = currentUser?.name ? (
    currentUser.name.charAt(0).toUpperCase()
  ) : (
    <UserIcon className="w-5 h-5" />
  );

  return (
    <header className="sticky top-0 z-30 bg-background/95 backdrop-blur shadow-sm border-b border-border flex justify-between items-center px-10 py-4 supports-backdrop-filter:bg-background/60">
      <Link to="/">
        <div
          className="text-2xl font-bold cursor-pointer bg-primary text-primary-foreground p-2 rounded-md
  transform transition-all duration-200 hover:-translate-y-1 hover:scale-105"
        >
          MarketHub
        </div>
      </Link>

      <form
        ref={searchRef}
        onSubmit={handleSearch}
        className="relative hidden md:flex items-center flex-1 max-w-md mx-6"
      >
        <input
          type="search"
          placeholder="Search products..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          onFocus={() => {
            if (searchQuery.trim().length >= 2) setShowDropdown(true);
          }}
          className="w-full pl-4 pr-10 py-2 rounded-full border border-border bg-background/50 focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
        />
        <button
          type="submit"
          className="absolute right-3 text-muted-foreground hover:text-foreground cursor-pointer"
        >
          <Search className="w-5 h-5" />
        </button>

        {showDropdown && (
          <div className="absolute top-full mt-2 w-full bg-background border border-border rounded-lg shadow-lg z-50 overflow-y-auto max-h-96">
            {isSearching ? (
              <div className="p-4 text-center text-sm text-muted-foreground">
                Searching...
              </div>
            ) : searchResults.length > 0 ? (
              searchResults.map((product) => (
                <div
                  key={product.id}
                  className="flex items-center gap-3 p-3 hover:bg-muted cursor-pointer transition-colors border-b border-border last:border-b-0"
                  onClick={() => {
                    navigate(`/product/${product.id}`);
                    setShowDropdown(false);
                    setSearchQuery("");
                  }}
                >
                  <img
                    src={
                      product.images &&
                      product.images.length > 0 &&
                      !checkInvalidImageOrNot(product.images[0])
                        ? product.images[0]
                        : defaultImage
                    }
                    alt={product.title}
                    className="w-12 h-12 object-cover rounded-md flex-shrink-0 bg-muted"
                  />
                  <div className="flex flex-col flex-1 min-w-0">
                    <span className="text-sm font-medium text-foreground truncate">
                      {product.title}
                    </span>
                    <span className="text-xs text-primary font-semibold">
                      ₹{product.price}
                    </span>
                  </div>
                </div>
              ))
            ) : (
              <div className="p-4 text-center text-sm text-muted-foreground">
                No products found
              </div>
            )}
          </div>
        )}
      </form>

      <div className="flex items-center justify-center gap-5">
        <ThemeToggle />
        {currentUser ? (
          <>
            <NotificationDropdown />
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <div className="w-10 h-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold text-lg cursor-pointer transform transition-all duration-200 hover:scale-105 shadow-md">
                  {userInitial}
                </div>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56 mt-2">
                <DropdownMenuLabel>
                  Hi, {currentUser?.name || "User"}
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                {backendUser?.role === "Admin" && (
                  <DropdownMenuItem
                    className="cursor-pointer py-2"
                    onClick={() => navigate("/admin")}
                  >
                    <Shield className="w-4 h-4 mr-2" />
                    <span>Admin Portal</span>
                  </DropdownMenuItem>
                )}
                <DropdownMenuItem
                  className="cursor-pointer py-2"
                  onClick={() => navigate("/cart")}
                >
                  <ShoppingCart className="w-4 h-4 mr-2" />
                  <span className="flex-1">Cart</span>
                  {cartCount > 0 && (
                    <span className="bg-primary text-primary-foreground !text-primary-foreground text-xs px-2 py-0.5 rounded-full">
                      {cartCount}
                    </span>
                  )}
                </DropdownMenuItem>
                <DropdownMenuItem
                  className="cursor-pointer py-2"
                  onClick={() => navigate("/orders")}
                >
                  <Package className="w-4 h-4 mr-2" />
                  <span className="flex-1">My Orders</span>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  className="cursor-pointer py-2 text-red-600 focus:text-red-700 focus:bg-red-50 dark:text-red-400 dark:focus:bg-red-900 dark:focus:text-red-100"
                  onClick={() => {
                    handleLogout();
                    navigate("/");
                    toast.success("Logout successfully!");
                  }}
                >
                  <LogOut className="w-4 h-4 mr-2" />
                  <span>Logout</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </>
        ) : (
          <AuthDialog />
        )}
      </div>
    </header>
  );
}
