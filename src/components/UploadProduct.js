import React , { useState } from 'react'
import { IoMdClose } from "react-icons/io";
import ProductCategory from '../helpers/ProductCategory';
import { IoCloudUploadOutline } from "react-icons/io5";
import '../App.css'
const UploadProduct = ({onClose}) => {
  const [data,setData] = useState({
    productName:"",
    price:"",
    description:"",
    productImage:"",
    brand:"",
    category:"",
    selling:""
  })
  const handleChange = (e) => {

  }
  return (
    <div className='fixed bg-slate-200 w-full h-full left-0 top-0 flex items-center justify-center bg-opacity-40'>
      <div className='py-2 px-4 bg-white w-full h-full max-w-lg max-h-[70%] overflow-hidden'>
      <div className='flex pb-2 items-center justify-between text-xl font-semibold'>
        <h2>Product</h2>
            <button className='hover:text-red-600' onClick={onClose}>
                <IoMdClose />
            </button>
      </div>
      <form className='grid gap-2 px-3 pt-1 pb-8 overflow-y-scroll h-full'>
        <label htmlFor='productName'>Product Name:</label>
        <input type="text"
        id='productName'
        placeholder='Enter Product Name'
        value={data.productName}
        onChange={handleChange}
        className='py-1 px-2 rounded bg-slate-100 border outline-slate-200'
        />

        <label htmlFor='brand'>Brand:</label>
        <input type="text"
        id='brand'
        placeholder='Enter Brand'
        value={data.brand}
        onChange={handleChange}
        className='py-1 px-2 rounded bg-slate-100 border outline-slate-200'
        />

      <label htmlFor='category'>Category:</label>
      <select className='outline-slate-200 bg-slate-100 py-1 px-2 border rounded'>
        {
          ProductCategory.map((el,index)=>{
            return(
              <option className='hover:bg-slate-200' value={el.value} key={el.id+index}>{el.label}</option>
            )
          })
        }
      </select>
      <label htmlFor='productImage'>Product Image:</label>
      <label htmlFor='uploadImageInput'>
        <div className='h-36 px-2 rounded bg-slate-100 border flex flex-col items-center justify-center gap-1 cursor-pointer outline-slate-200'>
              <div className='gap-1 flex flex-col items-center justify-center'>
                <span className='text-3xl text-slate-400'><IoCloudUploadOutline /></span>
                <p className='text-slate-400'>Upload product images</p>
                </div>
            <input type="file" className='hidden' id='uploadImageInput'/>
        </div>
      </label>
      <IoCloudUploadOutline />
      </form>
      </div>
    </div>
  )
}

export default UploadProduct
