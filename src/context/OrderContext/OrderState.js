import React,{useReducer} from 'react';
import axios from 'axios';
import OrderContext from '../OrderContext/OrderContext';
import OrderReducer from '../OrderContext/OrderReducer';

import {
 GET_ORDERS,
 GET_SINGLE_ORDER,
 CHANGE_ORDER_STATUS,
 ADD_TO_CART,
 INCREMENT,
 DECREMENT,
} from '../type'

const OrderState=(props)=> {
const initialState={
  orderRequest: [],
  deliveredOrder:[],
  activeOrder: [],
  offlineSale: [],
  allOrder:[],
  singleOrder: [],
  cart:[],
  success: false,
}

const [state,dispatch]=useReducer(OrderReducer,initialState)

//  get all product
const getOrders = async () => {
try{
  const res = await axios.get('/api/order/orders')
    dispatch({ type: GET_ORDERS, payload: res.data })
  

}catch (err) {  
   console.log(err)
  }}

  const getSingleOrder = async (id) => {
    try{

        dispatch({ type: GET_SINGLE_ORDER, payload:id})
      
    
    }catch (err) {  
       console.log(err)
      }}

  const changeOrderStatus = async (data) => {
    const config={ header:{'Content-Type':'application/json'}}
        try{
          const res = await axios.put(`/api/order/change-order-status/${data._id}`,data,config)
          console.log(res.data)
          // dispatch({ type: GET_SINGLE_ORDER, payload: res.data})
          getOrders()
        }catch (err) {  
           console.log(err)
        }}
  
  const createOfflineSale = async (data) => {
         const config={ header:{'Content-Type':'application/json'}}
              try{
                const res = await axios.post('/api/order/offline-sale',data,config)
                console.log(res.data)
                // dispatch({ type: GET_SINGLE_ORDER, payload: res.data})
                getOrders()
              }catch (err) {  
                 console.log(err)
              }}

  const addToCart = (value) =>{
                dispatch({ type:ADD_TO_CART, payload:value }) ;
              }
  const increment=(id)=>{
          let tempCart = state.cart;
          const selectedProduct = tempCart.find(item =>  item._id === id);
          const index = tempCart.indexOf(selectedProduct);
          const product = tempCart[index];
          product.quantity = product.quantity + 1;
          dispatch({
            type: INCREMENT,
            payload: tempCart
          })
         }
      
  const decrement=(id)=>{
          let tempCart = state.cart
          const selectedProduct = tempCart.find(item =>  item._id === id);
          const index = tempCart.indexOf(selectedProduct);
          const product = tempCart[index];
          product.quantity = product.quantity - 1;
          dispatch({
            type: DECREMENT,
            payload: tempCart
          })
          
         }



    return (
        <OrderContext.Provider value={{
          orderRequest: state.orderRequest,
          deliveredOrder: state.deliveredOrder,
          activeOrder: state.activeOrder,
          offlineSale: state.offlineSale,
          singleOrder: state.singleOrder,
          cart: state.cart,
          getSingleOrder,
          changeOrderStatus,
          getOrders,
          addToCart,
          increment,
          decrement,
          createOfflineSale

          
        
    }}>
      {props.children}
    </OrderContext.Provider >
    )
}
export default OrderState;