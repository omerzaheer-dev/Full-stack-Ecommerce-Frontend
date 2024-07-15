import { FetchCategoryWiseProducts } from "../helpers/FetchCategoryWiseProducts"
import ImageResizerComponent from "./ImageResizerComponent"
import "../App.css"
import { FaAngleLeft, FaAngleRight } from "react-icons/fa6"
import { useRef, useState } from "react"
const VerticalCardProduct = ({category,heading}) => {
    const loadingList = new Array(13).fill(null)
    const [scroll,setScroll] = useState(0)
    const scrollRef = useRef()
    const { data, isLoading, } = FetchCategoryWiseProducts(category);
    console.log(data)
    const rightScroll = () => {
      scrollRef.current.scrollLeft += 470
    }
    const leftScroll = () => {
      scrollRef.current.scrollLeft -= 470
    }
  return (
    <div className='container my-5 mx-auto px-3 md:relative'>
        <h1 className='font-semibold text-2xl capitalize'>{heading}</h1>
        <button onClick={leftScroll}  class="w-9 h-9 hidden bg-white absolute font-bold top-[50%] z-10 -translate-y-[50%] left-0 text-xl hover:text-2xl duration-100 rounded shadow-md md:flex justify-center items-center">
                <FaAngleLeft/>
        </button>
        <button onClick={rightScroll} class="w-9 h-9 hidden bg-white absolute top-[50%] z-10 -translate-y-[50%] right-0 font-bold text-xl hover:text-2xl duration-100 rounded shadow-md md:flex justify-center items-center">
                <FaAngleRight/>
          </button>
        <div ref={scrollRef} className='mt-2 gap-5 overflow-scroll scrollbar-none flex transition-all duration-1000 rounded-md mb-2'>
          {
            data && data.map((product,index)=>{
              return (
                <div key={index} className=' md:h-[345px] md:w-[220px] rounded-md h-[280px] w-[190px] bg-red-600'>
                  <div className="w-[220px] h-[200px] hidden bg-slate-200 overflow-hidden md:flex items-center justify-center">
                    <ImageResizerComponent imgUrl={product.productImage[0]} Width={152} Height={191} ph={197} pw={158}/>
                  </div>
                  <div className="w-[190px] h-[170px] md:hidden bg-slate-200 overflow-hidden flex items-center justify-center">
                    <ImageResizerComponent imgUrl={product.productImage[0]} Width={1200} Height={160} ph={166} pw={125}/>
                  </div>
                  <div className="md:w-[220px] md:h-[145px] w-[190px] h-[110px] bg-white">
                    <div className="md:p-4 p-2">
                      <h2 className="text-ellipsis capitalize font-medium md:text-lg text-base line-clamp-1">{product?.productName}</h2>
                      <p className="text-slate-500 capitalize md:mt-[0px] mt-[-8px]">{product?.category}</p>
                      <div className="flex items-center justify-start md:gap-4 gap-3 md:mt-[0px] mt-[-4px]">
                        <div className="text-red-600 font-semibold">PKR{product?.price}</div>
                        <div className="text-slate-500 line-through">PKR{product?.sellingPrice}</div>
                      </div>
                      <div className="md:min-w-full md:max-w-full mt-[5px] md:mt-2 mx-auto">
                          <div className="bg-red-600 mx-auto w-[90%] hover:bg-red-700 py-[2px] transition-all duration-200 px-4 md:px-6 text-center text-white font-medium rounded-full">Add to Cart</div>
                      </div>
                    </div>
                  </div>
                </div>
              )
            })
          }
        </div>
    </div>
  )
}

export default VerticalCardProduct
