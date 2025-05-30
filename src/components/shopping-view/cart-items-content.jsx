import React from "react";
import { Button } from "../ui/button";
import { Minus, Plus, Trash } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { deleteCartItem, updateCartQuantity } from "@/store/shop/cart-slice";
import { toast } from "sonner";
import { motion } from "framer-motion";


const UserCartContent = ({ cartItem }) => {
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const { cartItems } = useSelector(state => state.shopCart);
  const { productList } = useSelector((state) => state.shoppingProducts);

  const handleCartItemDelete = (getCartItem) => {
    dispatch(
      deleteCartItem({ userId: user?.id, productId: getCartItem?.productId })
    ).then((data) => {
      if(data?.payload?.success) {
        toast.success("Item removed from cart", {
          description: <span className="text-sm text-gray-800">`{getCartItem?.title} has been removed`</span>,
        });
      }
    });
  };

  const handleUpdateQuantity = (getCartItem, typeOfAction) => {
    if(typeOfAction === 'add') {
      let getCartItems = cartItems.items || [];
      if(getCartItems.length) {
        const indexOfCurrentCartItem = getCartItems.findIndex(item => item.productId === getCartItem.productId);
        const getCurrentProductIndex = productList.findIndex(product => product._id === getCartItem?.productId);
        const getTotalStock = productList[getCurrentProductIndex]?.totalStock;
        
        if(indexOfCurrentCartItem > -1) {
          const getQuantity = getCartItems[indexOfCurrentCartItem].quantity;
          if(getQuantity + 1 > getTotalStock) {
            toast.warning(`Only ${getTotalStock} available in stock`, {
              description: <span className="text-sm text-gray-800">`You can't add more than available quantity`</span>
            });
            return;
          }
        }
      }
    }

    dispatch(updateCartQuantity({
      userId: user?.id, 
      productId: getCartItem?.productId, 
      quantity: typeOfAction === 'add' ? getCartItem?.quantity + 1 : getCartItem?.quantity - 1
    })).then((data) => {
      if(data?.payload?.success) {
        toast("Cart updated", {
          description: <span className="text-sm text-gray-800"> `Quantity updated to ${typeOfAction === 'add' ? getCartItem?.quantity + 1 : getCartItem?.quantity - 1}`</span>
        });
      }
    });
  };

  return (
    <motion.div 
      className="flex items-center gap-4 p-3 rounded-lg border bg-card"
      whileHover={{ scale: 1.01 }}
      transition={{ type: "spring", stiffness: 400, damping: 10 }}
    >
      <div className="relative">
        <img
          src={cartItem?.image}
          alt={cartItem?.title}
          className="w-16 h-16 rounded-md object-cover"
        />
        {cartItem?.salePrice > 0 && cartItem?.salePrice < cartItem?.price && (
          <span className="absolute -top-2 -right-2 bg-primary text-primary-foreground text-xs font-bold px-2 py-1 rounded-full">
            SALE
          </span>
        )}
      </div>
      
      <div className="flex-1 min-w-0">
        <h3 className="font-bold truncate">{cartItem?.title}</h3>
        <p className="text-sm text-muted-foreground">
          {cartItem?.color || 'One Color'} / {cartItem?.size || 'One Size'}
        </p>
        
        <div className="flex items-center gap-2 mt-2">
          <Button
            onClick={() => handleUpdateQuantity(cartItem, "minus")}
            variant="outline"
            className="h-8 w-8 rounded-full p-0"
            size="icon"
            disabled={cartItem?.quantity === 1}
          >
            <Minus className="w-3 h-3" />
            <span className="sr-only">Decrease</span>
          </Button>
          
          <span className="font-medium w-6 text-center">
            {cartItem?.quantity}
          </span>
          
          <Button
            onClick={() => handleUpdateQuantity(cartItem, "add")}
            variant="outline"
            className="h-8 w-8 rounded-full p-0"
            size="icon"
          >
            <Plus className="w-3 h-3" />
            <span className="sr-only">Increase</span>
          </Button>
        </div>
      </div>
      
      <div className="flex flex-col items-end gap-2">
        <div className="text-right">
          {cartItem?.salePrice > 0 && cartItem?.salePrice < cartItem?.price ? (
            <>
              <p className="font-bold text-primary">
                ₹{(cartItem.salePrice * cartItem.quantity).toFixed(2)}
              </p>
              <p className="text-xs text-muted-foreground line-through">
                ₹{(cartItem.price * cartItem.quantity).toFixed(2)}
              </p>
            </>
          ) : (
            <p className="font-bold">
              ₹{(cartItem.price * cartItem.quantity).toFixed(2)}
            </p>
          )}
        </div>
        
        <Button
          variant="ghost"
          size="icon"
          className="h-8 w-8 text-destructive hover:text-destructive"
          onClick={() => handleCartItemDelete(cartItem)}
        >
          <Trash className="w-4 h-4" />
          <span className="sr-only">Remove item</span>
        </Button>
      </div>
    </motion.div>
  );
};

export default UserCartContent;