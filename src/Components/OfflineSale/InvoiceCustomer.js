import React, { useContext,useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
// /* eslint-disable no-use-before-define */
import AddBoxIcon from '@material-ui/icons/AddBox';
import useAutocomplete from '@material-ui/lab/useAutocomplete';
import styled from 'styled-components';
import InvoiceContext from '../../context/InvoiceContext/InvoiceContext'
const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
      padding:5,
    
    },
    tittle:{
      textAlign: 'center',
      height:60
    },
    productSearch:{
      margin: theme.spacing(1),
      padding:8
    
    },
    searchIcon:{
      display: 'flex',
    },
    iconSize:{
      fontSize:35
    },
    productTable:{
  
      margin: theme.spacing(1),
    },
    customerSearch:{
      margin: theme.spacing(1),
  
    },
    customerDetails:{
      margin: theme.spacing(1),
      padding:8
  
    },
    accountDetails:{
      margin: theme.spacing(1),
      padding:8,
      textAlign: 'center',
  
    },
    paper: {
      // padding: theme.spacing(2),
      // textAlign: 'center',
      // color: theme.palette.text.secondary,
    },
  input:{
    fontSize: '15px',
    height: '30px',
    boxSizing: 'border-box',
    padding: '4px 6px',
    width: 0,
    minWidth: '30px',
    flexGrow: 1,
    border: 0,
    margin: 0,
    outline: 0,
  },
  listbox: {

  }
  }));


 
 const InvoiceCustomer = ({customers}) => {
    const classes = useStyles();
    const {getInvoiceCustomer} = useContext(InvoiceContext)
    const {
        getRootProps,
        getInputProps,
        getListboxProps,
        getOptionProps,
        groupedOptions,
        value
      } = useAutocomplete({
        id: 'use-autocomplete-demo',
        options: customers,
        getOptionLabel: (option) => option.name,
      })


      useEffect(()=>{
        getInvoiceCustomer(value)
        //eslint-disable-next-line
      },[value])
    return (
        <div>
   <Paper elevation={5} className={classes.customerSearch}>
   <div>
      <div {...getRootProps()} className={classes.searchIcon}>
      <AddBoxIcon className={classes.iconSize}/>
      <InputWrapper>
        <input className={classes.input} {...getInputProps()} placeholder="Search Customer"/>
      </InputWrapper>
      </div>
      {groupedOptions.length > 0 ? (
        <Listbox {...getListboxProps()}>
          {groupedOptions.map((option, index) => (
            <li {...getOptionProps({ option, index })}>{option.name}</li>
          ))}
        </Listbox>
      ) : null}
    </div>
        </Paper>

        <Paper elevation={5} className={classes.customerDetails}>
           <p>Name: {value? value.name : null} </p> 
           <p>Phone: {value? value.phone : null}</p>
           <p> address: {value? value.address : null}</p>
           <p>Old due: {value? value.due : null} </p>
        </Paper>
            
        </div>
    )
}


export default InvoiceCustomer