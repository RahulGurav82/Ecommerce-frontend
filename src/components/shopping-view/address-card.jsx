import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardFooter, CardHeader } from '../ui/card';
import { Label } from '../ui/label';
import { Button } from '../ui/button';
import { CheckIcon, Edit2Icon, Trash2Icon } from 'lucide-react';

const AddressCard = ({
  addressInfo,
  handleDeleteAddress,
  handleEditAddress,
  setcurrentSelectedAddress,
  selectedId
}) => {
  const isSelected = selectedId?._id === addressInfo?._id;

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.2 }}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
    >
      <Card
        className={`relative cursor-pointer transition-all duration-200 overflow-hidden ${
          isSelected
            ? 'border-primary border-2 shadow-lg ring-2 ring-primary/20'
            : 'border-border hover:border-primary/50'
        }`}
        onClick={setcurrentSelectedAddress ? () => setcurrentSelectedAddress(addressInfo) : null}
      >
        {/* Selection indicator */}
        {isSelected && (
          <div className="absolute top-2 right-2 bg-primary rounded-full p-1">
            <CheckIcon className="h-4 w-4 text-white" />
          </div>
        )}

        <CardHeader className="pb-2">
          <h3 className="font-semibold text-lg">{addressInfo?.name || 'Delivery Address'}</h3>
        </CardHeader>

        <CardContent className="grid gap-2 p-4 pt-0">
          <div className="flex items-start gap-2">
            <span className="text-muted-foreground min-w-[70px]">Address:</span>
            <Label className="font-normal">{addressInfo?.address}</Label>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-muted-foreground min-w-[70px]">City:</span>
            <Label className="font-normal">{addressInfo?.city}</Label>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-muted-foreground min-w-[70px]">Pincode:</span>
            <Label className="font-normal">{addressInfo?.pincode}</Label>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-muted-foreground min-w-[70px]">Phone:</span>
            <Label className="font-normal">{addressInfo?.phone}</Label>
          </div>
          {addressInfo?.notes && (
            <div className="flex items-start gap-2">
              <span className="text-muted-foreground min-w-[70px]">Notes:</span>
              <Label className="font-normal">{addressInfo?.notes}</Label>
            </div>
          )}
        </CardContent>

        <CardFooter className="flex justify-between p-4 pt-0 border-t">
          <Button
            variant="outline"
            size="sm"
            className="gap-2"
            onClick={(e) => {
              e.stopPropagation();
              handleEditAddress(addressInfo);
            }}
          >
            <Edit2Icon className="h-4 w-4" />
            Edit
          </Button>
          <Button
            variant="outline"
            size="sm"
            className="gap-2 text-destructive hover:text-destructive hover:bg-destructive/10 border-destructive/20"
            onClick={(e) => {
              e.stopPropagation();
              handleDeleteAddress(addressInfo);
            }}
          >
            <Trash2Icon className="h-4 w-4" />
            Delete
          </Button>
        </CardFooter>
      </Card>
    </motion.div>
  );
};

export default AddressCard;