import CommonForm from '@/components/common/form'
import { registerFormControls, loginFormControls } from '@/config'
import { loginUser } from '@/store/auth-slice'
import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { Link, Navigate } from 'react-router-dom'
import { toast } from 'sonner'

const initialState = {
  email : '',
  password : ''
}

const AuthLogin = () => {

  const [formData, setFormData] = useState(initialState)
  const dispatch = useDispatch();
  const onSubmit = (event) => {
    event.preventDefault();

    dispatch(loginUser(formData)).then((data) => {
      console.log(data)
        if (data?.payload?.success) {
        toast.success(data?.payload?.message);
        // Navigate('/auth/login')
      } else {
         toast.error(data?.payload?.message);
      }
    })
  }


  return (
    <div className='mx-auto w-full max-w-md space-y-6'>
        <div className='text-center'>
          <h1 className='text-3xl font-bold tracking-tight text-foreground'>
            Sign in to an account
          </h1>
          <p>Don't have an account
            <Link
            className='font-medium ml-2 text-primary hover:underline'
            to='/auth/register'>register</Link>
          </p> 
        </div>
        <CommonForm
          formControls={loginFormControls} 
          buttonText={"Sign in"}
          formData={formData}
          setFormData={setFormData}
          onSubmit={onSubmit}
        />
    </div>
  )
}

export default AuthLogin