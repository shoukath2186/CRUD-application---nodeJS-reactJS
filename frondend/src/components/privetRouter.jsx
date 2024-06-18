import {Navigate,Outlet} from 'react-router-dom'
import { useSelector,useDispatch } from 'react-redux'
import { useCheckUserMutation,useLogoutMutation } from "../Slices/usersApiSlice";
import { useNavigate } from "react-router-dom";
import { useEffect } from 'react';
import { logout } from "../Slices/authSlice";

function PrivetRouter() {

    const [check]=useCheckUserMutation();
    const [logoutApiCall]=useLogoutMutation()

    const navigate=useNavigate();
    const dispatch=useDispatch();

    const { userInfo } = useSelector((state) => state.auth)
    

    useEffect( ()=>{

      async function fetchData() {
        try {
          const response = await check({id:userInfo._id});
          if(response.data ==='user is exist'){    
          

          }else{

            await logoutApiCall().unwrap();
              dispatch(logout());
              navigate('/')
          }


        } catch (error) {
          console.log(1000,error);
        }
        
      }
      fetchData();

    },[])


    
    

    

  return userInfo ? <Outlet/>:<Navigate to='login' replace />;
}

export default PrivetRouter