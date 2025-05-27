import { capturePayment } from '@/store/shop/order-slice';
import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'

const PaypalReturnPage = () => {

  const dispatch = useDispatch();
  const location = useDispatch();
  const params = new URLSearchParams(location.search)
  const paymentId = params.get('paymentId');
  const payerId = params.get('PayerID')
  
  useEffect(() => {
    if(payerId && payerId) {
      const getCurrentOrderId = JSON.parse(sessionStorage.getItem('currentOrderId'));

      dispatch(capturePayment({orderId : getCurrentOrderId, paypalOrderId : paymentId}))
      .then((data) => {
        if(data?.payload?.success){
          sessionStorage.removeItem('currentOrderId')
          window.location.href = '/shop/payment-success'
        }
      })
    }
  }, [paymentId, payerId, dispatch])


  return (
    <div>Payment proccessing</div>
  )
}

export default PaypalReturnPage