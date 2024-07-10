import { FetchCategoryWiseProducts } from "../helpers/FetchCategoryWiseProducts"
import ImageResizerComponent from "./ImageResizerComponent"
import "../App.css"
const HorizontalCardProduct = ({category,heading}) => {
    const loadingList = new Array(13).fill(null)
    const { data, isLoading, } = FetchCategoryWiseProducts(category);
    console.log(data)
  return (
    <div className='container my-5 mx-auto px-4'>
        <h1 className='font-semibold text-2xl capitalize'>{heading}</h1>
        <div className='mt-2 flex gap-4 scrollbar-none'>
          {
            data && data.map((product,index)=>{
              return (
                <div key={index} className='flex h-[208px] w-[392px] bg-red-600 items-center justify-center'>
                  <div className="w-[196px] h-[208px] bg-slate-200 overflow-hidden ">
                    <ImageResizerComponent imgUrl={product.productImage[0]} Width={196} Height={208} ph={208} pb={196}/>
                    {/* <img src={product.productImage[0]} alt="" className="object-fill w-full h-full"/> */}
                  </div>
                  <div className="w-[196px] h-[208px] bg-blue-600">
                    rdrze
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
