import React from "react";
import { Card, CardContent, CardFooter } from "../ui/card";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { brandOptionsMap, categoryOptionsMap } from "@/config";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { ShoppingCart } from "lucide-react";

const ShoppingProductTile = ({ product, handleGetProductDetails, handleAddtoCart }) => {
  const [isHovered, setIsHovered] = React.useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.3 }}
      whileHover={{ y: -5 }}
    >
      <Card 
        className="w-full max-w-sm mx-auto overflow-hidden transition-all hover:shadow-lg"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <motion.div 
          onClick={() => handleGetProductDetails(product?._id, product?.totalStock)}
          className="cursor-pointer"
        >
          <div className="relative overflow-hidden">
            <motion.img
              src={product?.image}
              alt={product?.title}
              className="w-full h-[250px] sm:h-[300px] object-cover"
              initial={{ scale: 1 }}
              animate={{ scale: isHovered ? 1.05 : 1 }}
              transition={{ duration: 0.3 }}
            />
            
            {/* Badges */}
            <div className="absolute top-2 left-2 flex flex-col gap-2">
              {product?.totalStock === 0 ? (
                <Badge className="bg-red-500 hover:bg-red-600 shadow-md">
                  Out Of Stock
                </Badge>
              ) : product?.totalStock < 10 ? (
                <Badge className="bg-orange-500 hover:bg-orange-600 shadow-md">
                  Only {product?.totalStock} left
                </Badge>
              ) : product?.salePrice > 0 ? (
                <Badge className="bg-red-500 hover:bg-red-600 shadow-md">
                  {Math.round((1 - product.salePrice/product.price) * 100)}% OFF
                </Badge>
              ) : null}
            </div>
          </div>

          <CardContent className="p-4 space-y-2">
            <h2 className="text-lg sm:text-xl font-bold line-clamp-2 h-[3rem]">
              {product?.title}
            </h2>
            
            <div className="flex justify-between items-center text-sm">
              <span className="text-muted-foreground">
                {categoryOptionsMap[product?.category]}
              </span>
              <span className="text-muted-foreground">
                {brandOptionsMap[product?.brand]}
              </span>
            </div>

            <div className="flex items-center gap-2">
              <span
                className={cn(
                  "text-lg font-semibold text-primary",
                  product?.salePrice > 0 && "line-through text-muted-foreground text-sm"
                )}
              >
                ₹{product?.price}
              </span>
              {product?.salePrice > 0 && (
                <span className="text-lg font-semibold text-primary">
                  ₹{product?.salePrice}
                </span>
              )}
            </div>
          </CardContent>
        </motion.div>

        <CardFooter>
          <motion.div 
            className="w-full"
            whileTap={{ scale: 0.95 }}
          >
            {product?.totalStock === 0 ? (
              <Button 
                variant="outline" 
                className="w-full opacity-60 cursor-not-allowed"
                disabled
              >
                Out Of Stock
              </Button>
            ) : (
              <Button 
                onClick={(e) => {
                  e.stopPropagation();
                  handleAddtoCart(product._id, product?.totalStock);
                }}
                className="w-full gap-2"
              >
                <ShoppingCart className="h-4 w-4" />
                Add to cart
              </Button>
            )}
          </motion.div>
        </CardFooter>
      </Card>
    </motion.div>
  );
};

export default ShoppingProductTile;