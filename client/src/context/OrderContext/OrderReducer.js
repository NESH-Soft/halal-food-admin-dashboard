import {
  GET_ORDERS,
  GET_SINGLE_ORDER,
  ADD_TO_CART,
  INCREMENT,
  DECREMENT,
  GET_SALE_INFO,
  GET_RECENT_SALE,
  GET_TODAY_SALE,
  GET_SALE_INFO_BY_DAY
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
    case  GET_SALE_INFO:
                    return{
                    ...state,
                    saleInfo:action.payload.orderInfo
                                      
                    }  
    case GET_RECENT_SALE:
               return{
                ...state,
                recentSale: action.payload.recentOrder,
                       
               }
    case GET_TODAY_SALE:
              return{
                ...state,
                todayOrder: action.payload.todayOrder,  
      }
    case GET_SALE_INFO_BY_DAY:
        return{
          ...state,
          orderInfoByDay: action.payload.orderByDay,  
        }
        default:
            return state
    }
}
