import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import CategoryList from '../components/CategoryList'
import BannerProduct from '../components/BannerProduct'
const Home = () => {
  const user = useSelector((state) => state?.user?.user?.user);
  const navigate = useNavigate()
  useEffect(()=>{
    if(!user){
      navigate("/login")
    }
  },[user,navigate])
  return (
    <div>
      {
        user && (
          <div>
            <CategoryList/>
            <BannerProduct/>
          </div>
        )
      }
    </div>
  )
}

export default Home