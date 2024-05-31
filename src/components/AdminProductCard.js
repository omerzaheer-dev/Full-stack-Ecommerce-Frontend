import React, { useState } from 'react'
import { MdModeEdit } from "react-icons/md";
import EditProductCard from './EditProductCard';
import ImageResizerComponent from './ImageResizerComponent';
const AdminProductCard = ({data,refetchData}) => {
  const [EditProduct,setEditProduct] = useState(false)
  return (
              <div>
                <div className="max-w-[300px] max-h-[600px] rounded overflow-hidden shadow-lg">
                    <div className="h-[230px] w-[305px] bg-white flex items-center justify-center py-8">
                    <ImageResizerComponent imgUrl={data?.productImage[0]} Width={300} Height={223}/>
                    </div>               
                        <div className='flex items-center px-6 pb-4 pt-[3px] justify-between'>
                            <div className="font-semibold text-xl mb-1">{data?.productName}</div>
                            <div onClick={()=>setEditProduct(true)} className='rounded-full p-1 hover:bg-green-600 hover:text-white font-bold text-xl'>
                              <MdModeEdit/>
                            </div>
                        </div>
                    </div>
              {
                EditProduct && <EditProductCard refetchData={refetchData} product={data} onClose={()=>setEditProduct(false)}/>
              }
              </div>
  )
}

export default AdminProductCard
