import banner1 from "../assest/banner/img1.webp"
import banner2 from "../assest/banner/img2.webp"
import banner3 from "../assest/banner/img3.jpg"
import banner4 from "../assest/banner/img4.jpg"
import banner5 from "../assest/banner/img5.webp"
import mobile1 from "../assest/banner/img1_mobile.jpg"
import mobile2 from "../assest/banner/img2_mobile.webp"
import mobile3 from "../assest/banner/img3_mobile.jpg"
import mobile4 from "../assest/banner/img4_mobile.jpg"
import mobile5 from "../assest/banner/img5_mobile.png"
import { FaAngleLeft } from "react-icons/fa6";
import { FaAngleRight } from "react-icons/fa6";
import { useEffect, useState } from "react"
import ImageResizerComponent from "./ImageResizerComponent"
const BannerProduct = () => {
    const [currentImage,setCurrentImage] = useState(0)
    const desktopBanner = [banner1,banner2,banner3,banner4,banner5]
    const mobileBanner = [mobile1,mobile2,mobile3,mobile4,mobile5]
    const nextImage = () => {
        if(currentImage<desktopBanner.length-1){
            setCurrentImage((prev)=>prev+1)
        }
    }
    const previousImage = () => {
        if(currentImage !== 0){
            setCurrentImage((prev)=>prev-1)
        }
    }
    useEffect(()=>{
        const interval = setInterval(()=>{
            if(currentImage < desktopBanner.length-1){
                nextImage()
            }else{
                setCurrentImage(0)
            }
        },3000)
        return () => clearInterval(interval)
    },[currentImage])
  return (
    <div className='container mx-auto px-4 rounded'>
      <div className='w-full h-72 bg-slate-200 md:flex relative overflow-hidden hidden'>
        <div className="absolute w-full top-[50%] translate-y-[-50%] z-10">
            <div className="flex items-center justify-between bg-red px-3">
            <button onClick={previousImage}  class="w-9 h-9 bg-white font-bold text-xl hover:text-2xl duration-100 rounded shadow-md flex justify-center items-center">
                <FaAngleLeft/>
            </button>
                <button onClick={nextImage}  class="w-9 h-9 bg-white font-bold text-xl hover:text-2xl duration-100 rounded shadow-md flex justify-center items-center">
                    <FaAngleRight/>
                </button>
            </div>
        </div>
        {/* for tablet and laptop */}
            {
                desktopBanner.map((item,index)=>{
                    return(
                    <div className='w-full h-full min-h-full min-w-full transition-all' style={{transform: `translateX(-${currentImage*100}%)`}}  key={index}>
                        <img src={item} alt="" className="w-full h-full "/>
                    </div>
                    )
                })
            }
      </div>
      <div  className='w-full h-56 md:hidden bg-slate-200 flex relative overflow-hidden'>
        {/* for mobile only*/}
                {
                mobileBanner.map((item,index)=>{
                    return(
                    <div className='w-full h-full min-h-full min-w-full transition-all' style={{transform: `translateX(-${currentImage*100}%)`}}  key={index}>
                        <img src={item} alt="" className="w-full h-full object-cover "/>
                    </div>
                    )
                })
                }
      </div>
    </div>
  )
}

export default BannerProduct
