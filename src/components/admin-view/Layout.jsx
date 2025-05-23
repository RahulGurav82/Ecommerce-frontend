import React, { useState } from 'react'
import { Outlet } from 'react-router-dom'
import AdminSidebar from './sidebar'
import AdminHeader from './header'

const AdminLayout = () => {

  const [openSider, setOpenSider] = useState(false)

  return (
    <div className='flex min-h-screen w-full'>
        {/* admin sidebar */}
        <AdminSidebar open={openSider} setOpen={setOpenSider} />
        <div className='flex flex-1 flex-col'>
            {/* admin header */}
            <AdminHeader open={openSider} setOpen={setOpenSider}  />
            <main className='flex-1 flex flex-col bg-muted/40 p-4 md:p-6'>
                <Outlet />
            </main>
        </div>
    </div>
  )
}

export default AdminLayout