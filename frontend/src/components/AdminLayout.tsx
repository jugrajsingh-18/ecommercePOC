import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../context/Authcontext";
import { useEffect } from "react";
import { toast } from "sonner";
import { Button } from "./ui/button";
import {
  LayoutDashboard,
  Users,
  ShoppingCart,
  LogOut,
  Shield,
  ChevronRight,
  PackagePlus,
} from "lucide-react";
import { ThemeToggle } from "./ThemeToggle";

const navItems = [
  { label: "Dashboard", path: "/admin", icon: LayoutDashboard },
  { label: "Catalog", path: "/admin/catalog", icon: PackagePlus },
  { label: "Users", path: "/admin/users", icon: Users },
  { label: "Orders", path: "/admin/orders", icon: ShoppingCart },
];

export default function AdminLayout() {
  const { backendUser, handleLogout, isLoading } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (!isLoading && (!backendUser || backendUser.role !== "Admin")) {
      toast.error("Access denied. Admin only.");
      navigate("/");
    }
  }, [backendUser, isLoading, navigate]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="w-10 h-10 border-2 border-foreground border-t-transparent rounded-full animate-spin" />
          <p className="text-muted-foreground text-sm">
            Loading admin panel...
          </p>
        </div>
      </div>
    );
  }

  if (!backendUser || backendUser.role !== "Admin") {
    return null;
  }

  return (
    <div className="min-h-screen bg-background flex text-foreground">
      {/* Sidebar */}
      <aside className="w-64 bg-card border-r border-border flex flex-col fixed h-full z-40">
        {/* Logo */}
        <div className="p-6 border-b border-border">
          <Link to="/admin" className="flex items-center gap-3 group">
            <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center shadow-sm">
              <Shield className="w-5 h-5 text-primary-foreground" />
            </div>
            <div>
              <h1 className="text-lg font-bold text-foreground tracking-tight">
                MarketHub
              </h1>
              <p className="text-[10px] text-muted-foreground font-bold uppercase tracking-widest">
                Admin Panel
              </p>
            </div>
          </Link>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4 space-y-1">
          {navItems.map((item) => {
            const isActive =
              location.pathname === item.path ||
              (item.path !== "/admin" &&
                location.pathname.startsWith(item.path));
            const Icon = item.icon;
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 group ${
                  isActive
                    ? "bg-accent text-accent-foreground shadow-sm"
                    : "text-muted-foreground hover:text-foreground hover:bg-accent/50"
                }`}
              >
                <Icon
                  className={`w-4.5 h-4.5 ${
                    isActive
                      ? "text-accent-foreground"
                      : "text-muted-foreground group-hover:text-foreground"
                  }`}
                />
                <span className="flex-1">{item.label}</span>
                {isActive && (
                  <ChevronRight className="w-3.5 h-3.5 text-accent-foreground" />
                )}
              </Link>
            );
          })}
        </nav>

        {/* User info & Logout */}
        <div className="p-4 border-t border-border space-y-3 bg-card">
          <div className="px-4 py-3 rounded-xl bg-background border border-border flex items-center justify-between">
            <div className="overflow-hidden">
              <p className="text-sm text-foreground font-medium truncate">
                {backendUser.username}
              </p>
              <p className="text-xs text-muted-foreground truncate">
                {backendUser.email}
              </p>
            </div>
            <ThemeToggle />
          </div>
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              className="flex-1 text-muted-foreground border-border hover:bg-accent hover:text-foreground cursor-pointer"
              onClick={() => navigate("/")}
            >
              Store
            </Button>
            <Button
              variant="outline"
              size="sm"
              className="flex-1 border-red-200 text-red-600 hover:bg-red-50 hover:text-red-700 dark:border-red-900 dark:text-red-400 dark:hover:bg-red-900 dark:hover:text-white cursor-pointer"
              onClick={() => {
                handleLogout();
                navigate("/");
                toast.success("Logged out successfully!");
              }}
            >
              <LogOut className="w-3.5 h-3.5 mr-1.5" />
              Logout
            </Button>
          </div>
        </div>
      </aside>

      {/* Main content */}
      <main className="flex-1 ml-64">
        <div className="p-8">
          <Outlet />
        </div>
      </main>
    </div>
  );
}
