import React from 'react'
import { IoMdClose } from "react-icons/io";
const DisplayImage = ({onClose,imgsrc}) => {
  return (
    <div className='fixed flex items-center justify-center left-0 right-0 bottom-0 top-0'>
      <div className='bg-white w-full h-full max-h-[60%] flex items-center justify-center max-w-[30%] shadow-lg relative'>
        <img src={imgsrc} className='px-3 w-auto h-[90%] bg-cover hover:scale-110 transition-all' alt="" />
        <div className='absolute bg-black text-xl rounded-full text-white hover:scale-105 top-3 font-black right-3 cursor-pointer p-[1px]' onClick={onClose}>
          <IoMdClose />
        </div>

      </div>
    </div>
  )
}


export default DisplayImage
