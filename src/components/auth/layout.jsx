import { Outlet } from "react-router-dom";

import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingBag, Eye, EyeOff, Mail, Lock, User, ArrowRight, Sparkles } from 'lucide-react';


// Auth Layout Component
const AuthLayout = () => {
  return (
    <div className="flex min-h-screen w-full bg-gradient-to-br from-gray-50 to-blue-50">
      {/* Left Side - Branding */}
      <div className="hidden lg:flex items-center justify-center w-1/2 px-12 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900 via-purple-900 to-black" />
        <div className="absolute inset-0 opacity-20" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%239C92AC' fill-opacity='0.1'%3E%3Cpath d='m36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
        }} />
        <motion.div 
          className="relative z-10 max-w-md space-y-8 text-center text-white"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <motion.div
            animate={{ 
              rotate: [0, 5, -5, 0],
              scale: [1, 1.05, 1]
            }}
            transition={{ 
              duration: 4,
              repeat: Infinity,
              repeatType: "reverse"
            }}
            className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-blue-400 to-purple-400 rounded-2xl shadow-2xl mb-8"
          >
            <ShoppingBag className="w-10 h-10 text-white" />
          </motion.div>
          
          <motion.h1 
            className="text-5xl font-bold tracking-tight leading-tight"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Welcome To{' '}
            <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              ShopHub
            </span>
          </motion.h1>
          
          <motion.p 
            className="text-xl text-blue-100 leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            Discover amazing products and enjoy seamless shopping experience
          </motion.p>
          
          <motion.div 
            className="flex items-center justify-center gap-2 text-blue-200"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            <Sparkles className="w-5 h-5" />
            <span>Trusted by millions worldwide</span>
            <Sparkles className="w-5 h-5" />
          </motion.div>
        </motion.div>
      </div>

      {/* Right Side - Forms */}
      <div className="flex flex-1 items-center justify-center px-4 py-12 sm:px-6 lg:px-8">
        <div className="w-full max-w-md">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;