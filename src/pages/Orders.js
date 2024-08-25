import { useEffect , useState } from 'react'
import summaryApi from '../common'
import { toast } from 'react-toastify';
import moment from "moment"

const Orders = () => {
  const [order,setOrder] = useState([])
  const fetchOrders = async () => {
    const dataResponse = await fetch(summaryApi.orderList.url,{
      method:summaryApi.orderList.method,
      credentials:"include"
    })
    const dataApi = await dataResponse.json()
    if(dataApi.success){
      console.log("dataApi", dataApi)
      setOrder(dataApi.data)
    }else{
      toast.error("Order feching failed")
    }
  }
  useEffect(()=>{
    fetchOrders()
  },[])
  return (
    <div className='min-h-[70vh]'>
      {
        !order[0] && (
          <div className='pt-5'>
            <div className='w-[80%] py-2 h-min text-center mx-auto font-semibold text-red-600 bg-white'>No Order Found</div>
          </div>
        )
      }
      {
        order[0] && (
          <div className='p-4'>
            {
              order.map((item,index)=>{
                return(
                  <div key={index}>
                    <p>{moment(item.createdAt).format('ll')}</p>
                    <div className='border-slate-300 border-[3px] py-1'>
                      {
                        item?.productDetails.map((a,i)=>{
                          return (
                            <div className="flex items-start gap-4 px-2 py-1">
                              <div className='max-w-[100px] border-white min-w-[58px] min-h-[92px] flex items-center justify-between max-h-[170px] bg-slate-200'>
                                <img className='max-w-full max-h-full w-auto h-auto mix-blend-multiply' src={a.image[0]} alt="" />
                              </div>
                              <div>
                                <p className='mb-[6px] font-semibold'>{a.productName}</p>
                                <div className='flex items-center font-semibold justify-center gap-6'>
                                  <p className='text-red-600'>PK {a.price}</p>
                                  <p>Quantity: {a.quantity}</p>
                                </div>
                              </div>
                            </div>
                          )
                        })
                      }
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

export default Orders