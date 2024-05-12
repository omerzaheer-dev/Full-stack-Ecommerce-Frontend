import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
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
          <h1>Home</h1>
        )
      }
    </div>
  )
}

export default Home