import React , { useEffect, useState } from 'react'
import FetchCartProducts from '../helpers/FetchCartProducts';
import { AddToCart } from '../helpers/AddToCart';
import summaryApi from "../common";
import { TiMinus } from "react-icons/ti";
import { TiPlus } from "react-icons/ti";
import { IoMdClose } from "react-icons/io";
import { useSelector , useDispatch } from "react-redux";
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify';
import {Elements} from '@stripe/react-stripe-js';
import {loadStripe} from '@stripe/stripe-js';
import displayINRCurrency from '../helpers/displayCurrency';
const Cart = () => {
  const [processing,setProcessing] = useState(false)
  const user = useSelector((state) => state?.user?.user?.user);
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const cartSelector = useSelector((state) => state?.cart?.cart);
  useEffect(()=>{
    if(!user && !cartSelector){
      navigate("/")
      toast.error("Login to access Cart");
    }
  },[user,navigate])
  const totalQuantity = cartSelector?.reduce((total, item) => {
    return total + item?.quantity;
  }, 0);
  const totalPrice = cartSelector?.reduce((prev, item) => {
    return prev + (item?.quantity*item?.productId?.sellingPrice);
  }, 0);
  useEffect(()=>{
    if(user){
      FetchCartProducts(dispatch)
    }
  },[dispatch,user])
  const updateQuantity = async(_id,qty,type)=>{
  try {
    if(type==='dec' && qty===1){
      console.log("cant decrement anymore")
    }else{
      const response = await fetch(summaryApi.updateAddToCartProducts.url, {
        method: summaryApi.updateAddToCartProducts.method,
        credentials: "include",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ _id,qty,type })
      });
      const dataResponse = await response.json();
      if (dataResponse?.success) {
        await FetchCartProducts(dispatch)
      } else {
        console.error("cant update quantity");
      }
    }
  } catch (error) {
      console.error("There has been a problem with your fetch operation:", error);
  }
  }
  const handlePayment = async () => {
    setProcessing(true)
    try {
      const stripePromise = await loadStripe(process.env.REACT_APP_STRIPE_PUBLIC_KEY);
      const response = await fetch(summaryApi.paymentCheckout.url,{
        method:summaryApi.paymentCheckout.method,
        credentials:"include",
        headers:{
          'content-type':"application/json"
        },
        body:JSON.stringify({
          cartItems:cartSelector
        })
      })
      const responseData = await response.json()
      if(responseData?.success){
        if(responseData?.data?.id){
          stripePromise.redirectToCheckout({sessionId:responseData?.data?.id})
        }
      }else{
        console.log("failed to proceed with payment")
        setProcessing(false)
      }
    } catch (error) {
      console.log("failed to proceed with payment")
      setProcessing(false)
    }
  }
  return (
    <div>
      { user?._id && (
        <div>
        {
           cartSelector && cartSelector.length<=0 ?
          (
            <div className='py-9 px-4 max-w-[100%] w-full'>
              <div className='w-[90%] bg-white p-3 mx-auto'>
                <h1 className="text-xl font-bold text-center text-red-600">No Products in Cart</h1>
              </div>
            </div>
          )
          :
          (
            <div className='max-w-[95%] w-full mx-auto py-7 flex lg:flex-row flex-col items-start gap-4'>
              <div className="lg:w-[58%] w-[95%] mx-auto flex flex-col items-center justify-normal gap-3">
                { cartSelector &&
                  cartSelector?.map((item,index)=>{
                    return(
                      <div key={index} className='w-full flex bg-white border-slate-200 border-[2px] rounded-sm' >
                        <div className='max-w-[120px] min-w-[45px] min-h-[60px] max-h-[150px] flex items-center px-[2px] py-[6px] justify-center bg-slate-200'>
                          <img src={item?.productId?.productImage[0]} className="max-w-full max-h-full mix-blend-multiply w-auto h-auto  " alt="dont know" />
                        </div>
                        <div className=" px-3 py-2 w-full">
                            <div className='flex items-center justify-between'>
                            <div>
                              <h1 className="text-lg font-semibold font-sans">{item?.productId?.productName}</h1>
                            </div>
                            <div>
                              <button className='hover:text-red-600 font-bold text-lg mt-2' onClick={async(e)=>await AddToCart(e,item?.productId?._id,dispatch,user)}>
                                  <IoMdClose />
                              </button>
                            </div>
                          </div>
                            <p className="text-slate-500 mt-[-3px] text-sm">{item?.productId?.productName}</p>
                            <p className="text-base font-medium mt-[-2px] text-red-600">{displayINRCurrency(item?.productId?.sellingPrice)}</p>
                            <div className='flex items-center justify-between'>
                                <div className="max-w-min flex items-center mt-[6px] gap-[14px]">
                                    <div className="px-[3px] py-[1px] font-extralight text-sm flex items-center m-auto justify-center rounded-sm border-black border-[1px] hover:border-red-600 hover:text-white hover:bg-red-600" onClick={async()=>await updateQuantity(item?.productId?._id,item?.quantity,'dec')}><TiMinus /></div>
                                    <div className="font-semibold">{item?.quantity}</div>
                                    <div className="px-[3px] py-[1px] font-extralight text-sm flex items-center m-auto justify-center rounded-sm border-black border-[1px] hover:border-red-600 hover:text-white hover:bg-red-600" onClick={async()=>await updateQuantity(item?.productId?._id,item?.quantity,'inc')}><TiPlus /></div>
                                </div>
                                <div className='text-lg font-medium text-red-600'>{displayINRCurrency(item?.quantity*item?.productId?.sellingPrice)}</div>
                            </div>
                        </div>
                      </div>
                    )
                  })
                }
              </div>
              <div className="lg:w-[42%] w-[95%] mx-auto bg-white">
                <div className='w-full p-2 bg-red-600 text-white font-semibold text-lg'>Summary</div>
                <div className="py-4 mx-6">
                  <div className='flex mb-2 items-center justify-between font-medium text-lg'>
                    <p>Quantity :</p>
                    <p>{totalQuantity}</p>
                  </div>
                  <div className='flex mb-2 items-center justify-between font-medium text-lg'>
                    <p>Total Price :</p>
                    <p>{displayINRCurrency(totalPrice)}</p>
                  </div>
                </div>
                <div style={{position : processing && 'relative'}} className='text-center font-bold text-lg hover:bg-blue-700 text-white bg-blue-600 w-full p-2'>
                  <button onClick={handlePayment} className={`${processing ? 'hidden' : 'w-full h-full cursor-pointer'}`}>Payment</button>
                  <button className={`${processing ? 'inline-block' : 'hidden'}`}>Processing...</button>
                  <span style={{display : processing ? 'inline-block' : 'none'}} className="loader absolute top-[30%] p-1 flex items-center justify-center bg-white right-[5%] translate-y-[-50%]"></span>
                </div>
              </div>
            </div>
          )
        }
        </div>
      )
      }
    </div>
  )
}

export default Cart
