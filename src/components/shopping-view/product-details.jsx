import React, { useEffect, useState } from "react";
import { Dialog, DialogContent } from "../ui/dialog";
import { Button } from "../ui/button";
import { Separator } from "../ui/separator";
import { Avatar, AvatarFallback } from "../ui/avatar";
import { Input } from "../ui/input";
import { useDispatch, useSelector } from "react-redux";
import { addTocart, fetchCartItems } from "@/store/shop/cart-slice";
import { toast } from "sonner";
import { setProductDetails } from "@/store/shop/product-slice";
import { Label } from "../ui/label";
import StarRatingComponent from "../common/star-rating";
import { addReviews, getReviews } from "@/store/shop/review-slice";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { ShoppingCart } from "lucide-react";
import { Badge } from "../ui/badge";

const ProductDetailsDialog = ({ open, setOpen, productDetails }) => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { cartItems } = useSelector((state) => state.shopCart);
  const { reviews } = useSelector((state) => state.shopReview);
  const [reviewMsg, setReviewMsg] = useState("");
  const [rating, setRating] = useState(0);
  const [isImageLoaded, setIsImageLoaded] = useState(false);

  const handleRatingChange = (getRating) => {
    setRating(getRating);
  };

  const handleAddtoCart = (getCurrentProductId, getTotalStock) => {
    let getCartItems = cartItems.items || [];

    if (getCartItems.length) {
      const indexOfCurrentItem = getCartItems.findIndex(
        (item) => item.productId === getCurrentProductId
      );
      if (indexOfCurrentItem > -1) {
        const getQuantity = getCartItems[indexOfCurrentItem].quantity;
        if (getQuantity + 1 > getTotalStock) {
          toast.warning(
            `Only ${getTotalStock - getQuantity} more can be added`
          );
          return;
        }
      }
    }

    dispatch(
      addTocart({
        userId: user?.id,
        productId: getCurrentProductId,
        quantity: 1,
      })
    ).then((data) => {
      if (data?.payload?.success) {
        dispatch(fetchCartItems(user?.id));
        toast.success("Added to cart", {
          description: (
            <span className="text-sm text-gray-800">
              {" "}
              `{productDetails?.title} has been added to your cart`
            </span>
          ),
        });
      }
    });
  };

  const handleDialogClose = () => {
    setOpen(false);
    dispatch(setProductDetails());
    setRating(0);
    setReviewMsg("");
    setIsImageLoaded(false);
  };

  const handleAddReview = () => {
    dispatch(
      addReviews({
        productId: productDetails?._id,
        userId: user?.id,
        username: user?.username,
        reviewMessage: reviewMsg,
        reviewValue: rating,
      })
    ).then((data) => {
      if (data?.payload?.success) {
        dispatch(getReviews(productDetails?._id));
        toast.success("Review added");
        setRating(0);
        setReviewMsg("");
      }
    });
  };

  useEffect(() => {
    if (productDetails !== null) {
      dispatch(getReviews(productDetails?._id));
    }
  }, [productDetails]);

  const averageReviews =
    reviews && reviews.length > 0
      ? reviews.reduce((sum, reviewItem) => sum + reviewItem.reviewValue, 0) /
        reviews.length
      : 0;

  return (
    <Dialog open={open} onOpenChange={handleDialogClose}>
      <DialogContent className="grid grid-cols-1 lg:grid-cols-2 gap-8 p-4 sm:p-6 max-w-[95vw] sm:max-w-[90vw] lg:max-w-[80vw] xl:max-w-[70vw]">
        {/* Product Image */}
        <motion.div
          className="relative overflow-hidden rounded-lg bg-muted/50"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
        >
          <AnimatePresence>
            {!isImageLoaded && (
              <motion.div
                className="absolute inset-0 bg-muted animate-pulse"
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
              />
            )}
          </AnimatePresence>
          <motion.img
            src={productDetails?.image}
            alt={productDetails?.title}
            className="aspect-square w-full object-cover"
            initial={{ opacity: 0 }}
            animate={{ opacity: isImageLoaded ? 1 : 0 }}
            onLoad={() => setIsImageLoaded(true)}
            transition={{ duration: 0.3 }}
          />
          {productDetails?.salePrice > 0 && (
            <Badge className="absolute top-4 left-4 bg-red-500 hover:bg-red-600 text-white shadow-lg">
              {Math.round(
                (1 - productDetails.salePrice / productDetails.price) * 100
              )}
              % OFF
            </Badge>
          )}
        </motion.div>

        {/* Product Details */}
        <motion.div
          className="space-y-6"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2, duration: 0.3 }}
        >
          <div>
            <h1 className="text-2xl sm:text-3xl font-extrabold leading-tight">
              {productDetails?.title}
            </h1>
            <p className="text-muted-foreground text-lg sm:text-xl mt-3">
              {productDetails?.description}
            </p>
          </div>

          {/* Price Section */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <p
                className={cn(
                  "text-2xl sm:text-3xl font-bold text-primary",
                  productDetails?.salePrice > 0 &&
                    "line-through text-muted-foreground text-xl"
                )}
              >
                ₹{productDetails?.price}
              </p>
              {productDetails?.salePrice > 0 && (
                <p className="text-2xl sm:text-3xl font-bold text-primary">
                  ₹{productDetails?.salePrice}
                </p>
              )}
            </div>
            <div className="flex items-center gap-2">
              <StarRatingComponent rating={averageReviews} />
              <span className="text-muted-foreground">
                ({reviews?.length || 0})
              </span>
            </div>
          </div>

          {/* Stock Status */}
          {productDetails?.totalStock < 10 &&
            productDetails?.totalStock > 0 && (
              <div className="text-sm text-orange-500">
                Only {productDetails?.totalStock} left in stock!
              </div>
            )}

          {/* Add to Cart Button */}
          <motion.div whileTap={{ scale: 0.98 }} className="mt-4">
            {productDetails?.totalStock === 0 ? (
              <Button
                variant="outline"
                className="w-full opacity-60 cursor-not-allowed"
                disabled
              >
                Out Of Stock
              </Button>
            ) : (
              <Button
                onClick={() =>
                  handleAddtoCart(
                    productDetails?._id,
                    productDetails.totalStock
                  )
                }
                className="w-full gap-2"
                size="lg"
              >
                <ShoppingCart className="h-5 w-5" />
                Add to cart
              </Button>
            )}
          </motion.div>

          <Separator className="my-6" />

          {/* Reviews Section */}
          <div className="max-h-[40vh] overflow-y-auto pr-2">
            <h2 className="text-xl font-bold mb-4">Customer Reviews</h2>

            <AnimatePresence>
              {reviews && reviews.length > 0 ? (
                <motion.div className="space-y-6">
                  {reviews.map((reviewItem, idx) => (
                    <motion.div
                      key={idx}
                      className="flex gap-4"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: idx * 0.1 }}
                    >
                      <Avatar className="w-10 h-10 border">
                        <AvatarFallback className="bg-primary text-primary-foreground">
                          {reviewItem?.username[0].toUpperCase()}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <h3 className="font-bold">{reviewItem?.username}</h3>
                          <div className="flex items-center gap-1">
                            <StarRatingComponent
                              rating={reviewItem?.reviewValue}
                            />
                          </div>
                        </div>
                        <p className="text-muted-foreground mt-1">
                          {reviewItem?.reviewMessage}
                        </p>
                      </div>
                    </motion.div>
                  ))}
                </motion.div>
              ) : (
                <motion.p
                  className="text-muted-foreground text-center py-8"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                >
                  No reviews yet. Be the first to review!
                </motion.p>
              )}
            </AnimatePresence>

            {/* Add Review Form */}
            {user && (
              <motion.div
                className="mt-8 space-y-4 border-t pt-6"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
              >
                <Label>Write a review</Label>
                <div className="flex gap-1">
                  <StarRatingComponent
                    handleRatingChange={handleRatingChange}
                    rating={rating}
                  />
                </div>
                <Input
                  name="reviewMsg"
                  value={reviewMsg}
                  onChange={(e) => setReviewMsg(e.target.value)}
                  placeholder="Share your thoughts about this product..."
                  className="h-24"
                />
                <Button
                  disabled={reviewMsg.trim() === "" || rating === 0}
                  onClick={handleAddReview}
                  className="w-full"
                >
                  Submit Review
                </Button>
              </motion.div>
            )}
          </div>
        </motion.div>
      </DialogContent>
    </Dialog>
  );
};

export default ProductDetailsDialog;
