import summaryApi from '../common'
import { useState, useEffect } from "react";
import { toast } from 'react-toastify'
export const FetchCategoryWiseProducts = (category) => {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
        const response = await fetch(summaryApi.getOneCategoryProduct.url,{
          method:summaryApi.getOneCategoryProduct.method,
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({ category })
        })
        const dataResponse = await response.json()
        if(dataResponse?.success){
          setData(dataResponse?.data);
        }
        else{
          toast.error(dataResponse?.message)
        }
        setIsLoading(false);
    };

    fetchData();
  }, [category]);

  return { data, isLoading };
};
