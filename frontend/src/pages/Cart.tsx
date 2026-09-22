import { toast } from "sonner";
import { Button } from "../components/ui/button";
import { Card, CardContent } from "../components/ui/card";
import { useAuth } from "../context/Authcontext";
import type { CartItem } from "../types/AuthTypes";
import { Link } from "react-router-dom";
import { checkInvalidImageOrNot, defaultImage } from "../api/product";
import type { IncreaseDecreaseQuantity } from "../types/categoryTypes";
import { checkout } from "../api/orderApi";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { CheckCircle2 } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogDescription,
} from "../components/ui/dialog";


export default function Cart() {
  const { currentUser, removeItem, totalValue, addToCart, clearCart } = useAuth();
  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const navigate = useNavigate();
  const setDefaultImg = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    if (!e.currentTarget.src.includes(defaultImage)) {
      e.currentTarget.src = defaultImage;
    }
  };

  const cartItems: CartItem[] = currentUser?.cart || [];

  const increaseQuantity = async ({ item, e }: IncreaseDecreaseQuantity) => {
    e.preventDefault()
    if (currentUser) {
      if (item.availableQuantity !== undefined && item.quantity >= item.availableQuantity) {
        toast.error(`Only ${item.availableQuantity} left in stock.`);
        return;
      }
      const newProduct = {
        ...item,
        quantity: 1
      }
      const response = await addToCart(newProduct)
      if (response.status == 400) {
        toast.error(response.message)
        return
      }
      if (response.status == 200) {
        toast.success(response.message)
        return
      }
    }
  };

  const decreaseQuantity = async ({ item, e }: IncreaseDecreaseQuantity) => {
    e.preventDefault()
    if (currentUser) {
      const newProduct = {
        ...item,
        quantity: -1
      }
      const response = await addToCart(newProduct)
      if (response.status == 400) {
        toast.error(response.message)
        return
      }
      if (response.status == 200) {
        toast.success("Item removed fromed cart. ")
        return
      }
    }
  };

  const handleCheckout = async () => {
    if (!currentUser) return;
    setIsCheckingOut(true);
    try {
      await checkout();
      clearCart();
      setShowSuccessModal(true);
    } catch (error: unknown) {
      const err = error as { response?: { data?: { message?: string } } };
      toast.error(err.response?.data?.message || 'Failed to place order.');
    } finally {
      setIsCheckingOut(false);
    }
  };

  const successDialog = (
    <Dialog open={showSuccessModal} onOpenChange={setShowSuccessModal}>
      <DialogContent className="sm:max-w-md text-center p-8 [&>button]:hidden">
        <div className="flex flex-col items-center justify-center space-y-4">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center animate-[bounce_1s_infinite]">
            <CheckCircle2 className="w-12 h-12 text-green-600" />
          </div>
          <DialogTitle className="text-2xl font-bold">Order Placed Successfully!</DialogTitle>
          <DialogDescription className="text-base text-gray-500">
            Thank you for shopping with us. Your order is being processed.
          </DialogDescription>
          <div className="w-full pt-4">
            <Button className="w-full cursor-pointer" onClick={() => {
              setShowSuccessModal(false);
              navigate('/');
            }}>
              Continue Shopping
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );

  if (cartItems.length === 0) {
    return (
      <>
        <div className="h-screen flex justify-center items-center text-xl font-semibold">
          Your cart is empty
        </div>
        {successDialog}
      </>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-4">
      <h1 className="text-3xl font-bold mb-6">
        My Cart
      </h1>

      {cartItems.map((item) => (
        <Link to={`/product/${item.id}`}> <Card key={item.id}>
          <CardContent className="p-4 flex items-center gap-4">

            {/* Image */}
            <img
              src={item.images && item.images.length > 0 && !checkInvalidImageOrNot(item.images[0]) ? item.images[0] : defaultImage}
              alt={item.title}
              className="w-24 h-24 object-cover rounded-lg"
              onError={setDefaultImg}
            />

            {/* Product Info */}
            <div className="flex-1">
              <h2 className="font-semibold text-lg">
                {item.title}
              </h2>

              <p className="text-sm text-gray-500">
                ₹{item?.price}
              </p>
            </div>

            {/* Quantity Controls */}
            <div className="flex items-center gap-2">
              <Button
                className="cursor-pointer"
                variant="outline"
                size="icon"
                onClick={(e) =>
                  decreaseQuantity({ item, e })
                }
              >
                -
              </Button>

              <span className="w-8 text-center font-medium">
                {item.quantity}
              </span>

              <Button
                className="cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                variant="outline"
                size="icon"
                disabled={item.availableQuantity !== undefined && item.quantity >= item.availableQuantity}
                onClick={(e) =>
                  increaseQuantity({ item, e })
                }
              >
                +
              </Button>
            </div>

            {/* Remove */}
            <Button
              variant="destructive"
              className="cursor-pointer"
              onClick={(e) => {
                e.preventDefault()
                removeItem(item.id.toString())
                toast.success('Item Removed')
              }}
            >
              Remove
            </Button>

          </CardContent>
        </Card></Link>
      ))}
      {/* Sticky Bottom Summary */}
      <div className="sticky bottom-0 mt-8 border-t bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/80">
        <div className="max-w-4xl mx-auto px-6 py-4 flex items-center justify-between">

          {/* Left Side */}
          <div>
            <p className="text-sm text-muted-foreground">
              Total Amount
            </p>

            <h2 className="text-2xl font-bold">
              ₹{totalValue}
            </h2>
          </div>

          {/* Right Side */}
          <Button
            size="lg"
            className="px-8 cursor-pointer"
            onClick={handleCheckout}
            disabled={isCheckingOut}
          >
            {isCheckingOut ? "Processing..." : "Proceed to Checkout"}
          </Button>

        </div>
      </div>

      {successDialog}
    </div>
  );
}