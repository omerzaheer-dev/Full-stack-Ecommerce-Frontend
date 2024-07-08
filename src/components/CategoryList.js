import React, { useEffect, useState } from 'react'
import summaryApi from "../common/index" 
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import '../App.css';
const CategoryList = () => {
    const [categoryList,setCategoryList] = useState([])
    const [loading,setLoading] = useState(false)
    const fetchCategoryList = async () => {
        setLoading(true)
        const response = await fetch(summaryApi.getCategoryProduct.url,{
            method:summaryApi.getCategoryProduct.method,
            credentials:"include"
        })
        const dataResponse = await response.json()
        if(dataResponse?.success){
            setCategoryList(dataResponse?.data?.products)
        }
        else{
            toast.error("something went wrong")
        }
        setLoading(false)


    }
    useEffect(()=>{
        fetchCategoryList()
    },[])
  return (
    <div>
        {loading ? (
            <div className="flex items-center py-3 md:px-11 px-5 md:gap-4 gap-2 overflow-scroll animate-pulse scrollbar-none">
                {[...Array(18)].map((_, index) => (
                    <div className='md:p-9 p-6 flex items-center justify-center rounded-full bg-[#D9D9D6] overflow-hidden'></div>
                ))}
                
            </div>
        ) :
        (
                <div className="flex items-center py-3 md:px-11 px-5 md:gap-4 gap-3 overflow-scroll scrollbar-none cursor-pointer">
                    {
                        categoryList.map((category,index) => {
                            return (
                                <Link to={"/product-category/"+category?.category}>
                                    <div className='md:h-[70px] md:w-[70px] h-[59px] w-[59px] flex items-center justify-center rounded-full md:p-3 p-2 bg-[#D9D9D6] overflow-hidden'>
                                        <img src={category?.productImage[0]} alt="" className='h-full object-scale-down md:hover:scale-125 hover:scale-110 transition-all  mix-blend-multiply' />
                                    </div>
                                    {/* object-fill */}
                                    <p className='text-center capitalize text-sm md:text-base'>{category?.category}</p>

                                </Link>
                            )
                        })
                    }
                </div>
        )
        }
    </div>
  )
}

export default CategoryList
