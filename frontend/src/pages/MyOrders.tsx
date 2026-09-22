import { useEffect, useState } from "react";
import { getUserOrders } from "../api/orderApi";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import { Badge } from "../components/ui/badge";
import { toast } from "sonner";
import { Package, ChevronDown } from "lucide-react";
import { defaultImage } from "../api/product";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "../components/ui/pagination";

export interface UserOrder {
  id: number;
  status: string;
  totalAmount: number;
  createdAt: string;
  items: {
    id: number;
    productId: number;
    productTitle: string;
    productImage: string;
    quantity: number;
    price: number;
  }[];
}

export default function MyOrders() {
  const [orders, setOrders] = useState<UserOrder[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [expandedOrders, setExpandedOrders] = useState<Record<number, boolean>>(
    {},
  );
  const ITEMS_PER_PAGE = 5;

  const toggleOrder = (orderId: number) => {
    setExpandedOrders((prev) => ({ ...prev, [orderId]: !prev[orderId] }));
  };

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const data = await getUserOrders();
        // Sort orders by newest first since we don't know if backend preserves order perfectly
        const sortedData = data.sort(
          (a: UserOrder, b: UserOrder) =>
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
        );
        setOrders(sortedData);
      } catch (error: unknown) {
        const err = error as { response?: { status?: number } };
        if (err.response?.status === 404) {
          setOrders([]);
        } else {
          toast.error("Failed to fetch orders.");
        }
      } finally {
        setLoading(false);
      }
    };
    fetchOrders();
  }, []);

  if (loading) {
    return (
      <div className="h-[60vh] flex items-center justify-center text-lg font-semibold text-muted-foreground">
        Loading orders...
      </div>
    );
  }

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "delivered":
        return "bg-green-100 text-green-800 hover:bg-green-100";
      case "shipped":
        return "bg-blue-100 text-blue-800 hover:bg-blue-100";
      case "pending":
        return "bg-yellow-100 text-yellow-800 hover:bg-yellow-100";
      default:
        return "bg-muted text-muted-foreground hover:bg-muted";
    }
  };

  const totalPages = Math.ceil(orders.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const paginatedOrders = orders.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      <div className="flex items-center gap-3 mb-8">
        <Package className="w-8 h-8 text-primary" />
        <h1 className="text-3xl font-bold">My Orders</h1>
      </div>

      {orders.length === 0 ? (
        <div className="text-center py-20 bg-muted/50 rounded-xl border border-dashed border-border">
          <Package className="w-16 h-16 text-muted-foreground/50 mx-auto mb-4" />
          <p className="text-xl font-medium text-muted-foreground">
            You haven't placed any orders yet.
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {paginatedOrders.map((order) => (
            <Card key={order.id} className="transition-all hover:shadow-md">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-lg font-semibold">
                  Order #{order.id}
                </CardTitle>
                <Badge
                  className={getStatusColor(order.status)}
                  variant="outline"
                >
                  {order.status}
                </Badge>
              </CardHeader>
              <CardContent>
                <div className="flex justify-between items-center text-sm text-muted-foreground mb-4">
                  <span>
                    Placed on{" "}
                    {new Date(order.createdAt).toLocaleDateString(undefined, {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </span>
                  <span className="font-bold text-foreground text-xl">
                    ₹{order.totalAmount}
                  </span>
                </div>
                <div
                  onClick={() => toggleOrder(order.id)}
                  className="flex items-center justify-between cursor-pointer text-sm text-muted-foreground bg-muted/50 px-3 py-2 rounded-md w-full hover:bg-muted transition-colors"
                >
                  <div className="flex items-center gap-2">
                    <Package className="w-4 h-4" />
                    {order.items.length} item
                    {order.items.length !== 1 ? "s" : ""} in this order
                  </div>
                  <ChevronDown
                    className={`w-4 h-4 transition-transform ${expandedOrders[order.id] ? "rotate-180" : ""}`}
                  />
                </div>

                {expandedOrders[order.id] && (
                  <div className="mt-4 space-y-3 pt-4 border-t border-border animate-in fade-in slide-in-from-top-2">
                    {order.items.map((item) => (
                      <div key={item.id} className="flex items-center gap-4">
                        <img
                          src={item.productImage || defaultImage}
                          alt={item.productTitle || "Product"}
                          className="w-12 h-12 object-cover rounded-md border border-border"
                          onError={(e) => (e.currentTarget.src = defaultImage)}
                        />
                        <div className="flex-1">
                          <p className="font-medium text-sm text-foreground line-clamp-1">
                            {item.productTitle || `Product #${item.productId}`}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            Qty: {item.quantity}
                          </p>
                        </div>
                        <p className="font-semibold text-sm text-foreground">
                          ₹{item.price}
                        </p>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          ))}

          {totalPages > 1 && (
            <Pagination className="mt-8">
              <PaginationContent>
                <PaginationItem>
                  <PaginationPrevious
                    onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                    className={
                      currentPage === 1
                        ? "pointer-events-none opacity-50"
                        : "cursor-pointer"
                    }
                  />
                </PaginationItem>

                {[...Array(totalPages)].map((_, i) => (
                  <PaginationItem key={i}>
                    <PaginationLink
                      onClick={() => setCurrentPage(i + 1)}
                      isActive={currentPage === i + 1}
                      className="cursor-pointer"
                    >
                      {i + 1}
                    </PaginationLink>
                  </PaginationItem>
                ))}

                <PaginationItem>
                  <PaginationNext
                    onClick={() =>
                      setCurrentPage((p) => Math.min(totalPages, p + 1))
                    }
                    className={
                      currentPage === totalPages
                        ? "pointer-events-none opacity-50"
                        : "cursor-pointer"
                    }
                  />
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          )}
        </div>
      )}
    </div>
  );
}
