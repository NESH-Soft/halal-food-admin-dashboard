import React,{useReducer} from 'react';
import axios from 'axios';
import CategoryContext from '../CategoryContext/CategoryContext';
import CategoryReducer from '../CategoryContext/CategoryReducer';

import {
 GET_CATEGORY
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


    return (
        <CategoryContext.Provider value={{
          allCategory: state.allCategory,
          getCategory
    }}>
      {props.children}
    </CategoryContext.Provider >
    )
}
export default CategoryState;