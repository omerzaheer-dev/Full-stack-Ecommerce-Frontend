import React , { useEffect, useState } from 'react'
import summaryApi from '../common'
import { toast } from 'react-toastify';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { FaEdit } from "react-icons/fa";
import moment from "moment"
import ChangeUserRole from '../components/ChangeUserRole';
import UseLogout from "../hooks/UseLogoutHook"
const AllUsers = () => {
  const navigate = useNavigate()
  const [users,setUsers] = useState([])
  const [openUpdateRole,setOpenUpdateRole]=useState(false)
  const [updateUser,setUpdateUser]=useState({
    name:"",
    email:"",
    Role:""
  })
  const user = useSelector((state) => state?.user?.user?.user);
  const { logout } = UseLogout()
  const fetchAllUsers = async () => {
    if(user?.Role==="GENERAL"){
      toast.warning("Only Admin can watch")
      navigate('/')
    }
    else{
      const fetchData = await fetch(summaryApi.allUsers.url,{
        method:summaryApi.allUsers.method,
        credentials:"include",
      })
      const dataResponse = await fetchData.json()
      if(dataResponse.success){
        setUsers(dataResponse?.data?.Users)
      }
      if(dataResponse?.statusCode===406){
          await logout()
        }
    }
    }

  useEffect(()=>{
      fetchAllUsers()
  },[])


return (
    <div className='bg-white pb-4'>
      <table className='w-full tableClass'>
        <thead>
          <tr className='bg-black text-white'>
            <th>Sr.</th>
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
            <th>Created Date</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {
            users && users.map((el,index)=>{
              return(
                <tr key={index}>
                  <td>{index+1}</td>
                  <td>{el?.name}</td>
                  <td>{el?.email}</td>
                  <td>{el?.Role}</td>
                  <td>{moment(el?.createdAt).format('ll')}</td>
                  <td>
                    <button onClick={
                      ()=>{
                        setUpdateUser(el)
                        setOpenUpdateRole(true)
                      }
                    } className='cursor-pointer hover:text-green-600'>
                      <FaEdit />
                    </button>
                  </td>
                </tr>
              )
            })
          }
        </tbody>
      </table>
      {
        openUpdateRole && 
        <ChangeUserRole onClose={()=>setOpenUpdateRole(false)} 
        name={updateUser.name}
        email={updateUser.email}
        Role={updateUser.Role}
        reload={fetchAllUsers}
        />
      }
    </div>
  )
}

export default AllUsers
