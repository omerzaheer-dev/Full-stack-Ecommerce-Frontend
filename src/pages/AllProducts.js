import React, { useState , useEffect } from 'react'
import summaryApi from '../common'
import UploadProduct from '../components/UploadProduct'
import AdminProductCard from '../components/AdminProductCard'
const Products = () => {

  const [openUploadProducts,setOpenUploadProducts]=useState(false)
  const [products,setProducts]=useState([])
    const [productLoading,setProductLoading]=useState(false)
    const [productError,setProductError]=useState(false)
    const fetchProducts = async () => {
      setProductLoading(true)
      const dataResponse = await fetch(summaryApi.getAllProducts.url,{
        method:summaryApi.getAllProducts.method
      })
      const dataApi = await dataResponse.json()
      if(dataApi.success){
        setProducts(dataApi.data.products)
        setProductLoading(false)
      }else{
        setProductLoading(false)
        setProductError(true)
      }
    }
    useEffect(()=>{
      fetchProducts()
    },[])

  return (
    <div>
      <div className='bg-white flex items-center justify-between py-2 px-4'>
        <h1 className='font-bold text-lg'>Upload Products</h1>
        <button onClick={()=>setOpenUploadProducts(true)} className='border-2 border-red-600 text-red-600 py-1 px-3 hover:bg-red-600 rounded-lg transition-all hover:text-white'>Upload Product</button>
      </div>
      <div>
      <div className="flex flex-wrap py-6 pl-6 gap-10">
            {
              products && products.map((product,index)=>{
                return (
                  <AdminProductCard key={index} refetchData={fetchProducts} data={product}/>
                )
              })
            }
      </div>
        {
        productLoading && (
          <div className='flex items-center font-bold justify-center h-[68vh] w-full'>Loading...</div>
        )
        }

        {
          productError && (
            <div className='font-semibold font-mono pt-3 px-2 text-red-500 text-2xl h-[68vh] w-full'>Something went wrong while fetching products...</div>
          )
        }
      </div>

      {
        openUploadProducts && (
          <UploadProduct refetchData={fetchProducts} onClose={()=>setOpenUploadProducts(false)}/>
        )
      }

    </div>
  )
}

export default Products
