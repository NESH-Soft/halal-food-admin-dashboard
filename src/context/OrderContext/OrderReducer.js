import {
  GET_ORDERS,
  GET_SINGLE_ORDER,
  ADD_TO_CART,
  INCREMENT,
  DECREMENT
} from '../type'

export default (state,action)=>{
    switch(action.type){
           case GET_ORDERS:
                return{
                ...state,
                orderRequest: action.payload.orders.filter(order=> order.status === "pending"),
                deliveredOrder: action.payload.orders.filter(order=> order.status === "delivered"),
                activeOrder: action.payload.orders.filter(order=> order.status === "active"),
                offlineSale:action.payload.orders.filter(order=> order.status === "offlineSale"),
                allOrder: action.payload.orders,
             
            }
    case GET_SINGLE_ORDER:
                return{
                ...state,
                singleOrder: state.allOrder.filter(order=> order._id === action.payload)
            }
    case  ADD_TO_CART:
                return{
                ...state,
                cart:action.payload
                         
                }

    case  INCREMENT:
                return{
                ...state,
                cart:action.payload               
                  }
              case  DECREMENT:
                  return{
                  ...state,
                  cart:action.payload
                                    
                  }     
         
        default:
            return state
    }
}
