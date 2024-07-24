import summaryApi from '../common'
import { setCartDetails } from "../store/cartSlice";
const FetchCartProducts = async (dispatch) => {
    const response = await fetch(summaryApi.productsInCart.url,{
      method:summaryApi.productsInCart.method,
      credentials: "include",
      headers: {
        "Content-Type": "application/json"
      },
    })
    const dataResponse = await response.json()
    if(dataResponse?.success){
      dispatch(setCartDetails(dataResponse?.data?.products));
    }
};
export default FetchCartProducts
