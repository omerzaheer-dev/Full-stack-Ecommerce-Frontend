import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import CategoryList from '../components/CategoryList'
import BannerProduct from '../components/BannerProduct'
import HorizontalCardProduct from '../components/HorizontalCardProduct'
import VerticalCardProduct from "../components/VerticalCardProduct"
const Home = () => {
  const user = useSelector((state) => state?.user?.user?.user);
  return (
    <div>
          <div>
            <CategoryList/>
            <BannerProduct/>
            <HorizontalCardProduct category={"airpods"} heading={"Top Airpodes"}/>
            <HorizontalCardProduct category={"watches"} heading={"Popular Watches"}/>
            <VerticalCardProduct category={"mobile"} heading={"Latest Mobiles"}/>
            <VerticalCardProduct category={"camera"} heading={"Best Cameras"}/>
            <HorizontalCardProduct category={"mouse"} heading={"Quality Mouse"}/>
            <HorizontalCardProduct category={"refrigerator"} heading={"Inverter Refrigerators"}/>
            <HorizontalCardProduct category={"speaker"} heading={"Bass Speakers"}/>
            <VerticalCardProduct category={"trimmer"} heading={"Trimmers"}/>
            <VerticalCardProduct category={"earphone"} heading={"Wired Earphones"}/>
          </div>
    </div>
  )
}

export default Home