import { useCallback } from 'react';
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setUserDetails } from "../store/userSlice";
import summaryApi from "../common";
import { toast } from "react-toastify";

const UseLogoutHook = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
  const logout = useCallback(async () => {
    const controller = new AbortController();
    const signal = controller.signal;
    try {
        const fetchData = await fetch(summaryApi.logoutUser.url, {
            method: summaryApi.logoutUser.method,
            credentials: "include",
            signal
          });
          const data = await fetchData.json();
          if (data?.success) {
            toast.success(data.message);
            dispatch(setUserDetails(null));
            navigate("/login");
          }
    } catch (error) {
      console.error('Error during logout:', error);
    } finally{
        controller.abort();
    }
  }, []);

  return { logout };
};

export default UseLogoutHook;
