import React from 'react'
import { Card, CardContent, CardFooter } from '../ui/card'
import { Label } from '../ui/label'
import { Button } from '../ui/button'

const AddressCard = ({addressInfo, handleDeleteAddress, handleEditAddress, setcurrentSelectedAddress, selectedId}) => {
  return (
    <Card className={`cursor-pointer ${selectedId?._id === addressInfo?._id ? 'border-red-900 border-[4px]' : 'border-black'}'`} onClick={setcurrentSelectedAddress ? () => setcurrentSelectedAddress(addressInfo) : null}>
        <CardContent className={` grid p-4 gap-4`}>
            <Label> Address : {addressInfo?.address}</Label>
            <Label>City : {addressInfo?.city}</Label>
            <Label>pincode : {addressInfo?.pincode}</Label>
            <Label>Phone : {addressInfo?.phone}</Label>
            <Label>Notes : {addressInfo?.notes}</Label>
        </CardContent>
        <CardFooter className='flex justify-between p-4'>
            <Button onClick={()=> handleEditAddress(addressInfo)}>Edit</Button>
            <Button onClick={()=> handleDeleteAddress(addressInfo)}>Delete</Button>
        </CardFooter>
    </Card>
  )
}

export default AddressCard