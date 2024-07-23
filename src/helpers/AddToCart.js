import summaryApi from "../common";
import { toast } from 'react-toastify';
import { setCartDetails } from "../store/cartSlice";

const AddToCart = async (e, id,dispatch) => {
    e?.stopPropagation();
    e?.preventDefault();

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
        console.log("abc")
        if (dataResponse?.success) {
            toast.success(dataResponse?.message);
            dispatch(setCartDetails(dataResponse?.data?.products));
        } else {
            toast.error(dataResponse?.message);
        }
        console.log("dataResponse",dataResponse?.data?.products)
    } catch (error) {
        console.error("There has been a problem with your fetch operation:", error);
        toast.error("An error occurred while adding to cart.");
    }
};

export { AddToCart };
