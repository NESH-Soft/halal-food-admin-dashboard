import React,{useReducer} from 'react';
import axios from 'axios';
import notificationHandle from '../../utils/notificationHandle';
import OrderContext from '../OrderContext/OrderContext';
import OrderReducer from '../OrderContext/OrderReducer';

import {
 GET_ORDERS,
 GET_SINGLE_ORDER,
 CHANGE_ORDER_STATUS,
 ADD_TO_CART,
 INCREMENT,
 DECREMENT,
 GET_SALE_INFO
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
  saleInfo:[],
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
          notificationHandle("Update success","success",1000)
        }catch (err) {  
          notificationHandle(err.response.data.msg,"danger",1000)
        }}
  
  const createOfflineSale = async (data) => {
         const config={ header:{'Content-Type':'application/json'}}
              try{
                const res = await axios.post('/api/order/offline-sale',data,config)
                console.log(res.data)
                // dispatch({ type: GET_SINGLE_ORDER, payload: res.data})
                getOrders()
                notificationHandle("Create success","success",1000)
              }catch (err) {  
                notificationHandle(err.response.data.msg,"danger",1000)
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

  //  get all sales info by user
  const getAllSaleInfo = async () => {
    try{
      const res = await axios.get('/api/order/order-info')
        dispatch({ type: GET_SALE_INFO, payload: res.data })
      
    }catch (err) {  
      console.log(err)
      
      }}


    return (
        <OrderContext.Provider value={{
          orderRequest: state.orderRequest,
          deliveredOrder: state.deliveredOrder,
          activeOrder: state.activeOrder,
          offlineSale: state.offlineSale,
          singleOrder: state.singleOrder,
          cart: state.cart,
          saleInfo:state.saleInfo,
          getSingleOrder,
          changeOrderStatus,
          getOrders,
          addToCart,
          increment,
          decrement,
          createOfflineSale,
          getAllSaleInfo

          
        
    }}>
      {props.children}
    </OrderContext.Provider >
    )
}
export default OrderState;