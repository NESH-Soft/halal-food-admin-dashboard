import {
    GET_CUSTOMERS,
    GET_CUSTOMER,
    GET_TOTAL_CUSTOMER,
   
} from '../type'

export default (state,action)=>{
    switch(action.type){
           case GET_CUSTOMERS:
                return{
                ...state,
                customers: action.payload.users,
              
            }
            case GET_CUSTOMER:
                return{
                ...state,
                customer: action.payload.user,

            }
            case GET_TOTAL_CUSTOMER:
                return{
                  ...state,
                  totalCustomer: action.payload.userInfo,
                }
 
        default:
            return state
    }
}
