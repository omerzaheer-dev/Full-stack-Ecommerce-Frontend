import React, { useState , useEffect ,useRef} from 'react'
import summaryApi from '../common'
import { useLocation , Link } from 'react-router-dom'
import { toast } from 'react-toastify'
import { useDispatch , useSelector } from 'react-redux';
import ImageResizerComponent from "../components/ImageResizerComponent"
import { AddToCart } from "../helpers/AddToCart"
// import { useInView } from 'react-intersection-observer';
const Search = () => {
    const dispatch = useDispatch();
    const cartSelector = useSelector((state) => state?.cart?.cart);
    const user = useSelector((state) => state?.user?.user?.user);
    const {search} = useLocation()
    // const urlSearch = new URLSearchParams(search)
    // const urlSearchInArray = urlSearch.getAll("q")
    // console.log("qq",urlSearchInArray)
    const [data,setData] = useState([])
    const [totalProducts,setTotalProducts] = useState()
    const [page, setPage] = useState(1);
    const [pageSize] = useState(12);
    const [totalPages, setTotalPages] = useState(0);
    const loadingList = new Array(13).fill(null)
    const [hasMore, setHasMore] = useState(true);
    const [loading, setLoading] = useState(false);
    const abortController = useRef(null);
    // const [ref, inView] = useInView({
    //   threshold: 1, // Adjust based on your needs
    // });
  const PagetoOne = (page) => {
      setPage(page);
  };
  const handlePageChange = (page) => {
    if (page > 0 && page <= totalPages) {
      setPage(page);
      window.scrollTo({ top:0 , behavior:"instant"})
    }
  }
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
  const DataList = React.memo(({ data }) => (
    <div className='my-4 grid gap-y-4 mx-auto grid-cols-[repeat(1,minmax(0,1fr))] md:grid-cols-[repeat(3,minmax(0,1fr))] place-items-center justify-items-center lg:grid-cols-[repeat(4,minmax(0,1fr))] rounded-md'>
              {
                data.map((product,index)=>{
                  return (
                    <Link to={"/product/"+product?._id} key={index} className='shadow-lg lg:h-[360px] md:h-[300px] md:w-[210px] lg:w-[250px] rounded-md h-[280px] w-[235px] bg-red-600'>
                      <div className="lg:w-[250px] lg:h-[215px] md:w-[210px] md:h-[175px]  hidden bg-slate-200 overflow-hidden md:flex items-center justify-center">
                        {/* <ImageResizerComponent imgUrl={product.productImage[0]} Width={152} Height={191} ph={197} pw={158}/> */}
                        <img src={product.productImage[0]} alt="" className="lg:max-w-[250px] md:max-w-[210px] md:max-h-[175px] mix-blend-multiply bg-contain lg:max-h-[215px] lg:min-w-[145px] w-auto h-auto lg:min-h-[180px]"/>
                      </div>
                      <div className="w-[235px] h-[170px] md:hidden bg-slate-200 overflow-hidden flex items-center justify-center">
                        <ImageResizerComponent imgUrl={product.productImage[0]} Width={"auto"} Height={"auto"} ph={170} pw={235}/>
                      </div>
                      <div className="lg:w-[250px] lg:h-[145px] md:w-[210px] md:h-[125px] w-[235px] h-[110px] bg-white">
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
                              <div className="bg-white hover:bg-red-600 hover:text-white border-red-600 border-[2px] mx-auto w-[90%] py-[1px] transition-all duration-200 px-2 md:px-3 text-center text-red-600 font-medium rounded-full"onClick={(e)=> AddToCart(e,product?._id,dispatch,user)}>Remove from Cart</div>
                              :
                              <div className="bg-red-600 mx-auto w-[90%] hover:bg-red-700 py-[2px] transition-all duration-200 px-4 md:px-6 text-center text-white font-medium rounded-full"onClick={(e)=> AddToCart(e,product?._id,dispatch,user)}>Add to Cart</div>
                          }
                          </div>
                        </div>
                      </div>
                    </Link>
                  )
                })
              }
    </div>
  ));
  useEffect(() => {
    PagetoOne(1)
  },[search])
  useEffect(() => {
      searchHandle()
  },[page,search])
  return (
    <div className='w-full'>
      {
        loading && (
          <div className='my-4 md:pt-8 pt-5 grid gap-y-6 mx-auto grid-cols-[repeat(1,minmax(0,1fr))] md:grid-cols-[repeat(3,minmax(0,1fr))] place-items-center justify-items-center lg:grid-cols-[repeat(4,minmax(0,1fr))] rounded-md'>
              {
                loadingList.map((product,index)=>{
                  return (
                    <div key={index} className='shadow-lg animate-pulse transition-all duration-100 lg:h-[360px] md:h-[300px] md:w-[195px] lg:w-[225px] rounded-md h-[280px] w-[220px] bg-red-600' >
                      <div className="lg:max-w-[225px] w-full h-full lg:max-h-[215px] md:max-w-[195px] md:max-h-[175px]  hidden bg-slate-200 overflow-hidden md:flex items-center justify-center">
                      </div>
                      <div className="max-w-[220px] w-full h-full max-h-[170px] md:hidden bg-slate-200 overflow-hidden flex items-center justify-center">
                      </div>
                      <div className="lg:w-[225px] lg:h-[145px] md:w-[220px] md:h-[125px] w-[190px] h-[110px] bg-white">
                        <div className="lg:p-4 p-2">
                          <div className="text-ellipsis capitalize font-medium bg-slate-300 lg:text-lg text-base px-7 py-2 rounded-full line-clamp-1"></div>
                          <div className="text-slate-500 capitalize w-[80px] py-[5px] bg-slate-300 md:mt-[6px] rounded-full mt-[4px]"></div>
                          <div className="flex items-center justify-start md:gap-4 gap-3 lg:mt-[9px] md:mt-[10px] mt-[7px]">
                            <div className="text-red-300 w-[45px]  py-[5px] bg-slate-300 rounded-2xl"></div>
                            <div className="text-slate-500 w-[45px] py-[5px] bg-slate-300 rounded-2xl"></div>
                          </div>
                          <div className="md:min-w-full md:max-w-full mt-[9px] md:mt-[14px] mx-auto">
                              <div className="bg-slate-300 mx-auto w-[90%] hover:bg-slate-400 py-[2px] transition-all duration-200 px-4 md:px-6 text-center text-white font-medium rounded-full">Add to Cart</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )
                })
              }
    </div>
        )
      }
      {
        !loading && (
          <p className='text-xl px-10 pt-8 pb-5 font-semibold'>Search Results : <span className="text-red-600">{totalProducts}</span></p>

        )
      }
      {
        data && !loading && data?.length===0 && (
          <div>No Products Found...</div>
        )
      }
      {
        data && data?.length!==0 && !loading &&(
          <DataList data={data} />
        )
      }
      <div className='mx-auto w-[40%] p-3 flex items-center gap-3 md:gap-6 justify-center my-6'>
        {!loading && totalPages!==1 && Array.from({ length: totalPages }, (_, index) => (
          <button
            on
            key={index + 1}
            onClick={() => handlePageChange(index + 1)}
            disabled={loading}
            className="font-semibold md:py-2 py-1 px-[9px] md:px-[14px] mx-auto rounded shadow-lg"
            style={{ background: page === index + 1 ? '#E53e3e' : '#CBD5E1' , color: page === index + 1 ? 'white' : 'black' }}
          >
            {index + 1}
          </button>
        ))}
      </div>
      {/* <div className='mb-10'>
        <div className={(hasMore && !loading) ? 'block' : 'hidden'}>
          <div ref={ref} style={{visibility: (hasMore && !loading && ref) ? 'visible' : 'hidden'}}>fetchinggggg</div>
          {hasMore && loading && <p>Loading more products...</p>}
        </div>
      </div> */}
    </div>
  )
}

export default Search