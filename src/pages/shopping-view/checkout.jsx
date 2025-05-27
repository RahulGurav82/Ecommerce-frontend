import React, { useState } from 'react'
import img from "../../assets/account.jpg"
import Address from '@/components/shopping-view/address'
import { useDispatch, useSelector } from 'react-redux'
import UserCartContent from '@/components/shopping-view/cart-items-content'
import { Button } from '@/components/ui/button'
import { createNewOrder } from '@/store/shop/order-slice'
import { useNavigate } from 'react-router-dom'
import { toast } from 'sonner'

const ShoppingCheckout = () => {
  const { cartItems } = useSelector(state => state.shopCart); 
  const { user } = useSelector(state => state.auth); 
  const { approvalUrl } = useSelector(state => state.shopOrder); 
  const [currentSelectedAddress, setcurrentSelectedAddress] = useState(null);
  // const [isPaymentStart, setIsPaymentStart] = useState(false);

  const dispatch = useDispatch();


    const totalCartAmount =
    cartItems && cartItems?.items?.length > 0
      ? cartItems.items.reduce(
          (sum, currentItem) =>
            sum +
            (currentItem?.salePrice > 0
              ? currentItem?.salePrice
              : currentItem?.price) *
              currentItem?.quantity, 0
        )
      : 0;

  const handleInitiatePaypalPayment = () => {

    if(currentSelectedAddress === null) {
      toast.success('Please Select one Address to procced');
      return;
    }
    console.log(cartItems)
    if(cartItems.items.length === 0) {
      toast.success('your cart is empty. please add items to procced');
      return;
    }
    const orderData = {
      userId : user?.id,
      cartId : cartItems?._id,
      cartItems : cartItems.items.map(singleCartItem => ({
          productId : singleCartItem?.productId,
          title : singleCartItem?.title,
          image : singleCartItem?.image,
          price : singleCartItem?.salePrice > 0 ? singleCartItem.salePrice : singleCartItem.price,
          quantity : singleCartItem?.quantity,
        })),
      addressInfo : {
        addressId : currentSelectedAddress?._id,
        address : currentSelectedAddress?.address,
        city : currentSelectedAddress?.city,
        pincode : currentSelectedAddress?.pincode,
        phone : currentSelectedAddress?.phone,
        notes : currentSelectedAddress?.notes
      },
      orderStatus : 'pending',
      paymentMethod : 'paypal', 
      paymentStatus : 'pending',
      totalAmount : totalCartAmount,
      orderDate : new Date(),
      orderUpdateDate : new Date(),
      paymentId : '',
      payerId : '',
    };


    dispatch(createNewOrder(orderData)).then((data) => {
      if(data?.payload?.success) {
        console.log(approvalUrl)
        // setIsPaymentStart(true)
        window.location.href = approvalUrl
      } else {
        // setIsPaymentStart(false)
      }
    })
  }


  return (
    <div className='flex flex-col'>
      <div className='relative h-[300px] w-full overflow-hidden'>
        <img
        src={img} 
        className='h-full w-full object-cover object-center'
        alt="" />
      </div>
      <div className='grid grid-cols-1 sm:grid-cols-2 gap-3 mt-5 p-5'>
        <Address setcurrentSelectedAddress={setcurrentSelectedAddress} />
        <div className='flex flex-col gap-4'>
          {
            cartItems && cartItems.items.length > 0 ?
            cartItems.items.map((item) => <UserCartContent cartItem={item} />) : null
          }
                <div className="mt-8 space-y-4">
        <div className="flex justify-between">
          <span className="font-bold">Total</span>
          <span className="font-bold">₹{totalCartAmount}</span>
        </div>
      </div>
      <div mt-4 w-full>
        <Button onClick={handleInitiatePaypalPayment} className='w-full'>Checkout with Paypal</Button>
      </div>
        </div>
      </div>
    </div>
  )
}

export default ShoppingCheckout