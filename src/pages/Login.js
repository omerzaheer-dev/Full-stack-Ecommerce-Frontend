import React , { useState , useEffect, useContext } from 'react'
import upload from "../assest/signin.gif"
import { FaEye , FaEyeSlash } from "react-icons/fa";
import { Link, useNavigate } from 'react-router-dom';
import { useSelector , useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import summaryApi from "../common/index"
import Context from "../context"
import FetchCartProducts from "../helpers/FetchCartProducts"
const Login = () => {
  const [showPassword, setShowPassword] = useState(true)
  const [submitDisable,setsubmitDisable] = useState(true)
  const dispatch = useDispatch()
  const navigate = useNavigate();
  const {fetchUserDetails} = useContext(Context);
  const [data, setData] = useState({
    email:"",
    password:""
  })
  const user = useSelector((state) => state?.user?.user?.user);
  useEffect(()=>{
    if(user){
      navigate("/")
    }
  },[user,navigate])

  const onHandle = (e) => {
    const {name, value} = e.target
    setData((prev)=>{
      return {
        ...prev,
        [name]:value
      }
    })
  }
  useEffect(()=>{
    if(data.email === "" || data.password === ""){
      setsubmitDisable(true)
    }else{
      setsubmitDisable(false)
    }
  },[data])
  const handleSubmit = async (e)=>{
    e.preventDefault()
    if(submitDisable){
      toast.warning("All fields are required")
    }
    else{
      try {
        const dataResponse = await fetch(summaryApi.signIn.url,{
          method:summaryApi.signIn.method,
          credentials:'include',
          headers:{
            'Content-Type':'application/json'
          },
          body:JSON.stringify(data)
        })
        const dataApi = await dataResponse.json()
        if(dataApi?.success){
          await fetchUserDetails()
          navigate('/')
          await FetchCartProducts(dispatch);
          toast.success(dataApi.message)
        }else{
          toast.error(dataApi.message)
        }
      } catch (error) {
        console.log(error)
      }
    }
  }

  return (
    <div>
        <section className='px-4 py-6 container mx-auto max-w-md'>
            <div className='bg-white px-4 pt-5 pb-3'>
              <div className='w-20 h-20 mx-auto'>
                <img src={upload}  alt="upload icon" />
              </div>
              <form className="mt-5 flex flex-col gap-2" onSubmit={handleSubmit}>
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
                    <Link to="/forgot-password" className='w-fit ml-auto hover:underline hover:text-red-600'>Forgot Password</Link>
                  </div>
                  <button className='px-12 py-3 bg-red-600 mt-5 mb-3 rounded-full text-white font-bold text-xl hover:scale-110 hover:bg-red-700 block mx-auto'>Login</button>
              </form>
              <p>Don't have an account ?  <Link to="/sign-up" className="text-red-600 hover:underline hover:text-red-700">Sign Up</Link></p>
            </div>
        </section>
    </div>
  )
}

export default Login