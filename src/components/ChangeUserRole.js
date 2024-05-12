import React,{useState} from 'react'
import RoleObj from '../common/Role'
import { IoMdClose } from "react-icons/io";
import summaryApi from '../common';
import { toast } from "react-toastify";
const ChangeUserRole = ({name,email,Role,onClose,reload}) => {
  const [userRole,setUserRole]=useState(Role)
  const handleRoleChange = (e) => {
    setUserRole(e.target.value)
    console.log(userRole)
  }
  const handleUpdation = async () => {
    const roleApi = await fetch(summaryApi.updateUserRole.url,{
      method:summaryApi.updateUserRole.method,
      credentials:"include",
      headers:{
        "Content-Type":"application/json"
      },
      body:JSON.stringify({
        email,
        Role:userRole
      })
    })
    const roleData = await roleApi.json()
    if(roleData.success){
      toast.success("Role updated successfully")
      reload()
      onClose()
    }else{
      toast.error(roleData.message)
    }
  }
  return (
    <>
        <div className='fixed top-0 bottom-0 left-0 right-0 min-w-[100vw] min-h-[100vh] z-10 bg-slate-200 opacity-60 flex items-center justify-between'></div>
      <div className='mx-auto fixed left-[50%] top-[34%] -translate-x-[50%] bg-white shadow-md py-3 px-5 z-20 max-w-sm min-w-sm w-full rounded-sm'>
        <div className="flex items-center justify-between ">
          <h1 className='font-medium text-lg'>Change User Role</h1>
          <button className="text-xl hover:text-red-600" onClick={onClose}>
              <IoMdClose />
          </button>
        </div>
        <div className='grid grid-cols-2 mt-3 items-center'>
            <div>Name :</div>
            <div className='ml-[-65%]'>{name}</div>
            <div>Email :</div>
            <div className='ml-[-65%]'>{email}</div>
            <div className="my-2">Role :</div>
                <div className='ml-[34px] my-2'>
                    <select className='border px-4 py-1' value={userRole} onChange={handleRoleChange}>
                        {
                            Object.entries(RoleObj).map(([key,value])=>{
                                return(
                                    <option value={value} key={key}>{value}</option>
                                )
                            })
                        }
                    </select>
            </div>
        </div>
        <button onClick={handleUpdation} className='py-1 px-5 mt-10 mb-2 block w-fit mx-auto bg-red-600 font-semibold text-white text-lg hover:bg-red-700 rounded-xl hover:scale-110'>Change Role</button>
      </div></>
  )
}

export default ChangeUserRole
