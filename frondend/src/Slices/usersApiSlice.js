import { apiSlice } from "./apiSlice";
//import { logout } from "./authSlice";

const USER_URL='/api/users' 
const ADMIN_URL='/api/admin'

export const userApiSlice=apiSlice.injectEndpoints({
    endpoints:(bulider)=>({
        login:bulider.mutation({
            query:(data)=>({
                url:`${USER_URL}/auth`,
                method:'post',
                body:data
            }),
        }),
        register:bulider.mutation({
            query:(data)=>({
                url:`${USER_URL}`,
                method:'post',
                body:data
            }),
        }),
        logout:bulider.mutation({
            query:()=>({
                url:`${USER_URL}/logout`,
                method:'post'

            })
        }),
        updateUser:bulider.mutation({
            query:(data)=>({
                url:`${USER_URL}/profile`,
                method:'PUT',
                body:data,
                
            }),
        }),
        checkUser:bulider.mutation({
            query:(data)=>({
                url:`${USER_URL}/check`,
                method:'POST',
                body:data
            }),
        }),
        adminLogin:bulider.mutation({
            query:(data)=>({
                url:`${ADMIN_URL}/login`,
                method:'POST',
                body:data
            }),
        }),
        adminDelete:bulider.mutation({
            query:(data)=>({
                url:`${ADMIN_URL}/delete`,
                method:'PUT',
                body:data
            }),
        }),
        adminlogout:bulider.mutation({
            query:()=>({
                url:`${ADMIN_URL}/logout`,
                method:'post',
            }),
        }),
        adminAddUser:bulider.mutation({
            query:(data)=>({
                url:`${ADMIN_URL}/addUser`,
                method:'put',
                body:data
            }),
        }),
        adminEditUser:bulider.mutation({
            query:(data)=>({
                url:`${ADMIN_URL}/editUser`,
                method: 'put',
                body:data
            }),
        }),

    }),
});


export const {useLoginMutation,
              useLogoutMutation,
              useRegisterMutation,
              useUpdateUserMutation,
              useCheckUserMutation,
              useAdminLoginMutation,
              useAdminDeleteMutation,
              useAdminlogoutMutation,
              useAdminAddUserMutation,
              useAdminEditUserMutation
                    }=userApiSlice;