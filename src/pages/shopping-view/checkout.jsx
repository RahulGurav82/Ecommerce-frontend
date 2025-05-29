import React, { useState } from "react";
import img from "../../assets/account.jpg";
import Address from "@/components/shopping-view/address";
import { useDispatch, useSelector } from "react-redux";
import UserCartContent from "@/components/shopping-view/cart-items-content";
import { Button } from "@/components/ui/button";
import {
  createRazorpayOrder,
  verifyRazorpayPayment,
} from "@/store/shop/order-slice";
import { toast } from "sonner";
import { loadScript } from "@/lib/utils";

const ShoppingCheckout = () => {
  const { cartItems } = useSelector((state) => state.shopCart);
  const { user } = useSelector((state) => state.auth);
  const [currentSelectedAddress, setcurrentSelectedAddress] = useState(null);
  const [isPaymentStart, setIsPaymentStart] = useState(false);

  const dispatch = useDispatch();

  const totalCartAmount =
    cartItems && cartItems?.items?.length > 0
      ? cartItems.items.reduce(
          (sum, currentItem) =>
            sum +
            (currentItem?.salePrice > 0
              ? currentItem?.salePrice
              : currentItem?.price) *
              currentItem?.quantity,
          0
        )
      : 0;

  const handleInitiatePaypalPayment = async () => {
    console.log("start")
    if (currentSelectedAddress === null) {
      toast.error("Please Select one Address to proceed");
      setIsPaymentStart(false);
      return;
    }

    if (cartItems?.items?.length === 0) {
      toast.error("Your cart is empty. Please add items to proceed");
      setIsPaymentStart(false);
      return;
    }

    const orderData = {
      userId: user?.id,
      cartId: cartItems?._id,
      cartItems: cartItems.items.map((singleCartItem) => ({
        productId: singleCartItem?.productId,
        title: singleCartItem?.title,
        image: singleCartItem?.image,
        price:
          singleCartItem?.salePrice > 0
            ? singleCartItem.salePrice
            : singleCartItem.price,
        quantity: singleCartItem?.quantity,
      })),
      addressInfo: {
        addressId: currentSelectedAddress?._id,
        address: currentSelectedAddress?.address,
        city: currentSelectedAddress?.city,
        pincode: currentSelectedAddress?.pincode,
        phone: currentSelectedAddress?.phone,
        notes: currentSelectedAddress?.notes,
      },
      orderStatus: "pending",
      paymentMethod: "razorpay",
      paymentStatus: "pending",
      totalAmount: totalCartAmount,
      orderDate: new Date(),
      orderUpdateDate: new Date(),
      paymentId: "",
      payerId: "",
    };

    try {
      await loadScript("https://checkout.razorpay.com/v1/checkout.js");

      dispatch(createRazorpayOrder(orderData)).then((data) => {
        if (data?.payload?.success) {
          const { razorpayOrderId, key, order } = data.payload;
          console.log(order)

          const options = {
            key: "rzp_test_w8KI1i1lZkXlhi",
            amount: order.totalAmount * 100,
            currency: "INR",
            name: "MAYA",
            description: "Order Payment",
            order_id: razorpayOrderId,
            handler: async function (response) {
              const verificationData = {
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_order_id: response.razorpay_order_id,
                razorpay_signature: response.razorpay_signature,
                orderId: order._id,
              };

              dispatch(verifyRazorpayPayment(verificationData)).then((data) => {
                if(data?.payload?.success) {
                  toast(data?.payload?.message)
                  window.location.href = "/shop/account"
                }
              });

            },
            prefill: {
              name: user?.name,
              email: user?.email,
              contact: currentSelectedAddress?.phone,
            },
            theme: {
              color: "#3399cc",
            },
          };

          const rzp = new window.Razorpay(options);
          rzp.open();
        } else {
          setIsPaymentStart(false);
        }
      });
    } catch (error) {
      console.error(error);
      setIsPaymentStart(false);
      toast.error("Error initializing Razorpay");
    }
  };

  return (
    <div className="flex flex-col">
      <div className="relative h-[300px] w-full overflow-hidden">
        <img
          src={img}
          className="h-full w-full object-cover object-center"
          alt=""
        />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-5 p-5">
        <Address
          selectedId={currentSelectedAddress}
          setcurrentSelectedAddress={setcurrentSelectedAddress}
        />
        <div className="flex flex-col gap-4">
          {cartItems && cartItems?.items?.length > 0
            ? cartItems.items.map((item, idx) => (
                <UserCartContent key={idx} cartItem={item} />
              ))
            : null}
          <div className="mt-8 space-y-4">
            <div className="flex justify-between">
              <span className="font-bold">Total</span>
              <span className="font-bold">₹{totalCartAmount}</span>
            </div>
          </div>
          <div className="mt-4 w-full">
            <Button onClick={handleInitiatePaypalPayment} className="w-full cursor-pointer">
              {isPaymentStart
                ? "Payment Processing start"
                : "Checkout"}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShoppingCheckout;
