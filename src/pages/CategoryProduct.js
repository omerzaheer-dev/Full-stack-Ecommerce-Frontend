import React, {useState , useEffect} from 'react'
import { useLocation, useNavigate, useParams } from "react-router-dom"
import ProductCategory from '../helpers/ProductCategory'
import summaryApi from '../common'
import { DataList } from '../components/DataListSearchAndCategory'
import { useSelector , useDispatch } from 'react-redux';
const CategoryProduct = () => {
    // const params = useParams()
    const dispatch = useDispatch();
    const cartSelector = useSelector((state) => state?.cart?.cart);
    const user = useSelector((state) => state?.user?.user?.user);
    const navigate = useNavigate()
    // const { categoryName } = params
    const {search} = useLocation()
    const urlSearch = new URLSearchParams(search)
    const urlSearchInArray = urlSearch.getAll("category")
    const [data,setData]= useState([])
    const [loading,setLoading]= useState(false)
    const [selectCategory,setSelectCategory]= useState(urlSearchInArray)
    const [sortBy,setSortBy]=useState("")
    //paginationData
    const [totalProducts,setTotalProducts] = useState()
    const [page, setPage] = useState(1);
    const [pageSize] = useState(10);
    const [totalPages, setTotalPages] = useState(0);
    const PagetoOne = (page) => {
      setPage(page);
    };
    const handlePageChange = (page) => {
      if (page > 0 && page <= totalPages) {
        setPage(page);
        window.scrollTo({ top:0 , behavior:"instant"})
      }
    }
    //end pagination data
    const fetchData = async () => {
      setLoading(true)
      const responseApi = await fetch(summaryApi.filterProducts.url,{
        method:summaryApi.filterProducts.method,
        headers:{
          "content-type":"application/json"
        },
        body:JSON.stringify({
          sort:sortBy,
          categoryList : selectCategory,
          pageSize,
          page,
        })
      })
      const responseData = await responseApi?.json();
      if(responseData?.success){
        setData(responseData?.data?.products)
        setTotalPages(responseData?.data?.totalPages);
        setPage(responseData?.data?.currentPage);
        setTotalProducts(responseData?.data?.totalProducts)
      }
      setLoading(false)
    }
    const handleSelectCategory = (e) =>{
      const {value,checked} = e.target
      if(checked === true && !selectCategory.includes(value)){
        setSelectCategory((prev)=>
          [...prev,value]
        )
      }
      else if(!checked && selectCategory.length===1){
        console.log("cannot uncheck")
      }
      else{
        setSelectCategory((prev)=>{
           const rrr = prev.filter((item) => item!==value)
           return (
            rrr
           )
        })
      }
    }
    const changeUrl = () => {
      const url = selectCategory.map((el,index)=>{
        if((selectCategory.length-1)===index){
          return `category=${el}`
        }else{
          return `category=${el}&&`
        }
      }).join('');
      navigate('/product-category?'+url)
    }
    useEffect(()=>{
      fetchData()
    },[page])

    useEffect(() => {
      changeUrl()
      if(page!==1){
        PagetoOne(1)
      }else{
        fetchData()
      }
    },[selectCategory])
    useEffect(() => {
      if(page!==1){
        PagetoOne(1)
      }else{
        fetchData()
      }
    },[sortBy])

  return (
    <div className="lg:container w-[100%] mx-auto lg:p-4 p-2">
      <div className='grid lg:grid-cols-[200px,1fr] md:grid-cols-[165px,1fr]'>
        <div className=' hidden md:block lg:p-2 p-0 min-h-[calc(100vh-160px)] bg-white'>
          <div className='md:mt-[70px] lg:mt-5'>
            <h1 className="text-base uppercase font-semibold text-slate-500 pb-1 border-b-[1px] border-slate-300">Sort By</h1>
            <form className='text-sm text-slate-950 flex flex-col gap-2 py-3'>
              <div className="flex items-center gap-2">
                <input type="radio" name='sortBy' value={"asc"} checked={sortBy==="asc"} onChange={(e)=>setSortBy(e.target.value)}/>
                <label>Price - Low To High</label>
              </div>
              <div className="flex items-center gap-2">
                <input type="radio" name='sortBy' value={"dsc"} checked={sortBy==="dsc"}  onChange={(e)=>setSortBy(e.target.value)}/>
                <label>Price - High To Low</label>
              </div>
            </form>
          </div>
          <div>
            <h1 className="text-base uppercase font-semibold text-gray-500 pb-1 border-b-[1px] border-slate-300">Category</h1>
            <form className='text-sm text-slate-950 flex flex-col gap-2 py-3'>
              {
                ProductCategory.map((cat,index)=>{
                  return(
                    <div className="flex items-center gap-2" key={index}>
                      <input type="checkbox" name="category" value={cat.value}
                        onChange={handleSelectCategory} checked={urlSearchInArray.includes(cat.value)} id={cat.value}/>
                      <label htmlFor={cat.value}>{cat.label}</label>
                    </div>
                  )
                })
              }
            </form>
          </div>
        </div>
        <div className='pb-2 lg:px-4 md:px-2'>
        {
          !loading && (
            <p className='text-xl md:px-10 px-2 pt-4 md:pt-8 md:pb-5 font-semibold'>Search Results : <span className="text-red-600">{totalProducts}</span></p>

          )
        }
          <div>
          {
            data?.length!==0 && !loading && (
              // <CategoryWiseProduct category={selectCategory[0]} heading={selectCategory[0]}/>
              <DataList data={data} cartSelector={cartSelector} dispatch={dispatch} user={user}/>
            )
          }
          <div className='mx-auto w-[40%] p-3 flex items-center justify-start my-6'>
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
          </div>
        </div>
      </div>
    </div>
  )
}

export default CategoryProduct
