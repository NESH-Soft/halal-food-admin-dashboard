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

export default (state,action)=>{
  switch(action.type){

      case SUCCESS_LOGIN:
      case RESET_PASSWORD:
           localStorage.setItem('token',action.payload.token)
           return{
              ...state,
              isAuthenticated:true,
            }
      case LOAD_USER:
            return{
              ...state,
              isAuthenticated: true,
              user: action.payload.admin,
          }
    
       case LOGOUT:
       case CHANGE_PASSWORD:
       case DELETE_USER:
           localStorage.removeItem('token')
            return{
              isAuthenticated: false,
              user:{},
            }
      case  UPDATE_USER:
            return{
            ...state,
            user: action.payload.user,
            success:action.payload.success,
            }
     
   case FORGOT_REQUEST:
              return{
              ...state,
              success: action.payload.success
              } 
      default:
          return state
    }
}