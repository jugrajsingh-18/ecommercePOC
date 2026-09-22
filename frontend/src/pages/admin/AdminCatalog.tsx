import { useState, useEffect } from "react";
import { toast } from "sonner";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { Card, CardContent } from "../../components/ui/card";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "../../components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "../../components/ui/dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../../components/ui/table";
import { Badge } from "../../components/ui/badge";
import {
  addProduct,
  addCategory,
  getCategories,
  getAdminProducts,
  updateProductApi,
  deleteProductApi,
  updateCategoryApi,
  deleteCategoryApi,
} from "../../api/adminApi";
import { PackagePlus, Pencil, Trash2, RefreshCcw, FolderEdit, Search } from "lucide-react";
import { defaultImage, checkInvalidImageOrNot } from "../../api/product";
import type { CategoryType, CategoryProduct } from "../../types/categoryTypes";

export default function AdminCatalog() {
  const [categories, setCategories] = useState<CategoryType[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Product form state
  const [productForm, setProductForm] = useState({
    title: "",
    slug: "",
    description: "",
    price: "",
    image: "",
    categoryId: "",
    availableQuantity: "50",
  });

  // Category form state
  const [categoryForm, setCategoryForm] = useState({
    name: "",
    image: "",
  });

  // Manage Products state
  const [products, setProducts] = useState<CategoryProduct[]>([]);
  const [productsLoading, setProductsLoading] = useState(false);
  const [filterCategoryId, setFilterCategoryId] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState("");

  // Edit dialog state
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<CategoryProduct | null>(null);
  const [editForm, setEditForm] = useState({
    title: "",
    slug: "",
    description: "",
    price: "",
    image: "",
    categoryId: "",
    availableQuantity: "",
  });
  const [isUpdating, setIsUpdating] = useState(false);

  // Delete confirmation state
  const [deletingId, setDeletingId] = useState<number | null>(null);

  // Edit category dialog state
  const [editCategoryDialogOpen, setEditCategoryDialogOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState<CategoryType | null>(null);
  const [editCategoryForm, setEditCategoryForm] = useState({ name: "", image: "" });
  const [isUpdatingCategory, setIsUpdatingCategory] = useState(false);
  const [deletingCategoryId, setDeletingCategoryId] = useState<number | null>(null);

  useEffect(() => {
    fetchCategories();
  }, []);

  // Debounced search for products
  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      const catId = filterCategoryId === "all" ? undefined : parseInt(filterCategoryId);
      fetchProducts(catId, searchQuery);
    }, 300);
    return () => clearTimeout(delayDebounceFn);
  }, [searchQuery, filterCategoryId]);

  const fetchCategories = async () => {
    try {
      const data = await getCategories();
      setCategories(data);
    } catch (error) {
      toast.error("Failed to fetch categories.");
    }
  };

  const fetchProducts = async (categoryId?: number, search?: string) => {
    setProductsLoading(true);
    try {
      const data = await getAdminProducts(categoryId, search);
      setProducts(data);
    } catch (error) {
      toast.error("Failed to fetch products.");
    } finally {
      setProductsLoading(false);
    }
  };

  // Fetch products when switching to the manage tab or when filter changes
  const handleFilterChange = (value: string) => {
    setFilterCategoryId(value);
  };

  const handleProductSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (
      !productForm.title ||
      !productForm.slug ||
      !productForm.description ||
      !productForm.price
    ) {
      return toast.error("Please fill in all required fields.");
    }

    setIsSubmitting(true);
    try {
      await addProduct({
        title: productForm.title,
        slug: productForm.slug,
        description: productForm.description,
        price: parseInt(productForm.price),
        availableQuantity: parseInt(productForm.availableQuantity),
        images: productForm.image ? [productForm.image] : [],
        categoryId: productForm.categoryId
          ? parseInt(productForm.categoryId)
          : undefined,
      });
      toast.success("Product added successfully!");
      setProductForm({
        title: "",
        slug: "",
        description: "",
        price: "",
        image: "",
        categoryId: "",
        availableQuantity: "50",
      });
    } catch (error: unknown) {
      const err = error as { response?: { data?: { message?: string } } };
      toast.error(err.response?.data?.message || "Failed to add product.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCategorySubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!categoryForm.name) {
      return toast.error("Please provide a category name.");
    }

    setIsSubmitting(true);
    try {
      await addCategory({
        name: categoryForm.name,
        image: categoryForm.image || undefined,
      });
      toast.success("Category added successfully!");
      setCategoryForm({ name: "", image: "" });
      fetchCategories(); // Refresh category dropdown for products
    } catch (error: unknown) {
      const err = error as { response?: { data?: { message?: string } } };
      toast.error(err.response?.data?.message || "Failed to add category.");
    } finally {
      setIsSubmitting(false);
    }
  };

  // Edit handlers
  const openEditDialog = (product: CategoryProduct) => {
    setEditingProduct(product);
    setEditForm({
      title: product.title || "",
      slug: product.slug || "",
      description: product.description || "",
      price: product.price?.toString() || "",
      image:
        product.images && product.images.length > 0 ? product.images[0] : "",
      categoryId: product.category?.id?.toString() || "",
      availableQuantity: product.availableQuantity?.toString() || "0",
    });
    setEditDialogOpen(true);
  };

  const handleEditSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingProduct) return;

    setIsUpdating(true);
    try {
      const updateData: Partial<CategoryProduct> & { categoryId?: number } = {};
      if (editForm.title) updateData.title = editForm.title;
      if (editForm.slug) updateData.slug = editForm.slug;
      if (editForm.description) updateData.description = editForm.description;
      if (editForm.price) updateData.price = parseInt(editForm.price);
      if (editForm.availableQuantity !== "") updateData.availableQuantity = parseInt(editForm.availableQuantity);
      if (editForm.image) updateData.images = [editForm.image];
      if (editForm.categoryId)
        updateData.categoryId = parseInt(editForm.categoryId);

      await updateProductApi(editingProduct.id, updateData);
      toast.success("Product updated successfully!");
      setEditDialogOpen(false);
      setEditingProduct(null);
      // Refresh products list
      const catId = filterCategoryId === "all" ? undefined : parseInt(filterCategoryId);
      fetchProducts(catId, searchQuery);
    } catch (error: unknown) {
      const err = error as { response?: { data?: { message?: string } } };
      toast.error(err.response?.data?.message || "Failed to update product.");
    } finally {
      setIsUpdating(false);
    }
  };

  // Delete handler
  const handleDelete = async (productId: number) => {
    setDeletingId(productId);
    try {
      await deleteProductApi(productId);
      toast.success("Product deleted successfully!");
      setProducts((prev) => prev.filter((p) => p.id !== productId));
    } catch (error: unknown) {
      const err = error as { response?: { data?: { message?: string } } };
      toast.error(err.response?.data?.message || "Failed to delete product.");
    } finally {
      setDeletingId(null);
    }
  };

  const getProductImage = (product: CategoryProduct) => {
    if (
      product.images &&
      product.images.length > 0 &&
      !checkInvalidImageOrNot(product.images[0])
    ) {
      return product.images[0];
    }
    return defaultImage;
  };

  // Edit category handlers
  const openEditCategoryDialog = (cat: CategoryType) => {
    setEditingCategory(cat);
    setEditCategoryForm({ name: cat.name || "", image: cat.image || "" });
    setEditCategoryDialogOpen(true);
  };

  const handleEditCategorySubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingCategory) return;
    setIsUpdatingCategory(true);
    try {
      const updateData: { name?: string; image?: string } = {};
      if (editCategoryForm.name) updateData.name = editCategoryForm.name;
      if (editCategoryForm.image) updateData.image = editCategoryForm.image;
      await updateCategoryApi(editingCategory.id, updateData);
      toast.success("Category updated successfully!");
      setEditCategoryDialogOpen(false);
      setEditingCategory(null);
      fetchCategories();
    } catch (error: unknown) {
      const err = error as { response?: { data?: { message?: string } } };
      toast.error(err.response?.data?.message || "Failed to update category.");
    } finally {
      setIsUpdatingCategory(false);
    }
  };

  const handleDeleteCategory = async (categoryId: number) => {
    setDeletingCategoryId(categoryId);
    try {
      await deleteCategoryApi(categoryId);
      toast.success("Category deleted successfully!");
      setCategories((prev) => prev.filter((c) => c.id !== categoryId));
    } catch (error: unknown) {
      const err = error as { response?: { data?: { message?: string } } };
      toast.error(err.response?.data?.message || "Failed to delete category. It may have products assigned.");
    } finally {
      setDeletingCategoryId(null);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center shadow-sm">
              <PackagePlus className="w-5 h-5 text-primary-foreground" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-foreground tracking-tight">
                Catalog
              </h1>
              <p className="text-muted-foreground text-sm">
                Manage products and categories
              </p>
            </div>
          </div>
        </div>
      </div>

      <Tabs
        defaultValue="manage"
        className="w-full"
        onValueChange={(val) => {
          if (val === "manage") {
            fetchProducts();
          }
        }}
      >
        <TabsList className="grid w-full max-w-3xl grid-cols-4 mb-6">
          <TabsTrigger value="manage">Manage Products</TabsTrigger>
          <TabsTrigger value="categories">Manage Categories</TabsTrigger>
          <TabsTrigger value="product">Add Product</TabsTrigger>
          <TabsTrigger value="category">Add Category</TabsTrigger>
        </TabsList>

        {/* Manage Products Tab */}
        <TabsContent value="manage">
          <Card>
            <CardContent className="p-6">
              {/* Filter & Refresh Bar */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
                <div className="flex items-center gap-4 flex-1">
                  <div className="relative w-full max-w-sm">
                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input
                      type="text"
                      placeholder="Search products..."
                      className="pl-8 bg-background border-border focus:border-ring w-full"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                  </div>
                  <Select
                    value={filterCategoryId}
                    onValueChange={handleFilterChange}
                  >
                    <SelectTrigger className="w-56">
                      <SelectValue placeholder="All Categories" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">
                        All Categories
                      </SelectItem>
                      {categories.map((cat) => (
                        <SelectItem
                          key={cat.id}
                          value={cat.id.toString()}
                        >
                          {cat.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => fetchProducts(filterCategoryId === "all" ? undefined : parseInt(filterCategoryId), searchQuery)}
                  className="cursor-pointer"
                >
                  <RefreshCcw className="w-3.5 h-3.5 mr-1.5" />
                  Refresh
                </Button>
              </div>

              {/* Products Table */}
              {productsLoading ? (
                <div className="space-y-3">
                  {[1, 2, 3, 4].map((i) => (
                    <div
                      key={i}
                      className="h-16 rounded-xl bg-muted animate-pulse"
                    />
                  ))}
                </div>
              ) : products.length === 0 ? (
                <div className="text-center py-12">
                  <PackagePlus className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                  <p className="text-muted-foreground text-lg font-medium">
                    No products found
                  </p>
                  <p className="text-muted-foreground/60 text-sm mt-1">
                    {filterCategoryId !== "all"
                      ? "Try selecting a different category"
                      : "Add some products to get started"}
                  </p>
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Image</TableHead>
                        <TableHead>Title</TableHead>
                        <TableHead>Price</TableHead>
                        <TableHead>Stock</TableHead>
                        <TableHead>
                          Category
                        </TableHead>
                        <TableHead className="text-right">
                          Actions
                        </TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {products.map((product) => (
                        <TableRow
                          key={product.id}
                          className="hover:bg-muted/50 transition-colors"
                        >
                          <TableCell>
                            <img
                              src={getProductImage(product)}
                              alt={product.title}
                              className="w-12 h-12 object-cover rounded-lg border border-border"
                            />
                          </TableCell>
                          <TableCell>
                            <div>
                              <p className="font-medium text-foreground line-clamp-1">
                                {product.title}
                              </p>
                              <p className="text-xs text-muted-foreground line-clamp-1">
                                {product.slug}
                              </p>
                            </div>
                          </TableCell>
                          <TableCell className="font-medium text-foreground">
                            ₹{product.price?.toLocaleString("en-IN")}
                          </TableCell>
                          <TableCell className="font-medium text-foreground">
                            {product.availableQuantity ?? 0}
                          </TableCell>
                          <TableCell>
                            <Badge
                              variant="outline"
                              className="bg-muted/50 text-muted-foreground border-border"
                            >
                              {product.category?.name || "Uncategorized"}
                            </Badge>
                          </TableCell>
                          <TableCell className="text-right">
                            <div className="flex items-center justify-end gap-2">
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => openEditDialog(product)}
                                className="cursor-pointer"
                              >
                                <Pencil className="w-3.5 h-3.5 mr-1" />
                                Edit
                              </Button>
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => handleDelete(product.id)}
                                disabled={deletingId === product.id}
                                className="border-red-200 text-red-600 hover:bg-red-50 hover:text-red-700 dark:border-red-500/30 dark:text-red-400 dark:hover:bg-red-500/10 cursor-pointer"
                              >
                                <Trash2 className="w-3.5 h-3.5 mr-1" />
                                {deletingId === product.id
                                  ? "Deleting..."
                                  : "Delete"}
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        {/* Add Product Tab */}
        <TabsContent value="product">
          <Card>
            <CardContent className="p-6">
              <form
                onSubmit={handleProductSubmit}
                className="space-y-4 max-w-2xl"
              >
                <div className="space-y-2">
                  <label className="text-sm font-medium text-foreground">
                    Title *
                  </label>
                  <Input
                    placeholder="E.g. Gaming Mouse"
                    value={productForm.title}
                    onChange={(e) =>
                      setProductForm({ ...productForm, title: e.target.value })
                    }
                    className="border-border focus:border-ring"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-foreground">
                    Slug *
                  </label>
                  <Input
                    placeholder="E.g. gaming-mouse"
                    value={productForm.slug}
                    onChange={(e) =>
                      setProductForm({ ...productForm, slug: e.target.value })
                    }
                    className="border-border focus:border-ring"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-foreground">
                    Description *
                  </label>
                  <Input
                    placeholder="Product description..."
                    value={productForm.description}
                    onChange={(e) =>
                      setProductForm({
                        ...productForm,
                        description: e.target.value,
                      })
                    }
                    className="border-border focus:border-ring"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-foreground">
                    Price (₹) *
                  </label>
                  <Input
                    type="number"
                    min="0"
                    placeholder="0"
                    value={productForm.price}
                    onChange={(e) =>
                      setProductForm({ ...productForm, price: e.target.value })
                    }
                    className="border-border focus:border-ring"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-foreground">
                    Available Quantity *
                  </label>
                  <Input
                    type="number"
                    min="0"
                    placeholder="50"
                    value={productForm.availableQuantity}
                    onChange={(e) =>
                      setProductForm({ ...productForm, availableQuantity: e.target.value })
                    }
                    className="border-border focus:border-ring"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-foreground">
                    Image URL
                  </label>
                  <Input
                    placeholder="https://example.com/image.jpg"
                    value={productForm.image}
                    onChange={(e) =>
                      setProductForm({ ...productForm, image: e.target.value })
                    }
                    className="border-border focus:border-ring"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-foreground">
                    Category
                  </label>
                  <Select
                    value={productForm.categoryId}
                    onValueChange={(val) =>
                      setProductForm({ ...productForm, categoryId: val })
                    }
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select a category" />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map((cat) => (
                        <SelectItem
                          key={cat.id}
                          value={cat.id.toString()}

                        >
                          {cat.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full cursor-pointer mt-4"
                >
                  {isSubmitting ? "Adding..." : "Add Product"}
                </Button>
              </form>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Add Category Tab */}
        <TabsContent value="category">
          <Card>
            <CardContent className="p-6">
              <form
                onSubmit={handleCategorySubmit}
                className="space-y-4 max-w-2xl"
              >
                <div className="space-y-2">
                  <label className="text-sm font-medium text-foreground">
                    Category Name *
                  </label>
                  <Input
                    placeholder="E.g. Electronics"
                    value={categoryForm.name}
                    onChange={(e) =>
                      setCategoryForm({ ...categoryForm, name: e.target.value })
                    }
                    className="border-border focus:border-ring"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-foreground">
                    Category Image URL
                  </label>
                  <Input
                    placeholder="https://example.com/image.jpg"
                    value={categoryForm.image}
                    onChange={(e) =>
                      setCategoryForm({
                        ...categoryForm,
                        image: e.target.value,
                      })
                    }
                    className="border-border focus:border-ring"
                  />
                </div>

                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full cursor-pointer mt-4"
                >
                  {isSubmitting ? "Adding..." : "Add Category"}
                </Button>
              </form>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Manage Categories Tab */}
        <TabsContent value="categories">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-2">
                  <FolderEdit className="w-5 h-5 text-foreground" />
                  <h3 className="text-lg font-semibold text-foreground">All Categories</h3>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => fetchCategories()}
                  className="cursor-pointer"
                >
                  <RefreshCcw className="w-3.5 h-3.5 mr-1.5" />
                  Refresh
                </Button>
              </div>

              {categories.length === 0 ? (
                <div className="text-center py-12">
                  <FolderEdit className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                  <p className="text-muted-foreground text-lg font-medium">No categories found</p>
                  <p className="text-muted-foreground/60 text-sm mt-1">Add some categories to get started</p>
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Image</TableHead>
                        <TableHead>Name</TableHead>
                        <TableHead>ID</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {categories.map((cat) => (
                        <TableRow key={cat.id} className="hover:bg-muted/50 transition-colors">
                          <TableCell>
                            {cat.image ? (
                              <img
                                src={cat.image}
                                alt={cat.name}
                                className="w-12 h-12 object-cover rounded-lg border border-border"
                              />
                            ) : (
                              <div className="w-12 h-12 rounded-lg bg-muted border border-border flex items-center justify-center">
                                <FolderEdit className="w-5 h-5 text-muted-foreground" />
                              </div>
                            )}
                          </TableCell>
                          <TableCell className="font-medium text-foreground">
                            {cat.name}
                          </TableCell>
                          <TableCell className="text-muted-foreground">
                            #{cat.id}
                          </TableCell>
                          <TableCell className="text-right">
                            <div className="flex items-center justify-end gap-2">
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => openEditCategoryDialog(cat)}
                                className="cursor-pointer"
                              >
                                <Pencil className="w-3.5 h-3.5 mr-1" />
                                Edit
                              </Button>
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => handleDeleteCategory(cat.id)}
                                disabled={deletingCategoryId === cat.id}
                                className="border-red-200 text-red-600 hover:bg-red-50 hover:text-red-700 dark:border-red-500/30 dark:text-red-400 dark:hover:bg-red-500/10 cursor-pointer"
                              >
                                <Trash2 className="w-3.5 h-3.5 mr-1" />
                                {deletingCategoryId === cat.id ? "Deleting..." : "Delete"}
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Edit Product Dialog */}
      <Dialog open={editDialogOpen} onOpenChange={setEditDialogOpen}>
        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <DialogTitle className="text-foreground text-xl">
              Edit Product
            </DialogTitle>
          </DialogHeader>
          <form onSubmit={handleEditSubmit} className="space-y-4 mt-2">
            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">Title</label>
              <Input
                value={editForm.title}
                onChange={(e) =>
                  setEditForm({ ...editForm, title: e.target.value })
                }
                className="border-border focus:border-ring"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">Slug</label>
              <Input
                value={editForm.slug}
                onChange={(e) =>
                  setEditForm({ ...editForm, slug: e.target.value })
                }
                className="border-border focus:border-ring"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">
                Description
              </label>
              <Input
                value={editForm.description}
                onChange={(e) =>
                  setEditForm({ ...editForm, description: e.target.value })
                }
                className="border-border focus:border-ring"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">
                  Price (₹)
                </label>
                <Input
                  type="number"
                  min="0"
                  value={editForm.price}
                  onChange={(e) =>
                    setEditForm({ ...editForm, price: e.target.value })
                  }
                  className="border-border focus:border-ring"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">
                  Available Quantity
                </label>
                <Input
                  type="number"
                  min="0"
                  value={editForm.availableQuantity}
                  onChange={(e) =>
                    setEditForm({ ...editForm, availableQuantity: e.target.value })
                  }
                  className="border-border focus:border-ring"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">
                  Category
                </label>
                <Select
                  value={editForm.categoryId}
                  onValueChange={(val) =>
                    setEditForm({ ...editForm, categoryId: val })
                  }
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((cat) => (
                      <SelectItem
                        key={cat.id}
                        value={cat.id.toString()}
                        className="text-gray-900"
                      >
                        {cat.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">
                Image URL
              </label>
              <Input
                value={editForm.image}
                onChange={(e) =>
                  setEditForm({ ...editForm, image: e.target.value })
                }
                className="border-border focus:border-ring"
              />
            </div>

            <div className="flex gap-3 pt-2">
              <Button
                type="button"
                variant="outline"
                onClick={() => setEditDialogOpen(false)}
                className="flex-1 cursor-pointer"
              >
                Cancel
              </Button>
              <Button
                type="submit"
                disabled={isUpdating}
                className="flex-1 cursor-pointer"
              >
                {isUpdating ? "Saving..." : "Save Changes"}
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
      {/* Edit Category Dialog */}
      <Dialog open={editCategoryDialogOpen} onOpenChange={setEditCategoryDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="text-foreground text-xl">
              Edit Category
            </DialogTitle>
          </DialogHeader>
          <form onSubmit={handleEditCategorySubmit} className="space-y-4 mt-2">
            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">Name</label>
              <Input
                value={editCategoryForm.name}
                onChange={(e) =>
                  setEditCategoryForm({ ...editCategoryForm, name: e.target.value })
                }
                className="border-border focus:border-ring"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">
                Image URL
              </label>
              <Input
                value={editCategoryForm.image}
                onChange={(e) =>
                  setEditCategoryForm({ ...editCategoryForm, image: e.target.value })
                }
                className="border-border focus:border-ring"
              />
            </div>

            <div className="flex gap-3 pt-2">
              <Button
                type="button"
                variant="outline"
                onClick={() => setEditCategoryDialogOpen(false)}
                className="flex-1 cursor-pointer"
              >
                Cancel
              </Button>
              <Button
                type="submit"
                disabled={isUpdatingCategory}
                className="flex-1 cursor-pointer"
              >
                {isUpdatingCategory ? "Saving..." : "Save Changes"}
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
