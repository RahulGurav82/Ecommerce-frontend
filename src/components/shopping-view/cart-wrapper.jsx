import React from "react";
import { SheetContent, SheetHeader, SheetTitle } from "../ui/sheet";
import { Button } from "../ui/button";
import UserCartContent from "./cart-items-content";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Badge } from "../ui/badge";
import { cn } from "@/lib/utils";
import { ShoppingCart } from "lucide-react";

const UserCartWrapper = ({ cartItems, setOpenCartSheet }) => {
  const navigate = useNavigate();
  
  const totalCartAmount = cartItems.reduce(
    (sum, currentItem) => sum + (currentItem?.salePrice || currentItem?.price) * currentItem?.quantity,
    0
  );

  const cartItemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.3 }
    },
    exit: { opacity: 0, x: -50 }
  };

  return (
    <SheetContent className="sm:max-w-md flex flex-col">
      <SheetHeader className="text-left">
        <SheetTitle className="flex items-center gap-2">
          Your Cart
          {cartItems.length > 0 && (
            <Badge variant="secondary" className="px-2 py-1">
              {cartItems.length} {cartItems.length === 1 ? 'item' : 'items'}
            </Badge>
          )}
        </SheetTitle>
      </SheetHeader>
      
      <div className="flex-1 overflow-y-auto py-4">
        <AnimatePresence>
          {cartItems.length > 0 ? (
            <motion.div 
              className="space-y-4"
              initial="hidden"
              animate="visible"
            >
              {cartItems.map((item) => (
                <motion.div
                  key={item.productId}
                  variants={cartItemVariants}
                  layout
                >
                  <UserCartContent cartItem={item} />
                </motion.div>
              ))}
            </motion.div>
          ) : (
            <motion.div 
              className="flex flex-col items-center justify-center h-full text-center py-8"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <div className="w-24 h-24 bg-muted rounded-full flex items-center justify-center mb-4">
                <ShoppingCart className="w-12 h-12 text-muted-foreground" />
              </div>
              <p className="text-lg font-medium mb-2">Your cart is empty</p>
              <p className="text-muted-foreground mb-6">Start shopping to add items to your cart</p>
              <Button 
                variant="default" 
                className="mt-4"
                onClick={() => {
                  setOpenCartSheet(false);
                  navigate('/shop/listing');
                }}
              >
                Continue Shopping
              </Button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {cartItems.length > 0 && (
        <motion.div 
          className={cn(
            "border-t pt-4 space-y-4 px-4",
            "sticky bottom-0 bg-background"
          )}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Subtotal</span>
              <span className="font-medium">₹{totalCartAmount.toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Shipping</span>
              <span className="font-medium">Free</span>
            </div>
          </div>
          <div className="flex justify-between text-lg font-bold">
            <span>Total</span>
            <span>₹{totalCartAmount.toFixed(2)}</span>
          </div>
          <Button 
            onClick={() => {
              setOpenCartSheet(false);
              navigate("/shop/checkout");
            }} 
            className="w-full mt-4"
            size="lg"
          >
            Proceed to Checkout
          </Button>
        </motion.div>
      )}
    </SheetContent>
  );
};

export default UserCartWrapper;