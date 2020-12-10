import React,{useReducer} from 'react';
import axios from 'axios';
import AuthContext from '../AuthContext/AuthContext';
import AuthReducer from '../AuthContext/AuthReducer';
import setAuthToken from '../../utils/setAuthToken'
import {
  SUCCESS_LOGIN,
  LOAD_USER,
  DELETE_USER,
  UPDATE_USER, 
  CHANGE_PASSWORD,
  LOGOUT,
  FORGOT_REQUEST,
  RESET_PASSWORD,
} from '../type'

const AuthState=(props)=> {
const initialState={
  isAuthenticated: false,
  user: {},
  success: false,
}

const [state,dispatch]=useReducer(AuthReducer,initialState)

// load user
const loadUser = async () => {
  if(localStorage.token){
    setAuthToken(localStorage.token);
    try {
      const res = await axios.get('/api/admin');
      dispatch({ type: LOAD_USER, payload: res.data })
    } catch (err) {
     console.log(err)
  }
}
}



//Login   
const login = async data=>{
const config = { header:{ 'Content-Type':'application/json' } }
try{
  const res = await axios.post('/api/admin/login', data, config)
  dispatch({ type: SUCCESS_LOGIN, payload: res.data });
  loadUser();  
}catch (err){
console.log(err)
}

}


// delete user

const deleteUser = async (data)=>{
  const config={ header:{'Content-Type':'application/json' }} 

  try{
        const res=await axios.post('/api/admin/delete',data,config)
        dispatch({ type:DELETE_USER, payload:res.data });
    
  }catch (err){  
        console.log(err)
    }}


//update user
const updateUser = async(user)=>{
const config={ header:{'Content-Type':'application/json' }}

  try {  
    const res=await axios.put(`/api/admin/update/${user._id}`,user,config)
      dispatch({ type:UPDATE_USER, payload:res.data }) 
  } catch (err) {
console.log(err)
  }
}

// change password 
const changePassword = async data=>{
  const config={ header:{'Content-Type':'application/json' }}
try{
    const res=await axios.put('/api/admin/change-password',data,config)
    dispatch({type:CHANGE_PASSWORD,payload:res.data})  
   
}catch (err){ 
 console.log(err)
}
}


// forgot request 
const forgoRequest = async (data) =>{
  const config={ header:{'Content-Type':'application/json' }}
  try{
      const res=await axios.post('/api/admin/forgot',data,config)
      dispatch({ type: FORGOT_REQUEST, payload:res.data })   
        
  }catch (err){ 
   console.log(err)
  }

}


//reset password
const resetPassword = async (data)=>{
  const config={ header:{'Content-Type':'application/json' }}
  try{
      const res=await axios.post(`/api/admin/reset/${data.token}`,{newPassword:data.newPassword,confirmPassword: data.confirmPassword },config)
      dispatch({
      type: RESET_PASSWORD,
      payload:res.data,
      })  
      loadUser()     
  }catch (err){ 
   console.log(err)
  }

}

// log out  test complete
const logout=()=>{
    dispatch({type: LOGOUT})
  }


  return (
        <AuthContext.Provider value={{
          isAuthenticated: state.isAuthenticated,
            user: state.user,
            serverMessage: state.serverMessage,
            success: state.success,
            login,
            loadUser,
            updateUser,
            deleteUser,
            changePassword,
            forgoRequest,
            resetPassword,
            logout,
          
    }}>
      {props.children}
    </AuthContext.Provider >
    )
}
export default AuthState;