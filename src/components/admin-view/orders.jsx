import React, { useEffect, useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../ui/table'
import { Button } from '../ui/button'
import { Dialog } from '../ui/dialog'
import AdminOrderDetailsView from './order-details'
import { useDispatch, useSelector } from 'react-redux'
import { getAllOrdersForAdmin, getOrderDetailsForAdmin, resetOrderDetails } from '@/store/admin/order-slice'
import { Badge } from '../ui/badge'
import { Skeleton } from '../ui/skeleton'

const AdminOrdersView = () => {
  const [openDetailsDialog, setOpenDetailsDialog] = useState(false);
  const {orderList, orderDetails, loading} = useSelector(state => state.adminOrder);
  const dispatch = useDispatch();

  const handleFetchOrderDetails = (orderId) => {
    dispatch(getOrderDetailsForAdmin(orderId)).then(() => {
      setOpenDetailsDialog(true);
    });
  }

  useEffect(() => {
    dispatch(getAllOrdersForAdmin())
  }, [dispatch]);

  const getStatusBadgeColor = (status) => {
    switch(status) {
      case 'confirmed': return 'bg-green-500';
      case 'shipped': return 'bg-blue-500';
      case 'delivered': return 'bg-purple-500';
      case 'cancelled': return 'bg-red-500';
      default: return 'bg-gray-500';
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Order History</CardTitle>
      </CardHeader>
      <CardContent>
        {loading ? (
          <div className="space-y-4">
            {[...Array(5)].map((_, i) => (
              <Skeleton key={i} className="h-12 w-full" />
            ))}
          </div>
        ) : (
          <>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Order ID</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Amount</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {orderList?.length > 0 ? (
                  orderList.map(orderItem => (
                    <TableRow key={orderItem._id}>
                      <TableCell className="font-medium">
                        #{orderItem._id.slice(-6).toUpperCase()}
                      </TableCell>
                      <TableCell>
                        {new Date(orderItem.orderDate).toLocaleDateString()}
                      </TableCell>
                      <TableCell>
                        <Badge className={`capitalize ${getStatusBadgeColor(orderItem.orderStatus)}`}>
                          {orderItem.orderStatus}
                        </Badge>
                      </TableCell>
                      <TableCell>₹{orderItem.totalAmount.toFixed(2)}</TableCell>
                      <TableCell>
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => handleFetchOrderDetails(orderItem._id)}
                        >
                          View
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={5} className="text-center py-8">
                      No orders found
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>

            <Dialog 
              open={openDetailsDialog} 
              onOpenChange={(open) => {
                if (!open) {
                  setOpenDetailsDialog(false);
                  dispatch(resetOrderDetails());
                }
              }}
            >
              <AdminOrderDetailsView setOpenDetailsDialog={setOpenDetailsDialog} orderDetails={orderDetails} />
            </Dialog>
          </>
        )}
      </CardContent>
    </Card>
  )
}

export default AdminOrdersView