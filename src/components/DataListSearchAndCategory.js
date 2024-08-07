import React from "react";
import { Link } from "react-router-dom";
import ImageResizerComponent from "./ImageResizerComponent";
import { AddToCart } from "../helpers/AddToCart"
const DataList = React.memo(({ data , cartSelector , dispatch,user}) => (
    <div className='my-4 grid gap-y-5 lg:gap-x-2 gap-x-4 mx-auto grid-cols-[repeat(2,minmax(0,1fr))] md:grid-cols-[repeat(3,minmax(0,1fr))] place-items-center justify-items-center lg:grid-cols-[repeat(4,minmax(0,1fr))] rounded-md'>
              {
                data.map((product,index)=>{
                  return (
                    <Link to={"/product/"+product?._id} key={index} className='shadow-lg lg:h-[360px] md:h-[300px] md:w-[175px] lg:w-[220px] rounded-md h-[290px] w-[173px] bg-red-600'>
                      <div className="lg:w-[220px] lg:h-[215px] md:w-[175px] md:h-[175px]  hidden bg-slate-200 overflow-hidden md:flex items-center justify-center">
                        {/* <ImageResizerComponent imgUrl={product.productImage[0]} Width={152} Height={191} ph={197} pw={158}/> */}
                        <img src={product.productImage[0]} alt="" className="lg:max-w-[220px] md:max-w-[175px] md:max-h-[175px] md:min-h-[100px] mix-blend-multiply bg-contain lg:max-h-[215px] lg:min-w-[120px] w-auto h-auto lg:min-h-[180px]"/>
                      </div>
                      <div className="w-[173px] h-[160px] md:hidden bg-slate-200 overflow-hidden flex items-center justify-center">
                        <ImageResizerComponent imgUrl={product.productImage[0]} Width={"auto"} Height={"auto"} ph={160} pw={173}/>
                      </div>
                      <div className="lg:w-[220px] lg:h-[145px] md:w-[175px] md:h-[125px] w-[173px] h-[130px] bg-white">
                        <div className="lg:p-4 p-2">
                          <h2 className="text-ellipsis capitalize font-medium lg:text-lg text-base line-clamp-1">{product?.productName}</h2>
                          <p className="text-slate-500 capitalize lg:mt-[0px] md:mt-[-6px] mt-[-8px]">{product?.category}</p>
                          <div className="flex items-center justify-start md:gap-4 gap-3 lg:mt-[0px] md:mt-[-2px] mt-[-4px]">
                            <div className="text-red-600 font-semibold ">PKR{product?.price}</div>
                            <div className="text-slate-500 line-through">PKR{product?.sellingPrice}</div>
                          </div>
                          <div className="md:min-w-full md:max-w-full mt-[5px] md:mt-2 mx-auto">
                          {
                          cartSelector && cartSelector.some(item => item.productId._id === product?._id) ?
                              <div className="bg-white hover:bg-red-600 hover:text-white border-red-600 border-[2px] mx-auto w-[90%] py-[1px] transition-all duration-200 px-2 md:px-3 text-center text-red-600 font-medium rounded-full"onClick={(e)=> AddToCart(e,product?._id,dispatch,user)}>Added Cart</div>
                              :
                              <div className="bg-red-600 mx-auto w-[90%] hover:bg-red-700 py-[2px] transition-all duration-200 px-4 md:px-6 text-center text-white font-medium rounded-full"onClick={(e)=> AddToCart(e,product?._id,dispatch,user)}>Add to Cart</div>
                          }
                          </div>
                        </div>
                      </div>
                    </Link>
                  )
                })
              }
    </div>
  ));
  export {
    DataList
  }