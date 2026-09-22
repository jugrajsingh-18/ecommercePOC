import { useEffect, useState } from "react";
import { getUsers } from "../../api/adminApi";
import type {
  AdminUser,
  PaginationMeta,
  AdminQueryUserParams,
} from "../../types/adminTypes";
import { Card, CardContent } from "../../components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../../components/ui/table";
import { Input } from "../../components/ui/input";
import { Button } from "../../components/ui/button";
import { Badge } from "../../components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../components/ui/select";
import {
  Users,
  Search,
  ChevronLeft,
  ChevronRight,
  ArrowUpDown,
} from "lucide-react";

export default function AdminUsers() {
  const [users, setUsers] = useState<AdminUser[]>([]);
  const [meta, setMeta] = useState<PaginationMeta | null>(null);
  const [loading, setLoading] = useState(true);
  const [params, setParams] = useState<AdminQueryUserParams>({
    page: 1,
    limit: 10,
    search: "",
    sortBy: "createdAt",
    order: "DESC",
  });

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const response = await getUsers(params);
      setUsers(response.data);
      setMeta(response.meta);
    } catch (err) {
      console.error("Failed to fetch users", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, [params]);

  const handleSearch = (value: string) => {
    setParams((prev) => ({ ...prev, search: value, page: 1 }));
  };

  const handleSort = (field: string) => {
    setParams((prev) => ({
      ...prev,
      sortBy: field,
      order: prev.sortBy === field && prev.order === "ASC" ? "DESC" : "ASC",
    }));
  };

  const handlePageChange = (page: number) => {
    setParams((prev) => ({ ...prev, page }));
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center shadow-sm">
              <Users className="w-5 h-5 text-primary-foreground" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-foreground tracking-tight">
                Users
              </h1>
              <p className="text-muted-foreground text-sm">
                {meta ? `${meta.total} total users` : "Manage all users"}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="p-4">
          <div className="flex items-center gap-4">
            <div className="relative flex-1 max-w-sm">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Search by name or email..."
                className="pl-10"
                value={params.search || ""}
                onChange={(e) => handleSearch(e.target.value)}
              />
            </div>
            <Select
              value={`${params.sortBy}-${params.order}`}
              onValueChange={(val) => {
                const [sortBy, order] = val.split("-");
                setParams((prev) => ({
                  ...prev,
                  sortBy,
                  order: order as "ASC" | "DESC",
                }));
              }}
            >
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="createdAt-DESC">
                  Newest First
                </SelectItem>
                <SelectItem value="createdAt-ASC">
                  Oldest First
                </SelectItem>
                <SelectItem value="username-ASC">
                  Name A-Z
                </SelectItem>
                <SelectItem value="username-DESC">
                  Name Z-A
                </SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Table */}
      <Card className="overflow-hidden">
        <CardContent className="p-0">
          {loading ? (
            <div className="p-8 space-y-4">
              {[1, 2, 3, 4, 5].map((i) => (
                <div
                  key={i}
                  className="h-12 rounded-lg bg-muted animate-pulse"
                />
              ))}
            </div>
          ) : users.length === 0 ? (
            <div className="py-16 text-center">
              <Users className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
              <p className="text-muted-foreground text-lg font-medium">
                No users found
              </p>
              <p className="text-muted-foreground/60 text-sm mt-1">
                Try adjusting your search or filters
              </p>
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow className="hover:bg-transparent">
                  <TableHead
                    className="cursor-pointer hover:text-foreground transition-colors"
                    onClick={() => handleSort("username")}
                  >
                    <div className="flex items-center gap-1.5">
                      Username
                      <ArrowUpDown className="w-3.5 h-3.5" />
                    </div>
                  </TableHead>
                  <TableHead
                    className="cursor-pointer hover:text-foreground transition-colors"
                    onClick={() => handleSort("email")}
                  >
                    <div className="flex items-center gap-1.5">
                      Email
                      <ArrowUpDown className="w-3.5 h-3.5" />
                    </div>
                  </TableHead>
                  <TableHead>Role</TableHead>
                  <TableHead
                    className="cursor-pointer hover:text-foreground transition-colors"
                    onClick={() => handleSort("createdAt")}
                  >
                    <div className="flex items-center gap-1.5">
                      Joined
                      <ArrowUpDown className="w-3.5 h-3.5" />
                    </div>
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {users.map((user) => (
                  <TableRow
                    key={user.id}
                    className="hover:bg-muted/50 transition-colors"
                  >
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-lg bg-muted border border-border flex items-center justify-center">
                          <span className="text-xs font-bold text-foreground">
                            {user.username?.charAt(0)?.toUpperCase() || "?"}
                          </span>
                        </div>
                        <span className="text-sm font-medium text-foreground">
                          {user.username || "N/A"}
                        </span>
                      </div>
                    </TableCell>
                    <TableCell className="text-sm text-muted-foreground">
                      {user.email}
                    </TableCell>
                    <TableCell>
                      <Badge
                        variant={
                          user.role === "Admin" ? "default" : "secondary"
                        }
                      >
                        {user.role}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-sm text-muted-foreground">
                      {new Date(user.createdAt).toLocaleDateString("en-IN", {
                        year: "numeric",
                        month: "short",
                        day: "numeric",
                      })}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>

      {/* Pagination */}
      {meta && meta.totalPages > 1 && (
        <div className="flex items-center justify-between">
          <p className="text-sm text-muted-foreground">
            Showing{" "}
            <span className="text-foreground font-medium">
              {(meta.page - 1) * meta.limit + 1}
            </span>{" "}
            to{" "}
            <span className="text-foreground font-medium">
              {Math.min(meta.page * meta.limit, meta.total)}
            </span>{" "}
            of{" "}
            <span className="text-foreground font-medium">{meta.total}</span>{" "}
            users
          </p>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              disabled={!meta.hasPrevPage}
              onClick={() => handlePageChange(meta.page - 1)}
              className="disabled:opacity-30 cursor-pointer"
            >
              <ChevronLeft className="w-4 h-4 mr-1" />
              Previous
            </Button>
            <div className="flex items-center gap-1">
              {Array.from({ length: Math.min(meta.totalPages, 5) }, (_, i) => {
                let page: number;
                if (meta.totalPages <= 5) {
                  page = i + 1;
                } else if (meta.page <= 3) {
                  page = i + 1;
                } else if (meta.page >= meta.totalPages - 2) {
                  page = meta.totalPages - 4 + i;
                } else {
                  page = meta.page - 2 + i;
                }
                return (
                  <Button
                    key={page}
                    variant={page === meta.page ? "default" : "outline"}
                    size="sm"
                    onClick={() => handlePageChange(page)}
                    className="w-9 h-9 p-0 cursor-pointer"
                  >
                    {page}
                  </Button>
                );
              })}
            </div>
            <Button
              variant="outline"
              size="sm"
              disabled={!meta.hasNextPage}
              onClick={() => handlePageChange(meta.page + 1)}
              className="disabled:opacity-30 cursor-pointer"
            >
              Next
              <ChevronRight className="w-4 h-4 ml-1" />
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
