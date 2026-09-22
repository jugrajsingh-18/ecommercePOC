import { useEffect, useState } from "react"
import { checkInvalidImageOrNot, defaultImage, getSpecificProduct } from "../api/product"
import { useParams } from "react-router-dom"
import { Button } from "../components/ui/button"
import { Card, CardContent } from "../components/ui/card"
import { Carousel, CarouselContent, CarouselItem } from "../components/ui/carousel"
import Autoplay from "embla-carousel-autoplay";
import type { CategoryProduct } from "../types/categoryTypes"
import { useAuth } from "../context/Authcontext"
import { toast } from "sonner"
import AuthDialog from "../components/Auth"
import SpecificProductSkeleton from "../components/skeleton/SpecificProductSkeleton"
import type { CartItem } from "../types/AuthTypes"


export default function Product() {
  const { currentUser, addToCart } = useAuth()
  const [showAuthDialog, setShowAuthDialog] = useState(false);
  const [product, setProduct] = useState<CategoryProduct | null>(null)
  const { id } = useParams()
  const setDefaultImg = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    if (!e.currentTarget.src.includes(defaultImage)) {
      e.currentTarget.src = defaultImage;
    }
  }
  useEffect(() => {
    const fetchProduct = async () => {
      if (id) {
        const res = await getSpecificProduct(id)
        if (res) {
          setProduct(res.data)
        }
      }
    }
    fetchProduct()
  }, [id])

  const itemInCart = currentUser?.cart?.find((it: CartItem) => it.id === product?.id);
  const currentInCart = itemInCart?.quantity || 0;
  const totalStock = product?.availableQuantity ?? 0;
  const remainingStock = Math.max(0, totalStock - currentInCart);
  const isOutOfStock = totalStock <= 0 || remainingStock <= 0;

  const [rawQuantity, setRawQuantity] = useState(1);
  const displayQuantity = remainingStock <= 0 ? 0 : Math.min(Math.max(1, rawQuantity), remainingStock);

  const increaseQuantity = () => {
    if (remainingStock <= 0) {
      toast.error("No more stock available.");
      return;
    }
    if (displayQuantity >= remainingStock) {
      toast.error(`Only ${remainingStock} more can be added to your cart.`);
      return;
    }
    setRawQuantity((prev) => Math.min(prev + 1, remainingStock));
  };

  const decreaseQuantity = () => {
    if (displayQuantity > 1) {
      setRawQuantity((prev) => Math.max(1, prev - 1));
    }
  };

  const handleAddToCart = async () => {
    if (!product) return;

    if (currentUser) {
      if (remainingStock <= 0) {
        toast.error(`Only ${totalStock} in stock. Maximum limit reached in cart.`);
        return;
      }
      if (displayQuantity > remainingStock) {
        toast.error(`You can only add up to ${remainingStock} more.`);
        return;
      }

      const newProduct = {
        ...product,
        id: product.id!,
        description: product.description || "",
        quantity: displayQuantity
      }
      const response = await addToCart(newProduct as unknown as CartItem)
      if (response.status == 400) {
        toast.error(response.message)
        return
      }
      if (response.status == 200) {
        toast.success(response.message)
        setRawQuantity(1);
        return
      }
    } else {
      setShowAuthDialog((prev) => !prev);
    }
  };


  if (!product) {
    return (
      // <div className="max-w-6xl mx-auto p-6">
      //   <div className="col-span-full flex justify-center items-center py-10">
      //       <Spinner className="w-10 h-10" />
      //     </div>
      // </div>
      <SpecificProductSkeleton />
    )
  }
  return (


    <div className="max-w-6xl mx-auto p-6">
      <div className="hidden">
        <AuthDialog setView={showAuthDialog} resetView={() => setShowAuthDialog(false)} />
      </div>
      <div className="grid md:grid-cols-2 gap-10">

        <Carousel
          plugins={[
            Autoplay({
              delay: 2000,
            }),
          ]}
          className="w-full"
        >
          <CarouselContent>
            {product.images.map(
              (image: string, index: number) => (
                <CarouselItem key={index}>
                  <Card>
                    <CardContent className="p-0">
                      <img
                        src={product.images && product.images.length > 0 && !checkInvalidImageOrNot(image) ? image : defaultImage}
                        alt={product.title}
                        className="w-full h-[450px] object-cover rounded-xl"
                        onError={setDefaultImg}
                      />
                    </CardContent>
                  </Card>
                </CarouselItem>
              )
            )}
          </CarouselContent>
        </Carousel>

        <div className="space-y-6">
          <h1 className="text-3xl font-bold">
            {product.title}
          </h1>

          <p className="text-muted-foreground">
            {product.description}
          </p>

          <p className="text-3xl font-semibold">
            ₹{product.price}
          </p>

          <span 
            className="inline-block px-3 py-1 rounded-full bg-muted text-muted-foreground text-sm truncate max-w-[200px]"
            title={product.category?.name || "Uncategorized"}
          >
            {product.category?.name || "Uncategorized"}
          </span>

          <div className="flex items-center gap-2">
            {totalStock <= 0 ? (
              <span className="text-sm font-medium text-red-600 bg-red-50 dark:bg-red-950/40 dark:text-red-400 px-2 py-1 rounded-md">
                Out of Stock
              </span>
            ) : remainingStock <= 0 ? (
              <span className="text-sm font-medium text-amber-600 bg-amber-50 dark:bg-amber-950/40 dark:text-amber-400 px-2 py-1 rounded-md">
                All {totalStock} in your cart (Stock limit reached)
              </span>
            ) : (
              <span className="text-sm font-medium text-green-600 bg-green-50 dark:bg-green-950/40 dark:text-green-400 px-2 py-1 rounded-md">
                {remainingStock} left in stock {currentInCart > 0 ? `(${currentInCart} in cart)` : ""}
              </span>
            )}
          </div>

          <div className="flex items-center gap-4">
            <p className="font-medium">
              Quantity:
            </p>

            <Button
              className="cursor-pointer"
              variant="outline"
              onClick={decreaseQuantity}
              disabled={remainingStock <= 0 || displayQuantity <= 1}
            >
              -
            </Button>

            <span className="text-lg font-semibold">
              {displayQuantity}
            </span>

            <Button
              className="cursor-pointer"
              variant="outline"
              onClick={increaseQuantity}
              disabled={remainingStock <= 0 || displayQuantity >= remainingStock}
            >
              +
            </Button>
          </div>

          <div className="flex gap-4 w-47">
            <Button
              className="flex-1 cursor-pointer"
              onClick={handleAddToCart}
              disabled={isOutOfStock}
            >
              {totalStock <= 0 ? "Out of Stock" : remainingStock <= 0 ? "Limit Reached" : "Add to Cart"}
            </Button>
          </div>
        </div>
      </div>

    </div>
  );

}
