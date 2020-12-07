import {
  GET_ORDERS
} from '../type'

export default (state,action)=>{
    switch(action.type){
           case GET_ORDERS:
                return{
                ...state,
                orders: action.payload.order,
        
            }
         
     

        default:
            return state
    }
}
