import React, { useState , useEffect ,useRef} from 'react'
import summaryApi from '../common'
import { useLocation , Link } from 'react-router-dom'
import { toast } from 'react-toastify'
import { useDispatch , useSelector } from 'react-redux';
import ImageResizerComponent from "../components/ImageResizerComponent"
import { AddToCart } from "../helpers/AddToCart"
import { useInView } from 'react-intersection-observer';
const Search = () => {
    const dispatch = useDispatch();
    const cartSelector = useSelector((state) => state?.cart?.cart);
    const {search} = useLocation()
    const [data,setData] = useState([])
    const [totalProducts,setTotalProducts] = useState()
    const [page, setPage] = useState(1);
    const [pageSize] = useState(8);
    const [totalPages, setTotalPages] = useState(0);
    const [hasMore, setHasMore] = useState(true);
    const [loading, setLoading] = useState(false);
    const abortController = useRef(null);
    const [ref, inView] = useInView({
      threshold: 0.1, // Adjust based on your needs
    });
  const handlePageChange = (page) => {
    if (page > 0 && page <= totalPages) {
      setPage(page);
    }
  };
  const searchHandle = async () => {
    if (abortController.current) {
      abortController.current.abort();
    }
    abortController.current = new AbortController();
    const { signal } = abortController.current;
    setLoading(true);
    setHasMore(false)
    try {
        const response = await fetch(`${summaryApi.searchProducts.url}${search}&page=${page}&pageSize=${pageSize}`, {
            method: summaryApi.searchProducts.method,
            signal,
        });
        const dataResponse = await response.json();
        if (dataResponse?.success) {
          setData(dataResponse?.data?.products);
          setTotalPages(dataResponse?.data?.totalPages);
          setPage(dataResponse?.data?.currentPage);
          setTotalProducts(dataResponse?.data?.totalProducts)
          setHasMore(dataResponse?.data?.hasMore)
        } else {
            toast.error(dataResponse?.message,{autoClose: 1000,});
        }
        } catch (error) {
            console.error("There has been a problem with your fetch operation:", error);
        } finally {
          setLoading(false);
        }
  };
  useEffect(() => {
    handlePageChange(1)
  },[search])
  useEffect(() => {
    searchHandle()
  },[page,search])
  return (
    <>
      {
        loading && (
          <div>
            Loading...
          </div>
        )
      }
      {
        !loading && (
          <p className='text-xl px-10 pt-8 pb-5 font-semibold'>Search Results : <span className="text-red-600">{totalProducts}</span></p>

        )
      }
      {
        data?.length===0 && !loading && (
          <div>No Products Found...</div>
        )
      }
      {
        data?.length!==0 && !loading && (
          <div className='my-4 grid gap-y-6 mx-auto grid-cols-[repeat(2,minmax(0,1fr))] md:grid-cols-[repeat(3,minmax(0,1fr))] place-items-center justify-items-center lg:grid-cols-[repeat(4,minmax(0,1fr))] rounded-md'>
              {
                data.map((product,index)=>{
                  return (
                    <Link to={"/product/"+product?._id} key={index} className='shadow-lg lg:h-[360px] md:h-[300px] md:w-[195px] lg:w-[225px] rounded-md h-[280px] w-[190px] bg-red-600' >
                      <div className="lg:w-[225px] lg:h-[215px] md:w-[195px] md:h-[175px]  hidden bg-slate-200 overflow-hidden md:flex items-center justify-center">
                        {/* <ImageResizerComponent imgUrl={product.productImage[0]} Width={152} Height={191} ph={197} pw={158}/> */}
                        <img src={product.productImage[0]} alt="" className="lg:max-w-[225px] md:max-w-[195px] md:max-h-[175px] mix-blend-multiply lg:max-h-[215px] lg:min-w-[145px] w-auto h-auto lg:min-h-[180px]"/>
                      </div>
                      <div className="w-[190px] h-[170px] md:hidden bg-slate-200 overflow-hidden flex items-center justify-center">
                        <ImageResizerComponent imgUrl={product.productImage[0]} Width={120} Height={160} ph={166} pw={125}/>
                      </div>
                      <div className="lg:w-[225px] lg:h-[145px] md:w-[195px] md:h-[125px] w-[190px] h-[110px] bg-white">
                        <div className="lg:p-4 p-2">
                          <h2 className="text-ellipsis capitalize font-medium lg:text-lg text-base line-clamp-1">{product?.productName}</h2>
                          <p className="text-slate-500 capitalize lg:mt-[0px] md:mt-[-6px] mt-[-8px]">{product?.category}</p>
                          <div className="flex items-center justify-start md:gap-4 gap-3 lg:mt-[0px] md:mt-[-2px] mt-[-4px]">
                            <div className="text-red-600 font-semibold ">PKR{product?.price}</div>
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
      <div>
        {Array.from({ length: totalPages }, (_, index) => (
          <button
          on
            key={index + 1}
            onClick={() => handlePageChange(index + 1)}
            disabled={loading}
            style={{ margin: '0 2px', background: page === index + 1 ? '#ddd' : 'transparent' }}
          >
            {index + 1}
          </button>
        ))}
      </div>
      <div className='hidden'>
        <div ref={ref}></div> {/* Sentinel element */}
        {hasMore && loading && <p>Loading more products...</p>}
      </div>
    </>
  )
}

export default Search