import summaryApi from '../common'
import { useState, useEffect } from "react";
import { toast } from 'react-toastify'
export const FetchCartProducts = () => {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    const fetchData = async () => {
        const response = await fetch(summaryApi.productsInCart.url,{
          method:summaryApi.productsInCart.method,
          credentials: "include",
          headers: {
            "Content-Type": "application/json"
          },
        })
        const dataResponse = await response.json()
        if(dataResponse?.success){
          setData(dataResponse?.data);
        }
        setIsLoading(false);
    };
    fetchData();
  }, []);
  return { data, isLoading };
};
