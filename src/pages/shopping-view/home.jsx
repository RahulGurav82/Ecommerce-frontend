import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Airplay,
  BabyIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  CloudLightning,
  Heater,
  Images,
  Shirt,
  ShirtIcon,
  ShoppingBasket,
  UmbrellaIcon,
  WashingMachine,
  WatchIcon,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchAllFilteredProducts,
  fetchProductDetails,
} from "@/store/shop/product-slice";
import ShoppingProductTile from "@/components/shopping-view/product-tile";
import { useNavigate } from "react-router-dom";
import { addTocart, fetchCartItems } from "@/store/shop/cart-slice";
import { toast } from "sonner";
import ProductDetailsDialog from "@/components/shopping-view/product-details";
import { getFeatureImage } from "@/store/common-slice";
import { motion, AnimatePresence } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

const ShoppingHome = () => {
  const { featureImageList } = useSelector(state => state.commonFeature);
  const slides = featureImageList;
  const [currentSlide, setCurrentSlide] = useState(0);
  const [direction, setDirection] = useState(1); // 1 for forward, -1 for backward
  const dispatch = useDispatch();
  const { productList, productDetails } = useSelector(
    (state) => state.shoppingProducts
  );

  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);
  const [openDetailsDialog, setOpenDetailsDialog] = useState(false);

  const handleAddtoCart = (getCurrentProductId) => {
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
          description: <span className="text-sm text-gray-800">IItem has been added to your shopping cart</span>,
        });
      }
    });
  };

  const handleGetProductDetails = (id) => {
    dispatch(fetchProductDetails(id));
  };

  const CategoriesWithIcons = [
    { id: "men", label: "Men", icon: ShirtIcon, color: "bg-blue-100 text-blue-600" },
    { id: "women", label: "Women", icon: CloudLightning, color: "bg-pink-100 text-pink-600" },
    { id: "kids", label: "Kids", icon: BabyIcon, color: "bg-purple-100 text-purple-600" },
    { id: "accessories", label: "Accessories", icon: WatchIcon, color: "bg-yellow-100 text-yellow-600" },
    { id: "footwear", label: "Footwear", icon: UmbrellaIcon, color: "bg-green-100 text-green-600" },
  ];

  const BrandWithIcons = [
    { id: "nike", label: "Nike", icon: Shirt, color: "bg-red-50" },
    { id: "adidas", label: "Adidas", icon: WashingMachine, color: "bg-blue-50" },
    { id: "puma", label: "Puma", icon: ShoppingBasket, color: "bg-black text-white" },
    { id: "levi", label: "Levi's", icon: Airplay, color: "bg-indigo-50" },
    { id: "zara", label: "Zara", icon: Images, color: "bg-white" },
    { id: "h&m", label: "H&M", icon: Heater, color: "bg-gray-50" },
  ];

  const prevSlide = () => {
    setDirection(-1);
    setCurrentSlide((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
  };

  const nextSlide = () => {
    setDirection(1);
    setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
  };

  const handleNavigateToListingPage = (getCurrentItem, section) => {
    sessionStorage.removeItem("filters");
    const currentFilter = {
      [section]: [getCurrentItem.id],
    };

    sessionStorage.setItem("filters", JSON.stringify(currentFilter));
    navigate(`/shop/listing`);
  };

  useEffect(() => {
    if (productDetails !== null) setOpenDetailsDialog(true);
  }, [productDetails]);

  useEffect(() => {
    const timer = setInterval(() => {
      setDirection(1);
      setCurrentSlide((prevSlide) => (prevSlide + 1) % slides.length);
    }, 5000);

    return () => clearInterval(timer);
  }, [featureImageList]);

  useEffect(() => {
    dispatch(
      fetchAllFilteredProducts({
        filterParams: {},
        sortParams: "price-lowtohigh",
      })
    );
  }, [dispatch]);

  useEffect(() => {
    dispatch(getFeatureImage());
  }, [dispatch]);

  const slideVariants = {
    enter: (direction) => ({
      x: direction > 0 ? "100%" : "-100%",
      opacity: 0
    }),
    center: {
      x: 0,
      opacity: 1,
      transition: {
        x: { type: "spring", stiffness: 300, damping: 30 },
        opacity: { duration: 0.2 }
      }
    },
    exit: (direction) => ({
      x: direction > 0 ? "-100%" : "100%",
      opacity: 0,
      transition: {
        x: { type: "spring", stiffness: 300, damping: 30 },
        opacity: { duration: 0.2 }
      }
    })
  };

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Carousel */}
      <div className="relative w-full h-[300px] md:h-[600px] overflow-hidden bg-gradient-to-r from-primary/10 to-secondary/10">
        <AnimatePresence custom={direction} initial={false}>
          {featureImageList && featureImageList.length > 0 && (
            <motion.div
              key={currentSlide}
              custom={direction}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              className="absolute top-0 left-0 w-full h-full"
            >
              <img
                src={featureImageList[currentSlide]?.image}
                alt={`Slide ${currentSlide}`}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end pb-16">
                <div className="container mx-auto px-4 text-white">
                  <motion.h1 
                    initial={{ y: 50, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.3 }}
                    className="text-4xl md:text-5xl font-bold mb-4"
                  >
                    {featureImageList[currentSlide]?.title}
                  </motion.h1>
                  <motion.p
                    initial={{ y: 50, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.5 }}
                    className="text-xl md:text-2xl mb-8 max-w-2xl"
                  >
                    {featureImageList[currentSlide]?.description}
                  </motion.p>
                  <motion.div
                    initial={{ y: 50, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.7 }}
                  >
                    <Button 
                      size="lg" 
                      className="text-lg"
                      onClick={() => navigate('/shop/listing')}
                    >
                      Shop Now
                    </Button>
                  </motion.div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <Button
          onClick={prevSlide}
          className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-white/80 hover:bg-white z-20 shadow-lg"
          variant="outline"
          size="icon"
        >
          <ChevronLeftIcon className="w-5 h-5" />
        </Button>
        <Button
          onClick={nextSlide}
          className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-white/80 hover:bg-white z-20 shadow-lg"
          variant="outline"
          size="icon"
        >
          <ChevronRightIcon className="w-5 h-5" />
        </Button>

        <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2 z-20">
          {featureImageList?.map((_, idx) => (
            <button
              key={idx}
              onClick={() => {
                setDirection(idx > currentSlide ? 1 : -1);
                setCurrentSlide(idx);
              }}
              className={`w-3 h-3 rounded-full transition-all ${
                idx === currentSlide ? "bg-white w-6" : "bg-white/50"
              }`}
              aria-label={`Go to slide ${idx + 1}`}
            />
          ))}
        </div>
      </div>

      {/* Categories Section */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-3xl font-bold text-center mb-12"
          >
            Shop By Category
          </motion.h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
            {CategoriesWithIcons.map((item) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                whileHover={{ y: -5 }}
              >
                <Card
                  onClick={() => handleNavigateToListingPage(item, "category")}
                  className="cursor-pointer hover:shadow-lg transition-all h-full"
                >
                  <CardContent className="flex flex-col items-center justify-center p-8">
                    <div className={`p-4 rounded-full ${item.color} mb-4`}>
                      <item.icon className="w-8 h-8" />
                    </div>
                    <span className="font-bold text-lg">{item.label}</span>
                    <Badge variant="outline" className="mt-2">
                      Shop Now
                    </Badge>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Brands Section */}
      <section className="py-16 bg-muted">
        <div className="container mx-auto px-4">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-3xl font-bold text-center mb-12"
          >
            Shop By Brand
          </motion.h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {BrandWithIcons.map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ scale: 1.05 }}
              >
                <Card
                  onClick={() => handleNavigateToListingPage(item, "brand")}
                  className={cn(
                    "cursor-pointer transition-all h-full border-0 shadow-sm",
                    item.color
                  )}
                >
                  <CardContent className="flex flex-col items-center justify-center p-6">
                    <item.icon className="w-10 h-10 mb-4" />
                    <span className="font-bold">{item.label}</span>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-3xl font-bold text-center mb-12"
          >
            Featured Products
          </motion.h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {productList && productList.length > 0
              ? productList.map((productItem, idx) => (
                  <motion.div
                    key={productItem._id}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: idx * 0.1 }}
                  >
                    <ShoppingProductTile
                      handleGetProductDetails={handleGetProductDetails}
                      handleAddtoCart={handleAddtoCart}
                      product={productItem}
                    />
                  </motion.div>
                ))
              : Array.from({ length: 4 }).map((_, idx) => (
                  <div key={idx} className="h-80 bg-muted rounded-lg animate-pulse"></div>
                ))}
          </div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mt-12"
          >
            <Button 
              variant="outline" 
              size="lg"
              onClick={() => navigate('/shop/listing')}
            >
              View All Products
            </Button>
          </motion.div>
        </div>
      </section>

      <ProductDetailsDialog
        open={openDetailsDialog}
        setOpen={setOpenDetailsDialog}
        productDetails={productDetails}
      />
    </div>
  );
};

export default ShoppingHome;