import React,{useReducer} from 'react';
import axios from 'axios';
import notificationHandle from '../../utils/notificationHandle';
import ProductContext from '../ProductContext/ProductContext';
import ProductReducer from '../ProductContext/ProductReducer';

import {
  GET_PRODUCT,
  GET_PRODUCT_INFO,
  UPDATE_PRODUCT,
  UPLOAD_PRODUCT,
  DELETE_PRODUCT,
  EDIT_FORM,
  CLEAR_EDIT_FORM,
  CLEAR_APPLICATION_STATE,
  CLEAR_SUCCESS

} from '../type'

const ProductState=(props)=> {
const initialState={
  products: [],
  productInfo:[],
  editForm:{},
  success: false,
}

const [state,dispatch]=useReducer(ProductReducer,initialState)

//  get all product
const getProducts = async () => {
try{
  const res = await axios.get('/api/product')
    dispatch({ type: GET_PRODUCT, payload: res.data })
}catch (err) {  
   console.log(err)
  }}

 //upload product
const uploadProduct= async data=>{
    const formData = new FormData();
    Object.keys(data).forEach(key => formData.append(key, data[key]));
    const config = { headers: { 'Content-type': 'multipart/form-data' }};
try{
    const res= await axios.post('/api/product',formData,config)
    dispatch({ type:UPLOAD_PRODUCT, payload:res.data });
    notificationHandle("Upload success","success",1000)
    clearSuccess()
}catch (err){
  notificationHandle(err.response.data.msg,"danger",1000)
    }}
    


// delete product
const deleteProduct = async (id)=>{
try{
    const res=await axios.delete(`/api/product/${id}`)
    dispatch({ type:DELETE_PRODUCT, payload:res.data });
    notificationHandle("delete success","danger",1000)
}catch (err){  
  notificationHandle(err.response.data.msg,"danger",1000)
  }}


//update product
const updateProduct=async(product)=>{
  const config={ header:{'Content-Type':'application/json'}}
try {
  const res=await axios.put(`/api/product/${product._id}`,product,config)
  dispatch({ type:UPDATE_PRODUCT, payload:res.data });
  notificationHandle("Update success","success",1000)
    } catch (err) {
      notificationHandle(err.response.data.msg,"danger",1000)
    }
  }

  //  get all info 
const getAllProductInfo = async () => {
  try{
    const res = await axios.get('/api/product/product-info')
      dispatch({ type: GET_PRODUCT_INFO, payload: res.data })

  }catch (err) {  
    console.log(err)
    }}

  //edit product
const editFormFun=(product)=>{
  dispatch({ type:EDIT_FORM, payload:product }) ;
}

//clear edit form
const clearEditForm=()=>{
  dispatch({ type:CLEAR_EDIT_FORM }) 
}

const clearSuccess=()=>{
  setTimeout(()=>(
    dispatch({ type:CLEAR_SUCCESS }) 
  ),500)
 
}

  const clearProductState = () =>{
      dispatch({
        type:CLEAR_APPLICATION_STATE,
      })
  
  }

    return (
        <ProductContext.Provider value={{
          products: state.products,
          productInfo:state.productInfo,
          editForm: state.editForm,
          success:state.success,
          getProducts,
          getAllProductInfo,
          uploadProduct,
          updateProduct,
          editFormFun,
          clearEditForm,
          deleteProduct,
          clearProductState
        
    }}>
      {props.children}
    </ProductContext.Provider >
    )
}
export default ProductState;