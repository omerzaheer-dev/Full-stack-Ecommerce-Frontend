import React, { useState } from 'react'
import UploadProduct from '../components/UploadProduct'
const Products = () => {
  const [openUploadProducts,setOpenUploadProducts]=useState(false)
  return (
    <div>
      <div className='bg-white flex items-center justify-between py-2 px-4'>
        <h1 className='font-bold text-lg'>Upload Products</h1>
        <button onClick={()=>setOpenUploadProducts(true)} className='border-2 border-red-600 text-red-600 py-1 px-3 hover:bg-red-600 rounded-lg transition-all hover:text-white'>Upload Product</button>
      </div>
      {
        openUploadProducts && (
          <UploadProduct onClose={()=>setOpenUploadProducts(false)}/>
        )
      }
    </div>
  )
}

export default Products
