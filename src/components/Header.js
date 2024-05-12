import React, { useState } from "react";
import Logo from "./Logo";
import RoleObj from "../common/Role";
import { BiSearchAlt2 } from "react-icons/bi";
import { FaUserAlt } from "react-icons/fa";
import { FaShoppingCart } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { setUserDetails } from "../store/userSlice";
import summaryApi from "../common";
import { toast } from "react-toastify";
const Header = () => {
  const user = useSelector((state) => state?.user?.user?.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [displayMenu, setDisplayMenu] = useState(false);
  const handleLogout = async () => {
    const fetchData = await fetch(summaryApi.logoutUser.url, {
      method: summaryApi.logoutUser.method,
      credentials: "include",
    });
    const data = await fetchData.json();
    if (data.success) {
      toast.success(data.message);
      dispatch(setUserDetails(null));
      navigate("/login");
    } else {
      toast.success("Failed to logout user");
    }
  };
  return (
    <header className="shadow-md h-16 bg-white">
      <div className="flex items-center justify-between px-4 py-2">
        <div>
          <Link to="/">
            <Logo w={90} h={50} />
          </Link>
        </div>
        <div className="hidden lg:flex items-center border rounded-full focus-within:shadow">
          <input
            type="text"
            placeholder="Search products here"
            className="outline-none rounded-l-full w-[20vw] pl-3 pr-1 h-8"
          />
          <div className="flex items-center justify-center bg-red-600 h-8 text-white px-4 py-1 rounded-r-full text-xl font-bold">
            <BiSearchAlt2 />
          </div>
        </div>
        <div className="flex items-center md:gap-6 gap-4">
          {user?._id && (
            <div>
                <div
                className="relative"
                onClick={() => setDisplayMenu((prev) => !prev)}
                >
                <div>
                  {user?.profilePicture ? (
                    <img
                      src={user.profilePicture}
                      alt=""
                      className="rounded-full lg:w-[3-px] lg:h-[30px] md:w-[34px] md:h-[34px] h-[28px] w-[28px] bg-center bg-cover"
                    />
                  ) : (
                    <FaUserAlt className="md:text-2xl text-xl" />
                  )}
                </div>
                {displayMenu && (
                  <div className="absolute bg-[white] shadow-lg px-2 py-1 rounded-sm top-11 -left-3">
                    {user?.Role === RoleObj.ADMIN && (
                      <nav className="hidden md:block p-2 whitespace-nowrap rounded hover:bg-slate-100 hover:border-b-[0px] border-b-[1px]">
                        <Link to="/admin-panel/all-products">Admin Panel</Link>
                      </nav>
                    )}
                  </div>
                )}
              </div>
            </div>
          )}
          <div className="flex items-center justify-center relative">
            <FaShoppingCart className="md:text-2xl text-xl" />
            <span className="bg-red-600 py-[2px] lg:py-0 rounded-full md:px-[0.4vw] px-[0.9vw] md:font-semibold text-white absolute bottom-3 md:bottom-4 left-4 text-xs md:text-sm">
              0
            </span>
          </div>
          {user?._id ? (
            <button
              onClick={handleLogout}
              className="bg-red-600 lg:px-4 px-3 lg:py-1 py-[2.8px] text-base rounded-full font-semibold text-white"
            >
              Logout
            </button>
          ) : (
            <Link
              to="/login"
              className="bg-red-600 lg:px-4 px-3 lg:py-1 py-[2.8px] text-base rounded-full font-semibold text-white"
            >
              Login
            </Link>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
