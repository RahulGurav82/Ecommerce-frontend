import React, { useEffect, useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../ui/table'
import { Button } from '../ui/button'
import { Dialog } from '../ui/dialog'
import AdminOrderDetailsView from './order-details'
import { useDispatch, useSelector } from 'react-redux'
import { getAllOrdersForAdmin, getOrderDetailsForAdmin, resetOrderDetails } from '@/store/admin/order-slice'
import { Badge } from '../ui/badge'

const AdminOrdersView = () => {

  const [openDetailsDialog, setOpenDetailsDialog] = useState(false);
  const {orderList, orderDetails} = useSelector(state => state.adminOrder);
  const dispatch = useDispatch();

  const handleFetchOrderDetails = (getId) => {
    dispatch(getOrderDetailsForAdmin(getId));
  }

  useEffect(() => {
    dispatch(getAllOrdersForAdmin())
  });

    useEffect(()=> {
      if(orderDetails !== null) setOpenDetailsDialog(true)
    }, [orderDetails])

  return (
    <Card>
      <CardHeader>
        <CardTitle>
           Order History
        </CardTitle>
      </CardHeader>
            <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Order Id</TableHead>
              <TableHead>Order Date</TableHead>
              <TableHead>Order Status</TableHead>
              <TableHead>Order Price</TableHead>
              <TableHead>
                <span className='sr-only'>Details</span>
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {
              orderList && orderList.length > 0 ?
              orderList.map(orderItem => <TableRow>
                 <TableCell>{orderItem?.id}</TableCell>
                 <TableCell>{orderItem?.orderDate.split('T')}</TableCell>
                 <TableCell>
                    <Badge className={`p-1 px-3 ${orderItem?.orderStatus === 'confirm' ? 'bg-green-500' : 'bg-black'}`}>
                      {orderItem?.orderStatus}
                    </Badge>
                  </TableCell>
                 <TableCell>{orderItem?.totalAmount}</TableCell>
                 <TableCell>
                  <Dialog open={() => {
                    setOpenDetailsDialog(false)
                    dispatch(resetOrderDetails())
                  }} onOpenChange={setOpenDetailsDialog}>
                    <Button onClick={() => handleFetchOrderDetails(orderItem._id)}>
                      View Details
                    </Button>
                    <AdminOrderDetailsView orderDetails={orderDetails} />                  
                  </Dialog>
                 </TableCell>
            </TableRow> ) : null
            }

          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}

export default AdminOrdersView