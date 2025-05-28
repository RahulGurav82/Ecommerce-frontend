import React from "react";
import { Button } from "../ui/button";
import { Minus, Plus, Trash } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { deleteCartItem, updateCartQuantity } from "@/store/shop/cart-slice";
import { toast } from "sonner";

const UserCartContent = ({ cartItem }) => {
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const {cartItems} = useSelector(state => state.shopCart)
  const { productList } = useSelector(
    (state) => state.shoppingProducts
  );
  const handleCartItemDelete = (getCartItem) => {
    dispatch(
      deleteCartItem({ userId: user?.id, productId: getCartItem?.productId })
    ).then((data) => {
      if(data?.payload?.success) {
        toast("Cart Item is Deleted successfully");
      }
    })
  };

  const handleUpdateQuantity = (getCartItem, typeOfAction) => {
    if(typeOfAction == 'add') {
          let getCartItems = cartItems.items || [];

    if(getCartItems.length) {
      const indexOfCurrentCartItem = getCartItems.findIndex(item => item.productId === getCartItem.productId);

      const getCurrentProductIndex = productList.findIndex(product => product._id === getCartItem?.productId);
      const getTotalStock = productList[getCurrentProductIndex].totalStock;
      if(indexOfCurrentCartItem > -1) {
        const getQuantity = getCartItems[indexOfCurrentCartItem].quantity;
        if(getQuantity + 1 > getTotalStock) {
          toast.warning(`only ${getQuantity} quantity can be added.`)
          return
        }
      }
    }
    }

    dispatch(updateCartQuantity({userId : user?.id, productId : getCartItem?.productId, quantity : 
      typeOfAction === 'add' ?
      getCartItem?.quantity + 1 : getCartItem?.quantity - 1
    })).then((data) => {
      if(data?.payload?.success) {
        toast("Cart Item is updated successfully");
      }
    })
  }

  return (
    <div className="flex items-center space-x-4">
      <img
        src={cartItem?.image}
        alt={cartItem?.title}
        className="w-20 h-20 rounded object-cover"
      />
      <div className="flex-1">
        <h3 className="font-extrabold">{cartItem?.title}</h3>
        <div className="flex items-center gap-2 mt-1">
          <Button
            onClick={() => handleUpdateQuantity(cartItem, "minus")}
            variant="outline"
            className="h-8 w-8 rounded-full"
            size="icon"
            disabled={cartItem?.quantity === 1}
          >
            <Minus className="w-4 h-4" />
            <span className="sr-only">Decrease</span>
          </Button>
          <span className="font-semibold">{cartItem?.quantity}</span>
          <Button
            onClick={() => handleUpdateQuantity(cartItem, "add")}
            variant="outline"
            className="h-8 w-8 rounded-full"
            size="icon"
          >
            <Plus className="w-4 h-4" />
            <span className="sr-only">Increase</span>
          </Button>
        </div>
      </div>
      <div className="flex flex-col items-end">
        <p className="font-semibold">
          ₹
          {(
            (cartItem?.salePrice > 0 ? cartItem?.salePrice : cartItem?.price) *
            cartItem?.quantity
          ).toFixed(2)}
        </p>
        <Trash
          onClick={() => handleCartItemDelete(cartItem)}
          className="cursor-pointer mt-1"
          size={20}
        />
      </div>
    </div>
  );
};

export default UserCartContent;
