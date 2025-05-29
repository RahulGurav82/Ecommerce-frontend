import CommonForm from '../../components/common/form'
import {  loginFormControls } from '@/config/index'
import { loginUser } from '@/store/auth-slice'
import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { Link, Navigate } from 'react-router-dom'
import { toast } from 'sonner'
import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingBag, Eye, EyeOff, Mail, Lock, User, ArrowRight, Sparkles } from 'lucide-react';


const initialState = {
  email : '',
  password : ''
}


// Login Component
const AuthLogin = () => {
const [formData, setFormData] = useState(initialState)
const dispatch = useDispatch();
const onSubmit = (event) => {
  event.preventDefault();

  dispatch(loginUser(formData)).then((data) => {
      if (data?.payload?.success) {
      toast.success(data?.payload?.message);
    } else {
       toast.error(data?.payload?.message);
    }
  })
}

  return (
    <motion.div 
      className="space-y-8"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <div className="text-center space-y-2">
        <motion.h1 
          className="text-4xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          Welcome Back
        </motion.h1>
        <motion.p 
          className="text-gray-600"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          Don't have an account?{' '}
          <button className="font-semibold text-blue-600 hover:text-blue-700 hover:underline transition-colors duration-200">
            <Link to="/auth/register">
            Register here
            </Link>
          </button>
        </motion.p>
      </div>

      <CommonForm
        formControls={loginFormControls}
        buttonText="Sign In"
        formData={formData}
        setFormData={setFormData}
        onSubmit={onSubmit}
      />

      <motion.div 
        className="text-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.7 }}
      >
        <button className="text-sm text-blue-600 hover:text-blue-700 hover:underline transition-colors duration-200">
          Forgot your password?
        </button>
      </motion.div>
    </motion.div>
  );
};


export default AuthLogin