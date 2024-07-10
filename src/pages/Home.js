import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import CategoryList from '../components/CategoryList'
import BannerProduct from '../components/BannerProduct'
import HorizontalCardProduct from '../components/HorizontalCardProduct'
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
            <HorizontalCardProduct category={"airpods"} heading={"Top Airpodes"}/>

          </div>
        )
      }
    </div>
  )
}

export default Home