import React from 'react'
import { useLocation , Navigate , Outlet  } from 'react-router-dom';
import { useSelector } from 'react-redux'

const ProtectedRoutes = ({children}) => {
  const location = useLocation();
  const pathname = location.pathname;
  const user = useSelector((state) => state?.user?.user?.user);
  const adminRoutes = ["admin-panel/","admin-panel/all-users","admin-panel/all-products"]

  return (
    <div>
      {/* <Navigate  state={{ from: location }} replace={true} /> */}
      {
        !user ? <Navigate to="/login"  state={{ from: location }} replace={true} />
        :
        user?.Role === "Admin" && 
        <Outlet />
      }
    </div>
  );
}

export default ProtectedRoutes
