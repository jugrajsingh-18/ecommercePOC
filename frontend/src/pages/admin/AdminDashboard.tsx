import { useEffect, useState } from "react";
import { getOrdersSummary, getProductsSummary } from "../../api/adminApi";
import type {
  OrderSummaryResponse,
  ProductSummaryResponse,
} from "../../types/adminTypes";
import { Card, CardContent } from "../../components/ui/card";
import {
  ShoppingBag,
  IndianRupee,
  Package,
  AlertTriangle,
  TrendingUp,
  BarChart3,
} from "lucide-react";


const statusColorMap: Record<string, string> = {
  Pending: "from-amber-500 to-orange-500",
  Paid: "from-emerald-500 to-green-500",
  Shipped: "from-blue-500 to-cyan-500",
  Delivered: "from-violet-500 to-purple-500",
};

const statusBgMap: Record<string, string> = {
  Pending: "bg-amber-500/10 text-amber-400 border-amber-500/20",
  Paid: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
  Shipped: "bg-blue-500/10 text-blue-400 border-blue-500/20",
  Delivered: "bg-violet-500/10 text-violet-400 border-violet-500/20",
};

export default function AdminDashboard() {
  const [orderSummary, setOrderSummary] =
    useState<OrderSummaryResponse | null>(null);
  const [productSummary, setProductSummary] =
    useState<ProductSummaryResponse | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [orders, products] = await Promise.all([
          getOrdersSummary(),
          getProductsSummary(),
        ]);
        setOrderSummary(orders);
        setProductSummary(products);
      } catch (err) {
        console.error("Failed to load dashboard data", err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="space-y-2">
          <h1 className="text-3xl font-bold text-foreground">Dashboard</h1>
          <p className="text-muted-foreground">Loading overview...</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          {[1, 2, 3, 4].map((i) => (
            <div
              key={i}
              className="h-32 rounded-2xl bg-muted animate-pulse border border-border"
            />
          ))}
        </div>
      </div>
    );
  }

  const statCards = [
    {
      label: "Total Orders",
      value: orderSummary?.totalOrders ?? 0,
      icon: ShoppingBag,
    },
    {
      label: "Revenue",
      value: `₹${(orderSummary?.revenue ?? 0).toLocaleString("en-IN")}`,
      icon: IndianRupee,
    },
    {
      label: "Total Products",
      value: productSummary?.totalProducts ?? 0,
      icon: Package,
    },
    {
      label: "Out of Stock",
      value: productSummary?.outOfStockCount ?? 0,
      icon: AlertTriangle,
    },
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="space-y-1">
        <h1 className="text-3xl font-bold text-foreground tracking-tight">
          Dashboard
        </h1>
        <p className="text-muted-foreground">
          Overview of your store's performance
        </p>
      </div>

      {/* Stat Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
        {statCards.map((stat) => {
          const Icon = stat.icon;
          return (
            <Card
              key={stat.label}
              className="overflow-hidden group hover:border-border transition-all duration-300"
            >
              <CardContent className="p-5">
                <div className="flex items-start justify-between">
                  <div className="space-y-3">
                    <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
                      {stat.label}
                    </p>
                    <p className="text-2xl font-bold text-foreground">
                      {stat.value}
                    </p>
                  </div>
                  <div
                    className="w-11 h-11 rounded-xl bg-primary flex items-center justify-center shadow-sm group-hover:scale-110 transition-transform duration-300"
                  >
                    <Icon className="w-5 h-5 text-primary-foreground" />
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Order Status Breakdown */}
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-2 mb-6">
              <BarChart3 className="w-5 h-5 text-foreground" />
              <h3 className="text-lg font-semibold text-foreground">
                Order Status Breakdown
              </h3>
            </div>
            {orderSummary?.byStatus && orderSummary.byStatus.length > 0 ? (
              <div className="space-y-4">
                {orderSummary.byStatus.map((item) => {
                  const total = orderSummary.totalOrders || 1;
                  const percentage = Math.round((item.count / total) * 100);
                  return (
                    <div key={item.status} className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span
                          className={`text-sm font-medium px-2.5 py-1 rounded-lg border ${statusBgMap[item.status] || "bg-muted text-muted-foreground border-border"
                            }`}
                        >
                          {item.status}
                        </span>
                        <span className="text-sm text-muted-foreground font-mono">
                          {item.count}{" "}
                          <span className="text-muted-foreground/60">({percentage}%)</span>
                        </span>
                      </div>
                      <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
                        <div
                          className={`h-full rounded-full bg-gradient-to-r ${statusColorMap[item.status] || "from-gray-400 to-gray-500"
                            } transition-all duration-700`}
                          style={{ width: `${percentage}%` }}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="text-center py-8">
                <p className="text-muted-foreground text-sm">No order data available</p>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Most Ordered Products */}
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-2 mb-6">
              <TrendingUp className="w-5 h-5 text-foreground" />
              <h3 className="text-lg font-semibold text-foreground">
                Top Selling Products
              </h3>
            </div>
            {productSummary?.mostOrdered &&
              productSummary.mostOrdered.length > 0 ? (
              <div className="space-y-3">
                {productSummary.mostOrdered.map((product, index) => (
                  <div
                    key={product.id}
                    className="flex items-center gap-4 p-3 rounded-xl bg-muted/50 border border-border hover:bg-muted transition-colors"
                  >
                    <span
                      className={`w-8 h-8 rounded-lg flex items-center justify-center text-xs font-bold ${index === 0
                          ? "bg-primary text-primary-foreground"
                          : index === 1
                            ? "bg-muted-foreground/20 text-foreground"
                            : index === 2
                              ? "bg-muted text-muted-foreground"
                              : "bg-muted text-muted-foreground"
                        }`}
                    >
                      #{index + 1}
                    </span>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-foreground truncate">
                        {product.title}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-semibold text-foreground">
                        {product.totalSold} sold
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8">
                <p className="text-muted-foreground text-sm">No product data available</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
