import {
  GET_ORDERS,
  GET_SINGLE_ORDER
} from '../type'

export default (state,action)=>{
    switch(action.type){
           case GET_ORDERS:
                return{
                ...state,
                orderRequest: action.payload.orders.filter(order=> order.status === "pending"),
                deliveredOrder: action.payload.orders.filter(order=> order.status === "delivered"),
                activeOrder: action.payload.orders.filter(order=> order.status === "active"),
                allOrder: action.payload.orders,
             
            }
    case GET_SINGLE_ORDER:
                return{
                ...state,
                singleOrder: state.allOrder.filter(order=> order._id === action.payload)
            }
         
        default:
            return state
    }
}
