import React , { useState , useEffect } from 'react'
import { IoMdClose } from "react-icons/io";
import { MdDelete } from "react-icons/md";
import summaryApi from '../common';
import ProductCategory from '../helpers/ProductCategory';
import DisplayImage from './DisplayImage';
import { IoCloudUploadOutline } from "react-icons/io5";
import { toast } from 'react-toastify';
import '../App.css'
const UploadProduct = ({onClose,refetchData}) => {

  const [displayFullImage,setdisplayFullImage] = useState("")
  const [openFullImage,setopenFullImage] = useState(false)
  const [submitDisable,setsubmitDisable] = useState(true)
  const [data,setData] = useState({
    productName:"",
    price:"",
    description:"",
    productImage:[],
    brand:"",
    category:"airpods",
    sellingPrice:""
  })
  useEffect(()=>{
    if(data.productName === "" || data.price === "" || data.description === "" || data.brand === "" || data.category === "" || data.sellingPrice === ""){
      setsubmitDisable(true)
    }else{
      setsubmitDisable(false)
    }
  },[data])
  const [selectedImages, setSelectedImages] = useState([]);
  const handleChange = (e) => {
    const {name, value} = e.target
    setData((prev)=>{
      return {
        ...prev,
        [name]:value
      }
    })
  }
  const handleUploadProduct = (e) => {
    const files = e.target.files
    if(files.length>1){
      if (files) {
        const fileArray = Array.from(files).map(file => URL.createObjectURL(file));
        setSelectedImages(fileArray);
        setData(prevData => ({
          ...prevData,
          productImage: [...prevData.productImage,...files]
         }));
      }
    }
    else{
      if(files){
        setSelectedImages(prevArr => [...prevArr,URL.createObjectURL(files[0])])
        setData(prevData => ({
          ...prevData,
          productImage: [...prevData.productImage,files[0]]
         }));
      }
    }
  }
  const handleUploadProductSubmit = async (e) => {
    e.preventDefault()
    if(submitDisable){
      toast.warning("All fields are required")
    }else{
      const formData = new FormData();
      if(data.productImage.length > 0){
        data.productImage.map((file)=>
          formData.append('productImages',file)
        )
      formData.append('productName', data.productName);
      formData.append('price', data.price);
      formData.append('description', data.description);
      formData.append('category', data.category);
      formData.append('brand', data.brand);
      formData.append('sellingPrice', data.sellingPrice);
      const dataResponse = await fetch(summaryApi.uploadProduct.url,{
        method:summaryApi.uploadProduct.method,
        body:formData,
        credentials:"include"
      })
      const dataApi = await dataResponse.json();
      if(dataApi.success){
        refetchData()
        toast.success(dataApi.message,{autoClose: 2000,})
      }else{
        toast.error(dataApi.message,{autoClose: 2000,})
      }
      }
      else{
        toast.error("please upload a product image",{autoClose: 2000,})
      }
    }
  }
  const disSelectImage = (index) => {
    setSelectedImages(prevImages => prevImages.filter((_, i) => i!== index));
    setData(prevData => ({
      ...prevData,
      productImage: prevData.productImage.filter((_, i) => i!== index)
     }));
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
      <form onSubmit={handleUploadProductSubmit} className='grid gap-[5px] px-3 pt-1 pb-12 overflow-y-scroll h-full'>
        <label htmlFor='productName'>Product Name:</label>
        <input type="text"
        id='productName'
        placeholder='Enter Product Name'
        name='productName'
        value={data.productName}
        onChange={handleChange}
        className='py-1 px-2 rounded bg-slate-100 border outline-slate-200'
        />

        <label htmlFor='description'>Description:</label>
        <input type="text"
        id='description'
        placeholder='Enter description...'
        name='description'
        value={data.description}
        onChange={handleChange}
        className='pt-1 pb-16 px-2 rounded bg-slate-100 border outline-slate-200'
        />

      <label htmlFor='category'>Category:</label>
      <select className='outline-slate-200 bg-slate-100 py-1 px-2 border rounded' onChange={handleChange} name='category' value={data.category}>
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
            <input type="file" accept="image/*" multiple className='hidden' id='uploadImageInput' onChange={handleUploadProduct}/>
        </div>
      </label>
      {
      selectedImages.length === 0 ? (<p>
        <span className='text-red-500'>Please select product images</span>
      </p>):(
        <div className='hidden'></div>
      ) 
      }
        <div className={`gap-4 grid grid-cols-4 ${selectedImages.length > 0 ? "p-2 border-slate-100 border-[1px]":"p-0"}`}>
          {selectedImages.map((image, index) => (
            <div className='w-[100px] h-[106px] relative group' key={index}>
              <img src={image} alt={`Selected ${index}`} className='w-full rounded-sm h-full border-slate-100 border-[2px] bg-cover' onClick={()=>{setdisplayFullImage(image); setopenFullImage(true) }} />
              <div className='absolute bottom-1 font-bold right-1 bg-red-600 text-white rounded-full cursor-pointer p-1 hidden group-hover:block' onClick={()=>disSelectImage(index)}>
                <MdDelete />
              </div>
            </div>
          ))}
        </div>

        <label htmlFor='price'>Price:</label>
        <input type='number'
        id='price'
        placeholder='Enter Price'
        name='price'
        value={data.price}
        onChange={handleChange}
        className='py-1 px-2 rounded bg-slate-100 border outline-slate-200'
        />

        <label htmlFor='sellingPrice'>Selling Price:</label>
        <input type='number'
        id='sellingPrice'
        placeholder='Enter Selling Price'
        name='sellingPrice'
        value={data.sellingPrice}
        onChange={handleChange}
        className='py-1 px-2 rounded bg-slate-100 border outline-slate-200'
        />

        <label htmlFor='brand'>Brand:</label>
        <input type="text"
        id='brand'
        placeholder='Enter Brand'
        name='brand'
        value={data.brand}
        onChange={handleChange}
        className='py-1 px-2 rounded bg-slate-100 border outline-slate-200'
        />

        <button className='px-20 py-2 mt-4 bg-red-600 rounded-md text-white font-medium font-serif text-xl hover:scale-105 transition-all hover:bg-red-700 block mx-auto'>Upload Product</button>
      </form>
      </div>
      {
        openFullImage && <DisplayImage imgsrc={displayFullImage} onClose={()=>setopenFullImage(false)}/>
      }
    </div>
  )
}

export default UploadProduct
