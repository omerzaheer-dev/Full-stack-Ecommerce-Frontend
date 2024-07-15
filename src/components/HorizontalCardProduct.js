import { FetchCategoryWiseProducts } from "../helpers/FetchCategoryWiseProducts"
import ImageResizerComponent from "./ImageResizerComponent"
import "../App.css"
import { FaAngleLeft, FaAngleRight } from "react-icons/fa6"
import { useRef, useState } from "react"
const HorizontalCardProduct = ({category,heading}) => {
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
        <div ref={scrollRef} className='mt-2 flex gap-4 overflow-scroll scrollbar-none transition-all duration-1000 rounded-md'>
          {
            data && data.map((product,index)=>{
              return (
                <div key={index} className='flex md:h-[165px] md:w-[343px] rounded-md h-[112px] w-[286px] bg-red-600 items-center justify-center'>
                  <div className="w-[155px] h-[166px] hidden bg-slate-200 overflow-hidden md:flex items-center justify-center">
                    <ImageResizerComponent imgUrl={product.productImage[0]} Width={125} Height={150} ph={160} pw={134}/>
                  </div>
                  <div className="w-[116px] h-[112px] md:hidden bg-slate-200 overflow-hidden flex items-center justify-center">
                    <ImageResizerComponent imgUrl={product.productImage[0]} Width={83} Height={98} ph={104} pw={88}/>
                  </div>
                  <div className="md:w-[188px] md:h-[165px] w-[170px] h-[112px] bg-white">
                    <div className="md:p-4 p-2">
                      <h2 className="text-ellipsis capitalize font-medium md:text-lg text-base line-clamp-1">{product?.productName}</h2>
                      <p className="text-slate-500 capitalize md:mt-[0px] mt-[-8px]">{product?.category}</p>
                      <div className="flex items-center justify-start md:gap-4 gap-3 md:mt-[0px] mt-[-4px]">
                        <div className="text-red-600 font-semibold">PKR{product?.price}</div>
                        <div className="text-slate-500 line-through">PKR{product?.sellingPrice}</div>
                      </div>
                      <div className="md:min-w-full md:max-w-full mt-[5px] md:mt-3 mx-auto">
                          <div className="bg-red-600 md:mx-auto md:w-[90%] w-[80%] hover:bg-red-700 py-[2px] px-4 md:px-6 text-center text-white font-medium rounded-full">Add to Cart</div>
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

export default HorizontalCardProduct
