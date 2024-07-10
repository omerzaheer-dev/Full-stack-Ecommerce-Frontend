import React, { useState } from 'react'
import { MdModeEdit } from "react-icons/md";
import EditProductCard from './EditProductCard';
import ImageResizerComponent from './ImageResizerComponent';
import displayINRCurrency from '../helpers/displayCurrency'
const AdminProductCard = ({data,refetchData}) => {
  const [EditProduct,setEditProduct] = useState(false)
  return (
              <div>
                <div className="max-w-[247px] max-h-[450px] rounded overflow-hidden shadow-lg">
                    <div className="h-[220px] w-[247px] bg-white">
                    <ImageResizerComponent imgUrl={data?.productImage[0]} Width={247} Height={220} ph={220} pw={247}/>
                    </div>               
                        <div className='max-w-[247px] max-h-[150px]'>
                            <div className='flex items-center px-6 justify-between pb-[2px] pt-2'>
                                <div className="font-semibold line-clamp-1">{data?.productName}</div>
                                <div onClick={()=>setEditProduct(true)} className='rounded-full p-[2px] hover:bg-green-600 hover:text-white font-bold text-md'>
                                  <MdModeEdit/>
                                </div>
                            </div>
                            <div className="font-semibold px-6 pb-2 text-md">{displayINRCurrency(data.sellingPrice,'USD')}</div>
                        </div>
                </div>
              {
                EditProduct && <EditProductCard refetchData={refetchData} product={data} onClose={()=>setEditProduct(false)}/>
              }
              </div>
  )
}

export default AdminProductCard
