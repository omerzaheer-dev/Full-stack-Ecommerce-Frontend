import React , {useState , useEffect} from 'react'
import { useSelector } from 'react-redux';
import UseLogoutHook from '../hooks/UseLogoutHook';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import summaryApi from '../common';
import moment from 'moment';
import displayINRCurrency from '../helpers/displayCurrency';

const AllOrders = () => {
  const navigate = useNavigate()
  const user = useSelector((state) => state?.user?.user?.user);
  const { logout } = UseLogoutHook()
  const [orders,setOrders] = useState([])
  const fetchAllOrders = async () => {
    if(user?.Role==="GENERAL"){
      toast.warning("Only Admin can watch")
      navigate('/')
    }
    else{
      const fetchData = await fetch(summaryApi.allOrders.url,{
        method:summaryApi.allOrders.method,
        credentials:"include",
      })
      const dataResponse = await fetchData.json()
      if(dataResponse.success){
        setOrders(dataResponse?.data?.orderList)
        console.log(dataResponse?.data?.orderList,"drs")
      }
      if(dataResponse?.statusCode===406){
          await logout()
        }
    }
    }

  useEffect(()=>{
      fetchAllOrders()
  },[])
  return (
    <div className='min-h-[80vh]'>
      {
        !orders[0] && (
          <div className='pt-5'>
            <div className='w-[80%] py-2 h-min text-center mx-auto font-semibold text-red-600 bg-white'>No Order Found</div>
          </div>
        )
      }
      {
        orders[0] && (
          <div className='md:p-4 p-2'>
            {
              orders.map((item,index)=>{
                return(
                  <div className='mb-4' key={index}>
                    <p>{moment(item.createdAt).format('ll')}</p>
                    <div className='border-slate-300 relative border-[3px] py-1 flex flex-col md:flex-row justify-between'>
                      <div>
                        {
                          item?.productDetails.map((a,i)=>{
                            return (
                              <div className="flex items-start md:gap-4 gap-3 px-2 py-1">
                                <div className='lg:max-w-[100px] max-w-[75px] border-white lg:min-w-[58px] min-w-[44px] lg:min-h-[92px] min-h-[78] flex items-center justify-between lg:max-h-[170px] max-h-[138px] bg-slate-200'>
                                  <img className='max-w-full max-h-full w-auto h-auto mix-blend-multiply' src={a.image[0]} alt="" />
                                </div>
                                <div>
                                  <p className='lg:mb-[6px] md:mb-[3px] mb-[2px] lg:font-semibold font-bold lg:text-[20px] md:text-[23px] text-[15px] text-ellipsis line-clamp-1'>{a.productName}</p>
                                  <div className='flex items-center font-semibold text-[13px] lg:text-[19px] md:text-[20px] justify-center lg:gap-7 md:gap-4 gap-2'>
                                    <p className='text-red-600 text-[13px] lg:text-[18px] md:text-[21px]'>{displayINRCurrency(a.price)}</p>
                                    <p className='text-[13px] md:text-[21px] lg:text-[18px]'>Quantity: {a.quantity}</p>
                                  </div>
                                </div>
                              </div>
                            )
                          })
                        }
                      </div>
                      <div className='lg:pr-12 pl-2 md:pl-0 md:pr-5 pr-3 lg:pt-3 md:pt-2 pt-1'>
                        <div>
                          <h2 className='lg:font-[500] font-bold md:text-[23px] lg:text-[21px] text-[15px]'>Payment Details:</h2>
                          <p className='md:text-[21px] text-[13px] lg:text-[18px]'>Payment Method: {item?.paymentDetails?.payment_method_type[0]}</p>
                          <p className='md:text-[21px] text-[13px] lg:text-[18px]'>Payment Status: {item?.paymentDetails?.payment_status}</p>
                        </div>
                        <div className='md:mt-5 mt-3'>
                          <h2 className='lg:font-[500] font-bold md:text-[23px] lg:text-[21px] text-[15px]'>Shipping Details:</h2>
                          <p className='md:text-[21px] text-[13px] lg:text-[18px]'>Shipping Charges: {item?.shipping_options[0]?.shipping_amount}</p>
                        </div>
                      </div>
                      <div className='absolute right-0 md:bottom-4 bottom-2 lg:pr-6 md:pr-4 pr-1'>
                        <p className='lg:font-[500] font-bold  md:text-[23px] lg:text-[20px] text-[14px] pr-2'>Total Amount : {displayINRCurrency(item?.totalAmount)}</p>
                      </div>
                    </div>
                  </div>
                )
              })
            }
          </div>
        )
      }
    </div>
  )
}

export default AllOrders
