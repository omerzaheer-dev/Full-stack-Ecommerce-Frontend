import React , { useEffect } from 'react'
import FetchCartProducts from '../helpers/FetchCartProducts';
import { AddToCart } from '../helpers/AddToCart';
import summaryApi from "../common";
import { TiMinus } from "react-icons/ti";
import { TiPlus } from "react-icons/ti";
import { IoMdClose } from "react-icons/io";
import { useSelector , useDispatch } from "react-redux";
import { useNavigate } from 'react-router-dom'
const Cart = () => {
  const user = useSelector((state) => state?.user?.user?.user);
  const dispatch = useDispatch()
  const navigate = useNavigate()
  useEffect(()=>{
    if(!user){
      navigate("/login")
    }
  },[user,navigate])
  const cartSelector = useSelector((state) => state?.cart?.cart);
  const totalQuantity = cartSelector.reduce((total, item) => {
    return total + item?.quantity;
  }, 0);
  const totalPrice = cartSelector.reduce((prev, item) => {
    return prev + (item?.quantity*item?.productId?.sellingPrice);
  }, 0);
  useEffect(()=>{
    FetchCartProducts(dispatch)
  },[dispatch])
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
  return (
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
                            <button className='hover:text-red-600 font-bold text-lg mt-2' onClick={async(e)=>await AddToCart(e,item?.productId?._id,dispatch)}>
                                <IoMdClose />
                            </button>
                          </div>
                        </div>
                          <p className="text-slate-500 mt-[-3px] text-sm">{item?.productId?.productName}</p>
                          <p className="text-base font-medium mt-[-2px] text-red-600">PKR {item?.productId?.sellingPrice}</p>
                          <div className='flex items-center justify-between'>
                              <div className="max-w-min flex items-center mt-[6px] gap-[14px]">
                                  <div className="px-[3px] py-[1px] font-extralight text-sm flex items-center m-auto justify-center rounded-sm border-black border-[1px] hover:border-red-600 hover:text-white hover:bg-red-600" onClick={async()=>await updateQuantity(item?.productId?._id,item?.quantity,'dec')}><TiMinus /></div>
                                  <div className="font-semibold">{item?.quantity}</div>
                                  <div className="px-[3px] py-[1px] font-extralight text-sm flex items-center m-auto justify-center rounded-sm border-black border-[1px] hover:border-red-600 hover:text-white hover:bg-red-600" onClick={async()=>await updateQuantity(item?.productId?._id,item?.quantity,'inc')}><TiPlus /></div>
                              </div>
                              <div className='text-lg font-medium text-red-600'>PKR {item?.quantity*item?.productId?.sellingPrice}</div>
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
                  <p>PKR {totalPrice}</p>
                </div>
              </div>
              <div>
                <button className='text-center font-bold cursor-pointer text-lg hover:bg-blue-700 text-white bg-blue-600 w-full p-2'>Payment</button>
              </div>
            </div>
          </div>
        )
      }
    </div>
  )
}

export default Cart
