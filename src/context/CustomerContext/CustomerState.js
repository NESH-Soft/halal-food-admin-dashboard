import React,{useReducer} from 'react';
import axios from 'axios';
import BaseUrl from '../../utils/BaseUrl'
import CustomerContext from '../CustomerContext/CustomerContext';
import CustomerReducer from '../CustomerContext/CustomerReducer';

import {
  GET_CUSTOMERS,
  GET_CUSTOMER,
  GET_TOTAL_CUSTOMER,

} from '../type'

const CustomerState=(props)=> {
const initialState={
  customers: [],
  customer:{},
  totalCustomer:[],
  success: false,
}

const [state,dispatch]=useReducer(CustomerReducer,initialState)

//  get all customer 
const getCustomers = async () => {
try{
  const res = await axios.get(`${BaseUrl}/api/user/all-user`)
    dispatch({ type: GET_CUSTOMERS, payload: res.data })

}catch (err) {  
  console.log(err)
  }}

  //  get customer 
const getCustomer = async (id) => {
  try{
    const res = await axios.get(`${BaseUrl}/api/all-user/${id}`)
      dispatch({ type: GET_CUSTOMER, payload: res.data })

  }catch (err) {  
    console.log(err)
    }}



      //  get all info 
const getTotalCustomer = async () => {
  try{
    const res = await axios.get(`${BaseUrl}/api/user/info`)
      dispatch({ type: GET_TOTAL_CUSTOMER, payload: res.data })
  
  }catch (err) {  
     console.log(err)
    }}


    return (
        <CustomerContext.Provider value={{
          customers: state.customers,
          customer: state.customer,
          totalCustomer: state.totalCustomer,
          getCustomers,
          getCustomer,
          getTotalCustomer,
    }}>
      {props.children}
    </CustomerContext.Provider >
    )
}
export default CustomerState;