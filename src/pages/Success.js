import React from 'react'
import successImage from "../assest/success.jpeg"
import { Link } from 'react-router-dom'
const Success = () => {
  return (
    <div className='max-h-[100vh] max-w-[100vw] pt-5 box-border w-full h-[70vh]'>
        <div className='md:w-[40%] w-[67%] h-auto bg-slate-200 mx-auto flex flex-col items-center justify-center'>
            <div>
                <img src={successImage} className='mix-blend-multiply py-3' width={170} height={170} alt="" />
            </div>
            <p className='font-bold capitalize text-green-600 text-2xl'>Payment Successfully</p>
            <Link to="/orders" className='my-4 transition-all duration-150 capitalize text-green-600 text-lg px-3 py-1 border-green-600 border-[2px] rounded hover:bg-green-600 hover:text-white'>See Orders</Link>
        </div>
    </div>
  )
}

export default Success