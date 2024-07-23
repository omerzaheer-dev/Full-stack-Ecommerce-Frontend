import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setUserDetails } from "../store/userSlice";
import { setCartDetails } from "../store/cartSlice";
import summaryApi from "../common";
import { toast } from "react-toastify";

const UseLogoutHook = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
  const logout = async () => {
    try {
        const fetchData = await fetch(summaryApi.logoutUser.url, {
            method: summaryApi.logoutUser.method,
            credentials: "include",
          });
          const data = await fetchData.json();
          if (data?.success) {
            toast.success(data.message);
            dispatch(setUserDetails(null));
            dispatch(setCartDetails(null));
            navigate("/login");
          }
    } catch (error) {
      console.error('Error during logout:', error);
  }};

  return { logout };
};

export default UseLogoutHook;
