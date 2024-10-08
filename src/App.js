import './App.css';
import { Outlet } from "react-router-dom"
import Header from "./components/Header";
import Footer from "./components/Footer";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import summaryApi from "./common/index"
import Context from "./context"
import { useEffect } from "react";
import { useDispatch  } from "react-redux"
import { setUserDetails } from "./store/userSlice";
import { setCartDetails } from "./store/cartSlice";
import UseLogoutHook from "./hooks/UseLogoutHook";
function App() {
  const dispatch = useDispatch()
  const {logout} = UseLogoutHook()
  const fetchUserDetails = async () => {
    const dataResponse = await fetch(summaryApi.currentUser.url,{
      method:summaryApi.currentUser.method,
      credentials: 'include',
    })
    const dataApi = await dataResponse.json()
    if(dataApi?.success){
      dispatch(setUserDetails(dataApi.data))
    }
    else{
      await logout()
      dispatch(setUserDetails(null))
      dispatch(setCartDetails(null));
    }
  }


  useEffect(()=>{
    fetchUserDetails()
  },[])



  return (
    <>
    <Context.Provider value={{fetchUserDetails}}>
      <ToastContainer autoClose={2000} />
      <Header></Header>
      <main className="min-h-[calc(100vh-20vh)] mt-16">
        <Outlet/>
      </main>
      <Footer></Footer>
    </Context.Provider>
    </>
  );
}

export default App;
