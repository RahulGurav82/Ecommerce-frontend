import {
  HousePlug,
  LogOut,
  Menu,
  SearchIcon,
  ShoppingCart,
  UserCog,
} from "lucide-react";
import React, { useEffect, useState } from "react";
import {
  Link,
  useLocation,
  useNavigate,
  useSearchParams,
} from "react-router-dom";
import { Sheet, SheetContent, SheetTrigger } from "../ui/sheet";
import { Button } from "../ui/button";
import { useDispatch, useSelector } from "react-redux";
import { shoppingViewHeaderMenuItems } from "@/config";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Avatar, AvatarFallback } from "../ui/avatar";
import { logoutUser } from "@/store/auth-slice";
import UserCartWrapper from "./cart-wrapper";
import { fetchCartItems } from "@/store/shop/cart-slice";
import { Label } from "../ui/label";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { Badge } from "../ui/badge";

const MenuItems = ({ setOpen, isMobile = false }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [searchParams, setSearchParams] = useSearchParams();
  const [activeItem, setActiveItem] = useState("");

  const handleNavigate = (getCurrentMenuItem) => {
    setActiveItem(getCurrentMenuItem.id);
    sessionStorage.removeItem("filters");
    const currentFilter =
      getCurrentMenuItem.id !== "home" &&
      getCurrentMenuItem.id !== "products" &&
      getCurrentMenuItem.id !== "search"
        ? {
            category: [getCurrentMenuItem.id],
          }
        : null;

    sessionStorage.setItem("filters", JSON.stringify(currentFilter));
    location.pathname.includes("listing") && currentFilter !== null
      ? setSearchParams(
          new URLSearchParams(`?category=${getCurrentMenuItem.id}`)
        )
      : navigate(getCurrentMenuItem.path);
    
    if (isMobile && setOpen) {
      setOpen(false);
    }
  };

  return (
    <nav className={`flex ${isMobile ? 'flex-col' : 'flex-row'} gap-6 ${isMobile ? 'ml-0' : 'ml-4'}`}>
      {shoppingViewHeaderMenuItems.map((menuItem) => (
        <div key={menuItem.id} className="relative group">
          <Label
            onClick={() => handleNavigate(menuItem)}
            className={cn(
              "text-sm font-medium cursor-pointer transition-colors duration-300",
              activeItem === menuItem.id
                ? "text-primary"
                : "text-muted-foreground hover:text-foreground",
              isMobile && "text-base px-3 py-2"
            )}
          >
            {isMobile && menuItem.icon && (
              <menuItem.icon className="inline mr-3 h-5 w-5" />
            )}
            {menuItem.label}
          </Label>
          {activeItem === menuItem.id && !isMobile && (
            <motion.div
              layoutId="activeIndicator"
              className="absolute bottom-[-2px] left-0 w-full h-0.5 bg-primary"
              transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
            />
          )}
        </div>
      ))}
    </nav>
  );
};

const HeaderRightContent = ({ setOpen, isMobile = false }) => {
  const { user } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { cartItems } = useSelector((state) => state.shopCart);
  const [openCartSheet, setOpenCartSheet] = useState(false);
  const [isHoveringCart, setIsHoveringCart] = useState(false);

  function handleLogout() {
    dispatch(logoutUser());
    if (isMobile && setOpen) {
      setOpen(false);
    }
  }

  useEffect(() => {
    dispatch(fetchCartItems(user?.id));
  }, [dispatch]);

  if (isMobile) {
    return (
      <div className="flex flex-col gap-4 mt-4">
        <Button
          variant="outline"
          className="justify-start gap-2 cursor-pointer"
          onClick={() => {
            navigate("/shop/search");
            setOpen(false);
          }}
        >
          <SearchIcon className="h-5 w-5" />
          Search
        </Button>
        <Sheet open={openCartSheet} onOpenChange={setOpenCartSheet}>
          <SheetTrigger asChild>
            <Button
              variant="outline"
              className="justify-start gap-2 relative cursor-pointer"
            >
              <ShoppingCart className="h-5 w-5" />
              Cart
              {cartItems?.items?.length > 0 && (
                <Badge className="absolute right-4 h-6 w-6 flex items-center justify-center rounded-full p-0 bg-primary">
                  {cartItems.items.length}
                </Badge>
              )}
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="w-full sm:max-w-md">
            <UserCartWrapper
              setOpenCartSheet={setOpenCartSheet}
              cartItems={
                cartItems && cartItems.items && cartItems.items.length > 0
                  ? cartItems.items
                  : []
              }
            />
          </SheetContent>
        </Sheet>


        {user ? (
          <>
            <Button
              variant="outline"
              className="justify-start gap-2 cursor-pointer"
              onClick={() => {
                navigate("/shop/account");
                setOpen(false);
              }}
            >
              <UserCog className="h-5 w-5" />
              Account
            </Button>
            <Button
              variant="outline"
              className="justify-start gap-2 text-destructive"
              onClick={handleLogout}
            >
              <LogOut className="h-5 w-5" />
              Logout
            </Button>
          </>
        ) : (
          <Button
            variant="default"
            className="w-full"
            onClick={() => {
              navigate("/auth/login");
              setOpen(false);
            }}
          >
            Sign In
          </Button>
        )}
      </div>
    );
  }

  return (
    <div className="flex items-center gap-4">
      <SearchIcon
        onClick={() => navigate("/shop/search")}
        className="cursor-pointer h-5 w-5"
      />
      <Sheet open={openCartSheet} onOpenChange={setOpenCartSheet}>
        <motion.div
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onHoverStart={() => setIsHoveringCart(true)}
          onHoverEnd={() => setIsHoveringCart(false)}
        >
          <Button
            onClick={() => setOpenCartSheet(true)}
            variant="outline"
            size="icon"
            className="relative rounded-full cursor-pointer"
          >
            <ShoppingCart className="h-5 w-5" />
            {cartItems?.items?.length > 0 && (
              <motion.div
                animate={{
                  scale: isHoveringCart ? 1.2 : 1,
                  rotate: isHoveringCart ? [0, 10, -10, 0] : 0,
                }}
                transition={{ duration: 0.5 }}
                className="absolute -top-2 -right-2"
              >
                <Badge className="h-6 w-6 flex items-center justify-center rounded-full p-0 bg-primary">
                  {cartItems.items.length}
                </Badge>
              </motion.div>
            )}
            <span className="sr-only">User Cart Only</span>
          </Button>
        </motion.div>

        <SheetContent side="right" className="w-full sm:max-w-md">
          <UserCartWrapper
            setOpenCartSheet={setOpenCartSheet}
            cartItems={
              cartItems && cartItems.items && cartItems.items.length > 0
                ? cartItems.items
                : []
            }
          />
        </SheetContent>
      </Sheet>

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Avatar className="bg-black cursor-pointer">
              <AvatarFallback className="bg-transparent text-white font-extrabold">
                {user?.username[0]?.toUpperCase()}
              </AvatarFallback>
            </Avatar>
          </motion.div>
        </DropdownMenuTrigger>
        <DropdownMenuContent
          side="right"
          className="w-56 border-none shadow-lg bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60"
        >
          <DropdownMenuLabel className="font-normal">
            <div className="flex flex-col space-y-1">
              <p className="text-sm font-medium leading-none">
                {user?.username}
              </p>
              <p className="text-xs leading-none text-muted-foreground">
                {user?.email}
              </p>
            </div>
          </DropdownMenuLabel>
          <DropdownMenuSeparator className="bg-muted" />
          <DropdownMenuItem
            onClick={() => navigate("/shop/account")}
            className="cursor-pointer focus:bg-primary/10"
          >
            <UserCog className="mr-2 h-4 w-4" />
            <span>Account</span>
          </DropdownMenuItem>
          <DropdownMenuSeparator className="bg-muted" />
          <DropdownMenuItem
            onClick={handleLogout}
            className="cursor-pointer focus:bg-destructive/10 focus:text-destructive"
          >
            <LogOut className="mr-2 h-4 w-4" />
            <span>Logout</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

const ShoppingHeader = () => {
  const { isAuthenticated, user } = useSelector((state) => state.auth);
  const [open, setOpen] = useState(false);
  const { cartItems } = useSelector((state) => state.shopCart);
  const location = useLocation();
  const [activeItem, setActiveItem] = useState("");

  useEffect(() => {
    // Set active item based on current route
    const currentItem = shoppingViewHeaderMenuItems.find(item => 
      location.pathname.includes(item.path.replace('/shop', ''))
    );
    if (currentItem) {
      setActiveItem(currentItem.id);
    }
  }, [location]);

  return (
    <motion.header
      className="sticky top-0 z-40 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60"
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ type: "spring", stiffness: 300, damping: 25 }}
    >
      <div className="container flex h-16 items-center justify-between px-4">
        <motion.div whileHover={{ scale: 1.03 }}>
          <Link to="/shop/home" className="flex items-center gap-2">
            <HousePlug className="h-6 w-6 text-primary" />
            <span className="font-bold text-xl">Ecommerce</span>
          </Link>
        </motion.div>

        {/* Mobile Menu */}
        <div className="lg:hidden">
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button
                  variant="outline"
                  size="icon"
                  className="rounded-full h-10 w-10 relative cursor-pointer"
                >
                  <motion.div
                    animate={open ? "open" : "closed"}
                    variants={{
                      open: { rotate: 90 },
                      closed: { rotate: 0 },
                    }}
                    transition={{ duration: 0.2 }}
                  >
                    <Menu className="h-5 w-5" />
                  </motion.div>
                  <span className="sr-only">Toggle navigation menu</span>
                </Button>
              </motion.div>
            </SheetTrigger>

            <SheetContent
              side="left"
              className="w-[300px] sm:w-[350px] bg-background/95 backdrop-blur-sm p-0"
            >
              <div className="flex flex-col h-full">
                {/* Logo and Close Button */}
                <div className="flex items-center justify-between p-4 border-b">
                  <Link
                    to="/shop/home"
                    className="flex items-center gap-2"
                    onClick={() => setOpen(false)}
                  >
                    <HousePlug className="h-6 w-6 text-primary" />
                    <span className="font-bold text-lg">Ecommerce</span>
                  </Link>
                </div>

                {/* Menu Items */}
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 }}
                  className="flex-1 overflow-y-auto p-4"
                >
                  <MenuItems setOpen={setOpen} isMobile />
                </motion.div>

                {/* Bottom Content */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="p-4 border-t mt-auto"
                >
                  <HeaderRightContent setOpen={setOpen} isMobile />
                </motion.div>
              </div>
            </SheetContent>
          </Sheet>
        </div>

        {/* Desktop Menu */}
        <div className="hidden lg:flex items-center gap-10">
          <MenuItems />
          <HeaderRightContent />
        </div>
      </div>
    </motion.header>
  );
};

export default ShoppingHeader;