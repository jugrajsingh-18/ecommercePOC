import { useEffect, useState } from "react";
import {
  getOrdersSummary,
  getAllOrders,
  updateOrderStatus,
} from "../../api/adminApi";
import { toast } from "sonner";
import { Card, CardContent } from "../../components/ui/card";
import { Input } from "../../components/ui/input";
import { Button } from "../../components/ui/button";
import { Badge } from "../../components/ui/badge";
import { Separator } from "../../components/ui/separator";
import {
  ShoppingBag,
  IndianRupee,
  Calendar,
  Filter,
  BarChart3,
  RefreshCcw,
} from "lucide-react";
import type {
  AdminOrder,
  AdminQueryOrderSummaryParams,
  OrderSummaryResponse,
} from "../../types/adminTypes";

const statusColorMap: Record<string, string> = {
  Pending:
    "bg-orange-50 text-orange-600 border-orange-200 dark:bg-orange-500/10 dark:text-orange-400 dark:border-orange-500/30",
  Paid: "bg-green-50 text-green-600 border-green-200 dark:bg-green-500/10 dark:text-green-400 dark:border-green-500/30",
  Shipped:
    "bg-blue-50 text-blue-600 border-blue-200 dark:bg-blue-500/10 dark:text-blue-400 dark:border-blue-500/30",
  Delivered:
    "bg-purple-50 text-purple-600 border-purple-200 dark:bg-purple-500/10 dark:text-purple-400 dark:border-purple-500/30",
};

const statusBarMap: Record<string, string> = {
  Pending: "bg-orange-500",
  Paid: "bg-green-500",
  Shipped: "bg-blue-500",
  Delivered: "bg-purple-500",
};

export default function AdminOrders() {
  const [summary, setSummary] = useState<OrderSummaryResponse | null>(null);
  const [orders, setOrders] = useState<AdminOrder[]>([]);
  const [loading, setLoading] = useState(true);
  const [statusUpdating, setStatusUpdating] = useState<number | null>(null);
  const [filters, setFilters] = useState<AdminQueryOrderSummaryParams>({
    startDate: "",
    endDate: "",
  });
  const [appliedFilters, setAppliedFilters] =
    useState<AdminQueryOrderSummaryParams>({});

  const fetchSummary = async (params?: AdminQueryOrderSummaryParams) => {
    setLoading(true);
    try {
      const cleanParams: AdminQueryOrderSummaryParams = {};
      if (params?.startDate) cleanParams.startDate = params.startDate;
      if (params?.endDate) cleanParams.endDate = params.endDate;
      const data = await getOrdersSummary(cleanParams);
      setSummary(data);

      const allOrders = await getAllOrders(cleanParams);
      setOrders(allOrders);
    } catch (err) {
      console.error("Failed to fetch order summary", err);
    } finally {
      setLoading(false);
    }
  };

  const handleStatusChange = async (orderId: number, newStatus: string) => {
    setStatusUpdating(orderId);
    try {
      await updateOrderStatus(orderId, newStatus);
      toast.success(`Order #${orderId} status updated to ${newStatus}`);
      // Optimistically update local state
      setOrders((prev) =>
        prev.map((o) => (o.id === orderId ? { ...o, status: newStatus } : o)),
      );
      // Refresh summary as well
      fetchSummary(appliedFilters);
    } catch (e: unknown) {
      const err = e as { response?: { data?: { message?: string } } };
      toast.error(
        err.response?.data?.message || "Failed to update order status",
      );
    } finally {
      setStatusUpdating(null);
    }
  };

  useEffect(() => {
    fetchSummary(appliedFilters);
  }, [appliedFilters]);

  const handleApplyFilters = () => {
    setAppliedFilters({ ...filters });
  };

  const handleClearFilters = () => {
    setFilters({ startDate: "", endDate: "" });
    setAppliedFilters({});
  };

  if (loading && !summary) {
    return (
      <div className="space-y-6">
        <div className="space-y-2">
          <h1 className="text-3xl font-bold text-foreground">Orders</h1>
          <p className="text-muted-foreground">Loading order data...</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {[1, 2].map((i) => (
            <div
              key={i}
              className="h-32 rounded-2xl bg-muted animate-pulse border border-border"
            />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center shadow-sm">
            <ShoppingBag className="w-5 h-5 text-primary-foreground" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-foreground tracking-tight">
              Orders
            </h1>
            <p className="text-muted-foreground text-sm">
              Order analytics and summary
            </p>
          </div>
        </div>
        <Button
          variant="outline"
          size="sm"
          onClick={() => fetchSummary(appliedFilters)}
          className="cursor-pointer"
        >
          <RefreshCcw className="w-3.5 h-3.5 mr-1.5" />
          Refresh
        </Button>
      </div>

      {/* Date Filter */}
      <Card>
        <CardContent className="p-4">
          <div className="flex items-end gap-4 flex-wrap">
            <div className="flex items-center gap-2 text-muted-foreground">
              <Filter className="w-4 h-4" />
              <span className="text-sm font-medium">Filter by Date</span>
            </div>
            <Separator orientation="vertical" className="h-8" />
            <div className="space-y-1.5">
              <label className="text-xs text-muted-foreground flex items-center gap-1">
                <Calendar className="w-3 h-3" />
                Start Date
              </label>
              <Input
                type="date"
                value={filters.startDate || ""}
                onChange={(e) =>
                  setFilters((prev) => ({
                    ...prev,
                    startDate: e.target.value,
                  }))
                }
                className="w-44"
              />
            </div>
            <div className="space-y-1.5">
              <label className="text-xs text-muted-foreground flex items-center gap-1">
                <Calendar className="w-3 h-3" />
                End Date
              </label>
              <Input
                type="date"
                value={filters.endDate || ""}
                onChange={(e) =>
                  setFilters((prev) => ({
                    ...prev,
                    endDate: e.target.value,
                  }))
                }
                className="w-44"
              />
            </div>
            <div className="flex gap-2">
              <Button
                size="sm"
                onClick={handleApplyFilters}
                className="cursor-pointer"
              >
                Apply
              </Button>
              <Button
                size="sm"
                variant="outline"
                onClick={handleClearFilters}
                className="cursor-pointer"
              >
                Clear
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <Card className="group hover:border-border transition-all">
          <CardContent className="p-6">
            <div className="flex items-start justify-between">
              <div className="space-y-3">
                <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
                  Total Orders
                </p>
                <p className="text-4xl font-bold text-foreground">
                  {summary?.totalOrders ?? 0}
                </p>
              </div>
              <div className="w-12 h-12 rounded-xl bg-primary flex items-center justify-center shadow-sm group-hover:scale-110 transition-transform">
                <ShoppingBag className="w-6 h-6 text-primary-foreground" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="group hover:border-border transition-all">
          <CardContent className="p-6">
            <div className="flex items-start justify-between">
              <div className="space-y-3">
                <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
                  Total Revenue
                </p>
                <p className="text-4xl font-bold text-foreground">
                  ₹{(summary?.revenue ?? 0).toLocaleString("en-IN")}
                </p>
              </div>
              <div className="w-12 h-12 rounded-xl bg-primary flex items-center justify-center shadow-sm group-hover:scale-110 transition-transform">
                <IndianRupee className="w-6 h-6 text-primary-foreground" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Status Breakdown */}
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center gap-2 mb-6">
            <BarChart3 className="w-5 h-5 text-foreground" />
            <h3 className="text-lg font-semibold text-foreground">
              Status Breakdown
            </h3>
          </div>

          {summary?.byStatus && summary.byStatus.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {summary.byStatus.map((item) => {
                const total = summary.totalOrders || 1;
                const percentage = Math.round((item.count / total) * 100);
                return (
                  <div
                    key={item.status}
                    className="p-4 rounded-xl bg-muted/50 border border-border space-y-3"
                  >
                    <div className="flex items-center justify-between">
                      <Badge
                        variant="outline"
                        className={
                          statusColorMap[item.status] ||
                          "bg-muted text-muted-foreground border-border"
                        }
                      >
                        {item.status}
                      </Badge>
                      <span className="text-2xl font-bold text-foreground">
                        {item.count}
                      </span>
                    </div>
                    <div className="w-full h-1.5 bg-muted rounded-full overflow-hidden">
                      <div
                        className={`h-full rounded-full ${
                          statusBarMap[item.status] || "bg-muted-foreground"
                        } transition-all duration-700`}
                        style={{ width: `${percentage}%` }}
                      />
                    </div>
                    <p className="text-xs text-muted-foreground">
                      {percentage}% of total
                    </p>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="text-center py-12">
              <ShoppingBag className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
              <p className="text-muted-foreground text-lg font-medium">
                No orders found
              </p>
              <p className="text-muted-foreground/60 text-sm mt-1">
                {appliedFilters.startDate || appliedFilters.endDate
                  ? "Try adjusting your date filters"
                  : "Orders will appear here once placed"}
              </p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Orders List Table */}
      <Card className="mt-8">
        <CardContent className="p-6">
          <div className="flex items-center gap-2 mb-6">
            <ShoppingBag className="w-5 h-5 text-foreground" />
            <h3 className="text-lg font-semibold text-foreground">
              Recent Orders
            </h3>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left text-muted-foreground">
              <thead className="text-xs text-foreground uppercase bg-muted/50 border-b border-border">
                <tr>
                  <th className="px-4 py-3">Order ID</th>
                  <th className="px-4 py-3">Customer</th>
                  <th className="px-4 py-3">Date</th>
                  <th className="px-4 py-3">Total Amount</th>
                  <th className="px-4 py-3">Status</th>
                  <th className="px-4 py-3 text-right">Actions</th>
                </tr>
              </thead>
              <tbody>
                {orders.length > 0 ? (
                  orders.map((order) => (
                    <tr
                      key={order.id}
                      className="border-b border-border hover:bg-muted/50 transition-colors"
                    >
                      <td className="px-4 py-4 font-medium text-foreground">
                        #{order.id}
                      </td>
                      <td className="px-4 py-4">
                        {order.user?.username || "Unknown"}
                        <div className="text-xs text-muted-foreground/60">
                          {order.user?.email}
                        </div>
                      </td>
                      <td className="px-4 py-4">
                        {new Date(order.createdAt).toLocaleDateString()}
                      </td>
                      <td className="px-4 py-4 font-medium text-foreground">
                        ₹{(order.totalAmount ?? 0).toLocaleString("en-IN")}
                      </td>
                      <td className="px-4 py-4">
                        <Badge
                          variant="outline"
                          className={
                            statusColorMap[order.status] ||
                            "bg-muted text-muted-foreground border-border"
                          }
                        >
                          {order.status}
                        </Badge>
                      </td>
                      <td className="px-4 py-4 text-right">
                        <select
                          className="bg-background border border-border text-foreground text-sm rounded-lg focus:ring-ring focus:border-ring block w-full p-2"
                          value={order.status}
                          disabled={statusUpdating === order.id}
                          onChange={(e) =>
                            handleStatusChange(order.id, e.target.value)
                          }
                        >
                          <option value="Pending">Pending</option>
                          <option value="Paid">Paid</option>
                          <option value="Shipped">Shipped</option>
                          <option value="Delivered">Delivered</option>
                        </select>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td
                      colSpan={6}
                      className="px-4 py-8 text-center text-muted-foreground"
                    >
                      No orders available to display.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
