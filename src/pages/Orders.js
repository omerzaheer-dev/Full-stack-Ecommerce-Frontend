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
          <div>
            {
              order.map((item,index)=>{
                return(
                  <div key={index}>
                    <p>{moment(item.createdAt).format('ll')}</p>
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