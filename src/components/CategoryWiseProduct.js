import { FetchCategoryWiseProducts } from "../helpers/FetchCategoryWiseProducts"
import ImageResizerComponent from "./ImageResizerComponent"
import "../App.css"
import { useRef } from "react"
import { Link } from "react-router-dom"
import { AddToCart } from "../helpers/AddToCart"
import { useDispatch , useSelector } from 'react-redux';
const CategoryWiseProduct = ({category,heading}) => {
  const dispatch = useDispatch();
    const loadingList = new Array(13).fill(null)
    const cartSelector = useSelector((state) => state?.cart?.cart);
    const scrollRef = useRef()
    const { data, isLoading, } = FetchCategoryWiseProducts(category);
  return (
    <div className='container my-5 mx-auto px-3 md:relative'>
        <h1 className='font-semibold text-2xl capitalize md:mx-5 lg:mx-0'>{heading}</h1>
        {
          isLoading===true ? 
          (
            <div ref={scrollRef} className='mt-2 gap-5 grid rounded-md mb-2'>
          {
            loadingList.map((product,index)=>{
              return (
                <div key={index} className=' md:h-[345px] md:w-[220px] animate-pulse rounded-md h-[280px] w-[190px'>
                  <div className="w-[220px] h-[200px] hidden bg-slate-200 overflow-hidden md:flex items-center justify-center">
                    {/* <ImageResizerComponent imgUrl={product.productImage[0]} Width={152} Height={191} ph={197} pw={158}/> */}
                  </div>
                  <div className="w-[190px] h-[170px] md:hidden bg-slate-200 overflow-hidden flex items-center justify-center">
                    {/* <ImageResizerComponent imgUrl={product.productImage[0]} Width={1200} Height={160} ph={166} pw={125}/> */}
                  </div>
                  <div className="md:w-[220px] md:h-[145px] w-[190px] h-[110px] bg-white">
                    <div className="md:p-4 p-2">
                      <div className="text-ellipsis capitalize font-medium md:text-lg text-base line-clamp-1  border-slate-400 bg-slate-400 p-1 rounded-full border-[1px]"></div>
                      <div className="text-slate-500 capitalize md:mt-[10px] mt-[8px] p-[3px] w-[50%] border-[1px] border-slate-400 bg-slate-400 rounded-full"></div>
                      <div className="flex items-center justify-start md:gap-4 gap-3 md:mt-[17px] mt-[11px]">
                        <div className="text-red-600 px-5 py-1 bg-slate-400 border-[2px] rounded-full border-slate-400"></div>
                        <div className="text-slate-500 line-through px-5 py-1 bg-slate-400 border-[2px] rounded-full border-slate-400"></div>
                      </div>
                      <div className="md:min-w-full md:max-w-full mt-4 md:mt-5 mx-auto">
                          <div className="bg-slate-400 md:mx-auto md:min-w-[90%] md:max-w-[90%] min-w-[80%] max-w-[80%] md:py-3 py-2 px-4 md:px-6 text-center text-white font-medium rounded-full"></div>
                      </div>
                    </div>
                  </div>
                </div>
              )
            })
          }
        </div>
          )
          :
          (
          <div ref={scrollRef} className='mt-2 grid gap-y-6 justify-between md:mx-5 lg:mx-0 md:grid-cols-[repeat(auto-fit,minmax(160px,213px))] lg:grid-cols-[repeat(auto-fit,minmax(300px,310px))] rounded-md mb-2'>
                {
                  data.map((product,index)=>{
                    return (
                      <Link to={"/product/"+product?._id} key={index} className=' md:h-[345px] md:w-[220px] rounded-md h-[280px] w-[190px] bg-red-600'>
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
                            {
                            cartSelector && cartSelector.some(item => item.productId._id === product?._id) ?
                                <div className="bg-white hover:bg-red-600 hover:text-white border-red-600 border-[2px] mx-auto w-[90%] py-[1px] transition-all duration-200 px-2 md:px-3 text-center text-red-600 font-medium rounded-full"onClick={(e)=> AddToCart(e,product?._id,dispatch)}>Remove from Cart</div>
                                :
                                <div className="bg-red-600 mx-auto w-[90%] hover:bg-red-700 py-[2px] transition-all duration-200 px-4 md:px-6 text-center text-white font-medium rounded-full"onClick={(e)=> AddToCart(e,product?._id,dispatch)}>Add to Cart</div>
                            }
                            </div>
                          </div>
                        </div>
                      </Link>
                    )
                  })
                }
              </div>
          )
        }
    </div>
  )
}

export default CategoryWiseProduct
