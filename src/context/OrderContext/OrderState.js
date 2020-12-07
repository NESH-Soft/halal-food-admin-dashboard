import React,{useReducer} from 'react';
import axios from 'axios';
import OrderContext from '../OrderContext/OrderContext';
import OrderReducer from '../OrderContext/OrderReducer';

import {
 GET_ORDERS,
 GET_SINGLE_ORDER
} from '../type'

const OrderState=(props)=> {
const initialState={
  orderRequest: [],
  deliveredOrder:[],
  activeOrder: [],
  localSale: [],
  allOrder:[],
  singleOrder: [],
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

//  //upload product
// const uploadProduct= async data=>{
//     const formData = new FormData();
//     Object.keys(data).forEach(key => formData.append(key, data[key]));
//     const config = { headers: { 'Content-type': 'multipart/form-data' }};
// try{
//     const res= await axios.post('/api/product',formData,config)
//     dispatch({ type:UPLOAD_PRODUCT, payload:res.data });
 
// }catch (err){  
//   console.log(err)
//     }}
    


// // delete product
// const deleteProduct = async (id)=>{
// try{
//     const res=await axios.delete(`/api/product/${id}`)
//     dispatch({ type:DELETE_PRODUCT, payload:res.data });

// }catch (err){  
//   console.log(err)
//   }}


// //update product
// const updateProduct=async(product)=>{
//   const config={ header:{'Content-Type':'application/json'}}
// try {
//   const res=await axios.put(`/api/product/${product._id}`,product,config)
//   dispatch({ type:UPDATE_PRODUCT, payload:res.data });

//     } catch (err) {
//       console.log(err)
//     }
//   }

//   //  get all info 
// const getAllProductInfo = async () => {
//   try{
//     const res = await axios.get('/api/product/info')
//     console.log(res.data)
//       dispatch({ type: GET_PRODUCT_INFO, payload: res.data })

//   }catch (err) {  
//     console.log(err)
//     }}

//   //edit product
// const editFormFun=(product)=>{
//   dispatch({ type:EDIT_FORM, payload:product }) ;
// }

// //clear edit form
// const clearEditForm=()=>{
//   dispatch({ type:CLEAR_EDIT_FORM }) 
// }

//   const clearProductState = () =>{
//       dispatch({
//         type:CLEAR_APPLICATION_STATE,
//       })
  
//   }

    return (
        <OrderContext.Provider value={{
          orderRequest: state.orderRequest,
          deliveredOrder: state.deliveredOrder,
          activeOrder: state.activeOrder,
          localSale: state.localSale,
          singleOrder: state.singleOrder,
          getSingleOrder,

          
          getOrders
          
        
    }}>
      {props.children}
    </OrderContext.Provider >
    )
}
export default OrderState;