import summaryApi from "../common";
import { toast } from 'react-toastify';
import { setCartDetails } from "../store/cartSlice";

const AddToCart = async (e, id,dispatch,user) => {
    e?.stopPropagation();
    e?.preventDefault();
    if(user?._id){
        try {
            const response = await fetch(summaryApi.addToCartProduct.url, {
                method: summaryApi.addToCartProduct.method,
                credentials: "include",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ productId: id })
            });
            const dataResponse = await response.json();
            // console.log("ff",dataResponse)
            if (dataResponse?.success) {
                toast.success(dataResponse?.message,{autoClose: 1000,});
                dispatch(setCartDetails(dataResponse?.data?.products));
            } else {
                toast.error(dataResponse?.message,{autoClose: 1000,});
            }
            console.log("dataResponse",dataResponse?.data?.products)
        } catch (error) {
            console.error("There has been a problem with your fetch operation:", error);
            toast.error("An error occurred while adding to cart.");
        }
    }else{
        toast.error("Please login to add to cart");
    }
};

export { AddToCart };
