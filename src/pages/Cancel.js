import React from 'react'
import cancelImage from "../assest/cancel.png"
import { Link } from 'react-router-dom'
const Cancel = () => {
  return (
    <div className='max-h-[100vh] max-w-[100vw] pt-5 box-border w-full h-[70vh]'>
        <div className='w-[40%] h-auto bg-slate-200 mx-auto flex flex-col items-center justify-center'>
            <div>
                <img src={cancelImage} className='mix-blend-multiply py-3' width={170} height={170} alt="" />
            </div>
            <p className='font-bold capitalize text-red-600 text-2xl'>Payment Failed</p>
            <Link to="/cart" className='my-4 transition-all duration-150 capitalize text-red-600 text-lg px-3 py-1 border-red-600 border-[2px] rounded hover:bg-red-600 hover:text-white'>Go To Cart</Link>
        </div>
    </div>
  )
}

export default Cancel
