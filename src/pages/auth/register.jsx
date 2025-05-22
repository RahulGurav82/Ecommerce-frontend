
import CommonForm from '../../components/common/form'
import { registerFormControls } from '@/config/index'
import { registerUser } from '@/store/auth-slice'
import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from "sonner"

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
    <div className='mx-auto w-full max-w-md space-y-6'>
        <div className='text-center'>
          <h1 className='text-3xl font-bold tracking-tight text-foreground'>Create New Account</h1>
          <p>Already have  an account
            <Link
            className='font-medium ml-2 text-primary hover:underline'
            to='/auth/login'>Login</Link>
          </p> 
        </div>
        <CommonForm
          formControls={registerFormControls} 
          buttonText={"Sign Up"}
          formData={formData}
          setFormData={setFormData}
          onSubmit={onSubmit}
        />
    </div>
  )
}

export default AuthRegister