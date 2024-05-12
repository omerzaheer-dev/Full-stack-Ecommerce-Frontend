import './App.css';
import { Outlet } from "react-router-dom"
import Header from "./components/Header";
import Footer from "./components/Footer";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import summaryApi from "./common/index"
import Context from "./context"
import { useEffect } from "react";
import { useDispatch } from "react-redux"
import { setUserDetails } from "./store/userSlice";
function App() {
  const dispatch = useDispatch()
  const fetchUserDetails = async () => {
    const dataResponse = await fetch(summaryApi.currentUser.url,{
      method:summaryApi.currentUser.method,
      credentials: 'include',
    })
    const dataApi = await dataResponse.json()
    if(dataApi.success){
      dispatch(setUserDetails(dataApi.data))

    }
    else{
      console.log("error while fetching user details")
    }
  }

  // useEffect(()=>{
  //   fetchUserDetails()
  // },[])



  return (
    <>
    <Context.Provider value={{fetchUserDetails}}>
      <ToastContainer />
      <Header></Header>
      <main className="min-h-[calc(100vh-20vh)]">
        <Outlet/>
      </main>
      <Footer></Footer>
    </Context.Provider>
    </>
  );
}

export default App;
