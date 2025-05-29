
import CommonForm from '../../components/common/form'
import { registerFormControls } from '@/config/index'
import { registerUser } from '@/store/auth-slice'
import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from "sonner"
import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingBag, Eye, EyeOff, Mail, Lock, User, ArrowRight, Sparkles } from 'lucide-react';


const initialState = {
  username : '',
  email : '',
  password : ''
}

const AuthRegister = () => {

  const [formData, setFormData] = useState(initialState);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onSubmit = (event) => {
    event.preventDefault();
    dispatch(registerUser(formData)).then((data) => {
      console.log(data);
      if (data?.payload?.success) {
        toast.success(data?.payload?.message);
        navigate('/auth/login')
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
          Create Account
        </motion.h1>
        <motion.p 
          className="text-gray-600"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          Already have an account?{' '}
          <button className="font-semibold text-blue-600 hover:text-blue-700 hover:underline transition-colors duration-200">
            <Link to="/auth/login">
              Login here
            </Link>
          </button>
        </motion.p>
      </div>

      <CommonForm
        formControls={registerFormControls}
        buttonText="Sign Up"
        formData={formData}
        setFormData={setFormData}
        onSubmit={onSubmit}
      />
    </motion.div>
  );
};

export default AuthRegister