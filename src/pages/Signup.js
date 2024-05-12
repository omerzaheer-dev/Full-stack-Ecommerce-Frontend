import React , { useEffect, useState } from 'react'
import upload from "../assest/signin.gif"
import { FaEye , FaEyeSlash } from "react-icons/fa";
import { Link, useNavigate } from 'react-router-dom';
import ImageToBase64 from '../helpers/ImageToBase64';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import summaryApi from "../common/index"
const Signup = () => {
  const [showPassword, setShowPassword] = useState(true)
  const [showConfirmPassword, setShowConfirmPassword] = useState(true)
  const [submitDisable,setsubmitDisable] = useState(true)
  const [data, setData] = useState({
    name:"",
    email:"",
    password:"",
    confirmPassword:"",
    profilePicture:null
  })
  const [file, setFile] = useState(null);
  const navigate = useNavigate()
  const user = useSelector((state) => state?.user?.user?.user);
  useEffect(()=>{
    if(user){
      navigate("/")
    }
  },[user,navigate])
  useEffect(()=>{
    if(data.email === "" || data.name === "" || data.password === "" || data.confirmPassword === ""){
      setsubmitDisable(true)
    }else{
      setsubmitDisable(false)
    }
  },[data])
  const handleUploadPhoto = (e) => {
    const file = e.target.files[0]
    if (file && file.type.startsWith('image/')) {
      setData((prev)=>{
        return {
          ...prev,
          profilePicture:file
        }
      })
      ////////////////////////////////////
      ImageToBase64(file).then((result)=>{
        setFile(result)
      }
      )
    } else {
      toast.error("Please select an image file")
    }
  }
  const onHandle = (e) => {
    const {name, value} = e.target
    setData((prev)=>{
      return {
        ...prev,
        [name]:value
      }
    })
  }
  const handleSubmit = async(e)=>{
    e.preventDefault()
    if(submitDisable){
      toast.warning("All fields are required")
    }
    else if(data.password === data.confirmPassword){
      const formData = new FormData();
      if(data.profilePicture !== null){
        formData.append('profilePicture', data.profilePicture);
      }
      formData.append('name', data.name);
      formData.append('email', data.email);
      formData.append('password', data.password);
      formData.append('confirmPassword', data.confirmPassword);
      const dataResponse = await fetch(summaryApi.signUp.url,{
        method:summaryApi.signUp.method,
        body:formData
      })
      const dataApi = await dataResponse.json();
      if(dataApi.success){
        toast.success(dataApi.message)
        navigate('/login')
      }else{
        toast.error(dataApi.message)
      }
      
    }else{
      toast.warning("Please check Password and Confirm Password")
    }
  }

  return (
      <section className='px-4 py-6 container mx-auto max-w-md'>
        <div className='bg-white px-4 pt-5 pb-3'>
          <div className='w-20 h-20 mx-auto relative rounded-full overflow-hidden'>
            <div>
              <img src={file || upload}  alt="upload icon" />
            </div>
              <form>
                <label>
                  <div className='px-1 cursor-pointer pb-2 tracking-tighter pt-[2px] bg-opacity-[70%] leading-4 bg-slate-200 absolute text-sm text-center bottom-[-2px]'>
                    Upload Photo
                  </div>
                  <input type="file" name='profilePicture' className='hidden' onChange={handleUploadPhoto}/>
                </label>
              </form>
          </div>
          <form className="mt-5 flex flex-col gap-1" onSubmit={handleSubmit}>

              <div className='grid'>
                <label className='ml-1 my-1 font-semibold'>Name :</label>
                <div className='bg-slate-100 p-2'>
                  <input type="text" placeholder='Enter your name' name="name" value={data.name} onChange={onHandle} className='bg-transparent w-full outline-none'/>
                </div>
              </div>

              <div className='grid'>
                <label className='ml-1 my-1 font-semibold'>Email :</label>
                <div className='bg-slate-100 p-2'>
                  <input type="email" placeholder='Enter your email' name="email" value={data.email} onChange={onHandle} className='bg-transparent w-full outline-none'/>
                </div>
              </div>

              <div className='grid'>
                <label className='ml-1 my-1 font-semibold'>Password :</label>
                <div className='bg-slate-100 p-2 flex items-center justify-between'>
                  <input type={showPassword===true ? 'password':'text'} name="password" value={data.password} onChange={onHandle} placeholder='Enter your password' className='bg-transparent w-full outline-none'/>
                  <div className='cursor-pointer' onClick={()=>setShowPassword(!showPassword)}>

                    {
                      showPassword===true ? <span><FaEye /></span>:<span><FaEyeSlash /></span>
                    }
                    
                  </div>
                </div>
              </div>

              <div className='grid'>
                <label className='ml-1 my-1 font-semibold'>Confirm Password :</label>
                <div className='bg-slate-100 p-2 flex items-center justify-between'>
                  <input type={showConfirmPassword===true ? 'password':'text'} name="confirmPassword" value={data.confirmPassword} onChange={onHandle} placeholder='Enter your password' className='bg-transparent w-full outline-none'/>
                  <div className='cursor-pointer' onClick={()=>setShowConfirmPassword(!showConfirmPassword)}>

                    {
                      showConfirmPassword===true ? <span><FaEye /></span>:<span><FaEyeSlash /></span>
                    }
                    
                  </div>
                </div>
              </div>



              <button className='px-12 py-3 bg-red-600 mt-5 mb-3 rounded-full text-white font-bold text-xl hover:scale-110 hover:bg-red-700 block mx-auto'>Sign Up</button>
          </form>
          <p>Aready have an account ?  <Link to="/login" className="text-red-600 hover:underline hover:text-red-700">Login</Link></p>
        </div>
    </section>
  )
}
export default Signup
