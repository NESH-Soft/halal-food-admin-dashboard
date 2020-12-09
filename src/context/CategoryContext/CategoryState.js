import React,{useReducer} from 'react';
import axios from 'axios';
import CategoryContext from '../CategoryContext/CategoryContext';
import CategoryReducer from '../CategoryContext/CategoryReducer';

import {
 GET_CATEGORY,
 ADD_CATEGORY,
 ADD_SUB_CATEGORY,
 DELETE_CATEGORY,
 DELETE_SUB_CATEGORY
} from '../type'

const CategoryState=(props)=> {
const initialState={
  allCategory: [],
  success: false,
}

const [state,dispatch]=useReducer(CategoryReducer,initialState)

//  get all category
const getCategory = async () => {
try{
  const res = await axios.get('/api/category')
    dispatch({ type: GET_CATEGORY, payload: res.data })

}catch (err) {  
  console.log(err)
 
  }}

const addCategory = async data => {
  console.log(data)
    const config = { headers: { 'Content-type': 'application/json' }};
    try {
      const res= await axios.post('/api/category', data, config)
      dispatch({ type: ADD_CATEGORY, payload:res.data });
    } catch (err) {  
console.log(err)
      }
    }

const addSubCategory = async data => {
  const s = {name:data.name}
      const config = { headers: { 'Content-type': 'application/json' }};
      try {
        const res= await axios.put(`/api/category/${data._id}`, s, config)
        getCategory()
        // dispatch({ type: ADD_SUB_CATEGORY, payload:res.data });
      } catch (err) {  
  console.log(err)
        }
      }
      // Delete Invoice
const deleteCategory = async (id)=>{
  try{
      const res=await axios.delete(`/api/category/${id}`)
      dispatch({ type:DELETE_CATEGORY, payload:res.data });
  }catch (err){  
     console.log(err)
    }}

const deleteSubCategory = async (id)=>{
      try{
          const res=await axios.put(`/api/category/subcategory-delete/${id}`)
          console.log(res)
          getCategory()
          // dispatch({ type:DELETE_SUB_CATEGORY, payload:res.data });
      }catch (err){  
         console.log(err)
        }}

    return (
        <CategoryContext.Provider value={{
          allCategory: state.allCategory,
          getCategory,
          addCategory,
          addSubCategory,
          deleteCategory,
          deleteSubCategory
    }}>
      {props.children}
    </CategoryContext.Provider >
    )
}
export default CategoryState;