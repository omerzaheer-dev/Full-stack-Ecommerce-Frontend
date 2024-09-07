import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { FaUserAlt } from "react-icons/fa";
import { Link , Outlet, useNavigate } from 'react-router-dom';
import RoleObj from '../common/Role';
const AdminPanel = () => {
  const user = useSelector((state) => state?.user?.user?.user);
  const navigate = useNavigate()
  useEffect(()=>{
    if(user?.Role !== RoleObj.ADMIN){
      navigate("/")
    }
  },[user,navigate])
  return (
    <div className='md:flex hidden min-h-[calc(100vh-124px)] max-w-[100vw]'>
              <aside className='w-[20vw] bg-white costumshadow'>
                <div className='h-32 flex flex-col items-center justify-center'>
                    <div className='pt-7'>
                      {user?.profilePicture ? (
                            <img
                              src={user.profilePicture}
                              alt=""
                              className="rounded-full md:w-[72px] md:h-[72px] h-[26px] w-[26px] bg-center bg-cover"
                            />
                          ) : (
                            <FaUserAlt className="md:text-5xl text-3xl" />
                      )}
                    </div>
                    <p className='pt-2 capitalize font-semibold'>{user?.name}</p>
                    <p className='pt-1 text-sm'>{user?.Role}</p>
                  </div>
                  <div>
                    <nav className='flex flex-col px-3 pt-11 gap-2'>
                      <Link to="all-users" className='font-semibold hover:bg-slate-100 px-2 py-1'>All Users</Link>
                      <Link to="all-products" className='font-semibold hover:bg-slate-100 px-2 py-1'>All Products</Link>
                      <Link to="all-orders" className='font-semibold hover:bg-slate-100 px-2 py-1'>All Orders</Link>
                    </nav>
                  </div>
              </aside>
              <main className='w-[80vw] h-full p-3'>
                <Outlet/>
              </main>
    </div>
  )
}

export default AdminPanel
