import React , { useEffect, useState   } from 'react'
import "../App.css"
import { useParams } from "react-router-dom"
import summaryApi from '../common'
import { toast } from 'react-toastify';
import { FaStar } from "react-icons/fa";
import { TiStarHalfOutline } from "react-icons/ti";
import CategoryWiseProduct from "../components/CategoryWiseProduct"
import VerticalCardProduct from "../components/VerticalCardProduct"
import { AddToCart } from "../helpers/AddToCart"
import { useDispatch , useSelector } from 'react-redux';
import ProductCategory from '../helpers/ProductCategory';
const ProductDetails = () => {
  const dispatch = useDispatch();
  const cartSelector = useSelector((state) => state?.cart?.cart);
    const params = useParams()
    const { id } = params
    const [productDetails,setProductDetails] = useState({})
    const [bigImage,setBigImage] = useState()
    const [loading,setLoading] = useState(true)
    const productLoadingList = new Array(3).fill(null)
    const [zoomCoordinates,setZoomCoordinates] = useState({
      x:0,
      y:0
    })
    const [zoomImage,setZoomImage] = useState(false)
    const handleZoomImage = (e) => {
      setZoomImage(true)
      const {width , height , left , top } = e.target.getBoundingClientRect()
      const xi = (e.clientX - left) / width
      const yi = (e.clientY - top) / height
      setZoomCoordinates({
        x:xi,
        y:yi
      })
    }
    const getProductDetails = async () => {
      const response = await fetch(summaryApi.getProductDetail.url,{
        method: 'POST',
        headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({ id })
      })
        const dataResponse = await response.json()
        if(dataResponse?.success){
          setProductDetails(dataResponse?.data)
          setBigImage(dataResponse?.data.productImage[0])
        }
        else{
          toast.error("Product details failed to fetch")
        }
      setLoading(false)
    }
    useEffect(()=>{
      getProductDetails()
    },[id])
  return (
    <div>
      {
        loading ?
        (
          <div>
          <div className='w-[96%] mx-auto py-6 px-1 md:flex md:gap-4 animate-pulse'>
                <div className="flex md:flex-col items-start justify-start mb-4 md:mb-0 md:gap-3 gap-5">
                  {
                    productLoadingList.map((item,index) => {
                      return (
                        <div key={index} className='md:max-w-[90px] bg-slate-200 max-w-[85px] h-[95px] max-h-[104px] w-[68px] overflow-hidden md:w-[85px] md:h-[112px] flex items-center justify-center md:max-h-[120px] md:rounded rounded-md'></div>
                      )
                    })
                  }
                </div>
                <div className='md:max-w-[560px] mx-auto md:mx-0 max-w-[325px] h-[280px] max-h-[330px] w-[300px] overflow-hidden bg-slate-200 md:w-[500px] md:h-[440px] flex items-center justify-center md:max-h-[485px] md:rounded rounded-md'></div>
            <div className='w-[60%]'>
              <button className='bg-slate-200 rounded-full h-5 w-16'></button>
                <div className='h-10 w-44 rounded-xl bg-slate-200 mt-1'></div>
                <div className='w-20 h-4 rounded-full bg-slate-200 mt-2'></div>
              <div className="flex gap-1 text-slate-200 items-center text-xl">
                <FaStar />
                <FaStar />
                <FaStar />
                <FaStar />
                <TiStarHalfOutline className='text-2xl'/>
              </div>
              <div className='flex gap-4 text-2xl text-slate-200 font-bold'>
                <div className='flex items-center gap-1'>
                  <div>PKR</div>
                  <div className='w-14 h-5 rounded-3xl bg-slate-200'></div>
                </div>
                <div className='flex items-center gap-1 line-through'>
                  <div>PKR</div>
                  <div className='w-14 h-5 rounded-3xl bg-slate-200'></div>
                </div>
              </div>
              <div className='flex gap-3 my-1'>
                <button className='border-[2px] rounded-md transition-all text-slate-300 border-slate-200 hover:bg-slate hover:text-white px-2 py-1'>Buy Now</button>
                <button className='border-[2px] rounded-md transition-all bg-slate-200 text-white px-2 py-1'>Add To Cart</button>
              </div>
              <div className='mt-1 text-slate-300 font-semibold'>
                <h2>Description:</h2>
                <div className='w-[620px] h-4 rounded bg-slate-200'></div>
                <div className='w-[320px] h-4 rounded bg-slate-200 mt-1'></div>
              </div>
            </div>
          </div>
        </div>
        )
        :
        (
          <div>
              <div className='w-[96%] mx-auto py-6 px-1 lg:flex md:gap-4'>
                <div className="flex lg:gap-4 gap-6 md:flex-row flex-col-reverse">
                      <div className="flex md:flex-col items-start justify-start mb-4 md:mb-0 md:gap-3 gap-5 px-3 md:px-0">
                        {
                          productDetails?.productImage.map((item,index) => {
                            return (
                              <div onClick={()=>setBigImage(productDetails.productImage[index])} key={index} className='md:max-w-[90px] bg-slate-200 max-w-[85px] h-[95px] max-h-[104px] w-[68px] overflow-hidden md:w-[85px] md:h-[112px] flex items-center justify-center md:max-h-[120px] md:rounded rounded-md'>
                                <img src={item} alt="productImage" className='md:w-[85px] object-scale-down hover:scale-105 md:h-[112px] md:max-w-[90px] md:max-h-[120px] mix-blend-multiply w-[68px] h-[95px] max-w-[85px] max-h-[104px]'/>
                              </div>
                            )
                          })
                        }
                      </div>
                      <div className='relative'>
                        <div className='lg:max-w-[560px] md:max-w-[600px] md:w-[570px] mx-auto md:mx-0 max-w-[100%] h-[280px] max-h-[330px] w-[88%] overflow-hidden bg-slate-200 lg:w-[500px] md:h-[440px] flex items-center justify-center md:max-h-[485px] md:rounded rounded-md'>
                          <img src={bigImage} onMouseMove={handleZoomImage} onMouseLeave={()=>setZoomImage(false)} alt="" className='md:min-w-[170px] md:w-auto md:h-auto md:min-h-[280px] lg:max-w-[440px] md:max-w-[100%] md:max-h-[420px] mix-blend-multiply min-w-[75%] w-auto h-[270px] max-w-[100%] max-h-[330px]' />
                        </div>
                        <div className="hidden md:block">
                            {
                              zoomImage &&
                                <div className='right-[-143%] top-0 absolute'>
                                <div className='hidden lg:flex items-center justify-start bg-slate-100 md:max-w-[700px] md:w-[700px] md:h-[440px] md:max-h-[485px]'>
                                  <div className='md:w-[480px] md:h-[408px] max-w-full mix-blend-multiply max-h-full' style={{
                                    backgroundImage: `url(${bigImage})`,
                                    backgroundRepeat: 'no-repeat',
                                    backgroundPosition: `${zoomCoordinates.x * 100}% ${zoomCoordinates.y * 100}%`
                                  }}>

                                  </div>
                                </div>
                                </div>
                            }
                        </div>
                      </div>
                </div>
                <div className='lg:w-[60%] w-[95%] md:mt-14 lg:mt-0 md:w-[93%] mx-auto'>
                  <button className='bg-red-200 text-red-600 rounded-full md:py-[2px] px-2'>
                    {productDetails.brand}
                  </button>
                  <div>
                    <h1 className='text-2xl font-semibold font-sans mt-1'>{productDetails.productName}</h1>
                  </div>
                  <div className='mb-1'>
                    <p className='capitalize text-slate-400'>{productDetails.category}</p>
                  </div>
                  <div className="flex gap-1 text-red-600 items-center text-xl">
                    <FaStar />
                    <FaStar />
                    <FaStar />
                    <FaStar />
                    <TiStarHalfOutline className='text-2xl'/>
                  </div>
                  <div className='flex gap-4 text-2xl font-bold'>
                    <p className="text-red-600">PKR {productDetails.price}</p>
                    <p className="text-slate-400 line-through">PKR {productDetails.sellingPrice}</p>
                  </div>
                  <div className='flex gap-3 text-red-600 my-1'>
                    <button className='border-[2px] rounded-md transition-all border-red-600 hover:bg-red-600 hover:text-white px-2 py-1'>Buy Now</button>
                    {
                      cartSelector && cartSelector.some(item => item.productId === id) ?
                      <button className='border-[2px] border-red-600 rounded-md bg-slate-100 hover:bg-red-600 hover:text-white transition-all duration-300 text-red-600 px-2 py-1' onClick={(e)=>AddToCart(e,id,dispatch)}>Remove from Cart</button>
                      :
                      <button className='border-[2px] rounded-md duration-200 transition-all bg-red-600 hover:bg-red-700 text-white px-2 py-1' onClick={(e)=>AddToCart(e,id,dispatch)}>Add To Cart</button>
                    }
                  </div>
                  <div className='mt-1 text-slate-700 font-semibold'>
                    <h2>Description:</h2>
                    <p>{productDetails.description}</p>
                  </div>
                </div>
              </div>
              <div className="md:block hidden">
                <CategoryWiseProduct category={productDetails?.category} heading="Recommended Products"></CategoryWiseProduct>
              </div>
              <div className="md:hidden">
                <VerticalCardProduct category={productDetails?.category} heading="Recommended Products"/>
              </div>
          </div>
        )
      }
    </div>
  )
}

export default ProductDetails
