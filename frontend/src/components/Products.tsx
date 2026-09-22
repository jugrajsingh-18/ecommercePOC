import { useEffect, useState } from "react";
import {
  checkInvalidImageOrNot,
  defaultImage,
  getProducts,
} from "../api/product";
import type { CategoryProduct } from "../types/categoryTypes";
import { Card, CardContent } from "./ui/card";
import { Button } from "./ui/button";
import { useAuth } from "../context/Authcontext";
import AuthDialog from "./Auth";
import { toast } from "sonner";
import { Link, useSearchParams } from "react-router-dom";
import ProductsSkeleton from "./skeleton/ProductSkeleton";
import type { CartItem } from "../types/AuthTypes";
import { CircleCheck } from "lucide-react";

export default function Products() {
  interface SetQuatitiesOperationProp {
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>;
    productId: number;
    max?: number;
  }
  interface QuantitiesState {
    [productId: number]: number;
  }
  const { currentUser, addToCart } = useAuth();
  const [products, setProducts] = useState<CategoryProduct[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [fetched, setFetched] = useState<boolean>(false);
  const [quantities, setQuantities] = useState<QuantitiesState>({});
  const itemsPerPage = 16;

  const setDefaultImg = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    if (!e.currentTarget.src.includes(defaultImage)) {
      e.currentTarget.src = defaultImage;
    }
  };
  const cartItem = currentUser?.cart || [];
  const [searchParams] = useSearchParams();
  const searchQuery = searchParams.get("search") || undefined;

  useEffect(() => {
    const fetchProducts = async () => {
      const res = await getProducts(searchQuery);
      if (searchQuery) {
        setProducts(res.data);
      } else {
        setProducts(res.data.slice(0, -10));
      }
      setFetched(true);
    };

    fetchProducts();
  }, [searchQuery]);

  const increaseQuantity = ({
    e,
    productId,
    max,
  }: SetQuatitiesOperationProp) => {
    e.preventDefault();

    setQuantities((prev) => {
      const current = prev[productId] || 1;
      if (max !== undefined && current >= max) {
        toast.error(`Only ${max} more can be added.`);
        return prev;
      }
      return {
        ...prev,
        [productId]: current + 1,
      };
    });
  };

  const decreaseQuantity = ({ e, productId }: SetQuatitiesOperationProp) => {
    e.preventDefault();

    setQuantities((prev) => ({
      ...prev,
      [productId]: Math.max((prev[productId] || 1) - 1, 1),
    }));
  };
  const totalPages = Math.ceil(products.length / itemsPerPage);

  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentProducts = products.slice(startIndex, startIndex + itemsPerPage);
  const [showAuthDialog, setShowAuthDialog] = useState(false);

  const findInCart = (id: number) => {
    return cartItem?.some((item) => item.id == id);
  };
  const handleAddToCart = async (product: CategoryProduct) => {
    if (currentUser) {
      const inCart =
        cartItem?.find((item) => item.id == product.id)?.quantity || 0;
      const totalStock = product.availableQuantity ?? 0;
      const remainingStock = Math.max(0, totalStock - inCart);

      if (totalStock <= 0 || remainingStock <= 0) {
        toast.error(
          `Only ${totalStock} in stock. Maximum limit reached in cart.`,
        );
        return;
      }

      const desiredQty = quantities[product.id] || 1;
      if (desiredQty > remainingStock) {
        toast.error(`You can only add up to ${remainingStock} more.`);
        return;
      }

      const newProduct = {
        ...product,
        quantity: desiredQty,
      };
      const response = await addToCart(newProduct as unknown as CartItem);
      if (response.status == 400) {
        toast.error(response.message);
        return;
      }
      if (response.status == 200) {
        toast.success(response.message);
        setQuantities((prev) => ({ ...prev, [product.id]: 1 }));
        return;
      }
    } else {
      setShowAuthDialog((prev) => !prev);
    }
  };
  return (
    <>
      {fetched ? (
        <div className="max-w-7xl mx-auto p-6">
          <div className="hidden">
            <AuthDialog
              setView={showAuthDialog}
              resetView={() => setShowAuthDialog(false)}
            />
          </div>
          <h1 className="text-3xl font-bold text-center mb-8 text-foreground">
            All Products
          </h1>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 justify-center gap-6">
            {currentProducts.map((product) => {
              const inCart =
                cartItem?.find((item) => item.id == product.id)?.quantity || 0;
              const totalStock = product.availableQuantity ?? 0;
              const remainingStock = Math.max(0, totalStock - inCart);

              return (
                <Card key={product.id} className="rounded-2xl overflow-hidden h-full flex flex-col">
                  <Link to={`/product/${product.id}`} className="block">
                    <img
                      src={
                        product.images &&
                        product.images.length > 0 &&
                        !checkInvalidImageOrNot(product.images[0])
                          ? product.images[0]
                          : defaultImage
                      }
                      alt={product.title}
                      className="w-full h-52 object-cover hover:opacity-90 transition-opacity"
                      onError={setDefaultImg}
                    />
                  </Link>

                  <CardContent className="p-4 flex flex-col flex-1">
                    <Link to={`/product/${product.id}`} className="block group">
                      <h2 className="text-lg font-semibold text-foreground line-clamp-1 group-hover:text-primary transition-colors">
                        {product.title}
                      </h2>

                      <p className="text-sm text-muted-foreground line-clamp-2 mt-2">
                        {product.description}
                      </p>

                      <div className="space-y-3 mt-3">
                        <div className="flex justify-between items-center">
                          <span className="text-xl font-bold text-foreground">
                            ₹{product.price}
                          </span>

                          <span
                            className="text-xs bg-muted text-muted-foreground px-2 py-1 rounded-full truncate max-w-[120px] inline-block align-bottom"
                            title={product.category?.name || "Uncategorized"}
                          >
                            {product.category?.name || "Uncategorized"}
                          </span>
                        </div>

                        <div className="flex items-center justify-between text-xs mt-1">
                          {totalStock <= 0 ? (
                            <span className="text-red-500 font-medium">
                              Out of stock
                            </span>
                          ) : remainingStock <= 0 ? (
                            <span className="text-amber-600 dark:text-amber-400 font-medium">
                              All in cart ({inCart})
                            </span>
                          ) : remainingStock <= 5 ? (
                            <span className="text-orange-500 font-medium">
                              {remainingStock} left
                            </span>
                          ) : (
                            <span className="text-muted-foreground">
                              {remainingStock} available
                            </span>
                          )}
                        </div>
                      </div>
                    </Link>

                    <div className="mt-auto pt-4">
                      {findInCart(product.id) ? (
                        <>
                          <div className="flex items-center gap-4 p-3 text-foreground">
                            <p className="font-medium">Quantity:</p>

                            <Button
                              className="cursor-pointer"
                              variant="outline"
                              disabled={remainingStock <= 0}
                              onClick={(e) => {
                                e.preventDefault();
                                e.stopPropagation();
                                decreaseQuantity({ e, productId: product.id });
                              }}
                            >
                              -
                            </Button>

                            <span className="text-lg font-semibold">
                              {remainingStock <= 0
                                ? 0
                                : quantities[product.id] || 1}
                            </span>

                            <Button
                              className="cursor-pointer"
                              variant="outline"
                              disabled={
                                remainingStock <= 0 ||
                                (quantities[product.id] || 1) >= remainingStock
                              }
                              onClick={(e) => {
                                e.preventDefault();
                                e.stopPropagation();
                                increaseQuantity({
                                  e,
                                  productId: product.id,
                                  max: remainingStock,
                                });
                              }}
                            >
                              +
                            </Button>
                          </div>
                          <div>
                            <div className="flex gap-2.5 text-[18px] text-green-600 bg-green-100 dark:bg-green-900/50 dark:text-green-400 rounded-md p-1">
                              <CircleCheck
                                className="bg-green-600 dark:bg-green-500 rounded-full"
                                color="white"
                              />
                              <span>
                                {remainingStock <= 0
                                  ? "Max in cart"
                                  : "Added to cart"}
                              </span>
                            </div>
                            <Button
                              className="mt-2 w-full cursor-pointer text-green-600 border-green-600 disabled:opacity-50 disabled:cursor-not-allowed"
                              variant={"outline"}
                              disabled={remainingStock <= 0}
                              onClick={(e) => {
                                e.preventDefault();
                                e.stopPropagation();
                                handleAddToCart(product);
                              }}
                            >
                              {remainingStock <= 0
                                ? "Limit Reached"
                                : "Add to Cart"}
                            </Button>
                          </div>
                        </>
                      ) : (
                        <>
                          <Button
                            className="w-full cursor-pointer mt-auto disabled:opacity-50 disabled:cursor-not-allowed"
                            disabled={totalStock <= 0 || remainingStock <= 0}
                            onClick={(e) => {
                              e.preventDefault();
                              e.stopPropagation();
                              handleAddToCart(product);
                            }}
                          >
                            {totalStock <= 0 || remainingStock <= 0
                              ? "Out of Stock"
                              : "Add to Cart"}
                          </Button>
                        </>
                      )}
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          {fetched ? (
            <div className="flex justify-center gap-3 mt-10">
              <Button
                variant="outline"
                disabled={currentPage === 1}
                onClick={() => setCurrentPage((prev) => prev - 1)}
                className="cursor-pointer"
              >
                Previous
              </Button>

              <span className="flex items-center text-sm font-medium">
                {currentPage} / {totalPages}
              </span>

              <Button
                variant="outline"
                disabled={currentPage === totalPages}
                onClick={() => setCurrentPage((prev) => prev + 1)}
                className="cursor-pointer"
              >
                Next
              </Button>
            </div>
          ) : (
            <div> </div>
          )}
        </div>
      ) : (
        <ProductsSkeleton />
      )}
    </>
  );
}
