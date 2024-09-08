import React, { useState } from "react";
import Logo from "./Logo";
import RoleObj from "../common/Role";
import { BiSearchAlt2 } from "react-icons/bi";
import { FaUserAlt } from "react-icons/fa";
import { FaShoppingCart } from "react-icons/fa";
import { Link , useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import UseLogoutHook from "../hooks/UseLogoutHook";
const Header = () => {
  const user = useSelector((state) => state?.user?.user?.user);
  const navigate = useNavigate()
  const cartSelector = useSelector((state) => state?.cart?.cart);
  const [displayMenu, setDisplayMenu] = useState(false);
  const {logout} = UseLogoutHook()
  const handleSearch = (e) => {
    const { value } = e.target
    if(value.length>0){
      navigate(`/search?q=${value}`)
    }else{
      navigate('/')
    }
  }
  const handleLogout = async () => {
    await logout()
  }
  return (
    <header className="shadow-md h-16 bg-white w-full fixed top-0 z-30">
      <div className="flex items-center justify-between px-4 py-[14px]">
        <div>
          <Link to="/">
            <h1 className="font-bold text-2xl text-red-600">Umer Shop</h1>
          </Link>
        </div>
        <div className="hidden md:flex items-center border rounded-full focus-within:shadow">
          <input
            onChange={handleSearch}
            type="text"
            placeholder="Search products here"
            className="outline-none rounded-l-full lg:w-[20vw] w-[32vw] pl-3 pr-1 h-8"
          />
          <div className="flex items-center justify-center cursor-pointer hover:bg-red-700 bg-red-600 h-8 text-white px-4 py-1 rounded-r-full text-xl font-bold">
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
                    <nav className="p-2 whitespace-nowrap rounded hover:bg-slate-100 hover:border-b-[0px] border-b-[1px]">
                        <Link to="/orders">Orders</Link>
                      </nav>
                  </div>
                )}
              </div>
            </div>
          )}
          <Link to="/cart" className="flex items-center justify-center relative">
            <FaShoppingCart className="md:text-2xl text-xl" />
            { cartSelector && cartSelector.length>0 ?
              (
                <span className="bg-red-600 px-[5px] py-[1px] lg:py-0 rounded-full md:font-semibold text-white absolute bottom-3 md:bottom-4 left-4 text-xs md:text-sm">
                {
                  cartSelector && cartSelector.length
                }
              </span>
              )
              :
              (
                <span></span>
              )
            }
          </Link>
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
