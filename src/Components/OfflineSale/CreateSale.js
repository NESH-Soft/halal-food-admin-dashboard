import React, { useState,useContext,useEffect } from 'react';
import {Link} from 'react-router-dom';
// /* eslint-disable no-use-before-define */
import { makeStyles,
  TextField, 
  Button, 
  Typography,
  Grid,
  Paper,
  Table,
  TableRow,
  TableBody,
  TableHead,
  TableContainer,
  TableCell,
} from '@material-ui/core';
import AddBoxIcon from '@material-ui/icons/AddBox';
import useAutocomplete from '@material-ui/lab/useAutocomplete';
import NoSsr from '@material-ui/core/NoSsr';
import CheckIcon from '@material-ui/icons/Check';
import CloseIcon from '@material-ui/icons/Close';
import styled from 'styled-components';
import ProductContext from '../../context/ProductContext/ProductContext'
import OrderContext from '../../context/OrderContext/OrderContext'


const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    padding:5,
  },

  title: {
    padding: 8,
    textAlign:'center'
  },

  linkStyle:{
    textDecoration: 'none',
    color: 'white'
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

  customerDetails:{
    margin: theme.spacing(1),
    padding:8

  },

  accountDetails:{
    marginTop:"7px",
    padding:8,
    marginLeft: 'auto',
  

  },
  customerBox:{
    marginTop:'8px',
    padding:'10px'
  },

  paper: {
    // padding: theme.spacing(2),
    // textAlign: 'center',
    // color: theme.palette.text.secondary,
  },
  payButton:{
    flexGrow: 1,
  }
}));


const InputWrapper = styled('div')`
  width: 600px;
  border: 1px solid #d9d9d9;
  background-color: #fff;
  border-radius: 4px;
  padding: 1px;
  display: flex;
   flex-wrap: wrap;

  &:hover {
    border-color: #40a9ff;
  }

  &.focused {
    border-color: #40a9ff;
    box-shadow: 0 0 0 2px rgba(24, 144, 255, 0.2);
  }

  & input {
    font-size: 15px;
    height: 30px;
    box-sizing: border-box;
    padding: 4px 6px;
    width: 0;
    min-width: 30px;
    flex-grow: 1;
    border: 0;
    margin: 0;
    outline: 0;
  }
`;

const Tag = styled(({ label, onDelete, ...props }) => (
  <div {...props}>
    <span>{label}</span>
    <CloseIcon onClick={onDelete} />
  </div>
))`
  display: flex;
  align-items: center;
  height: 24px;
  margin: 2px;
  line-height: 22px;
  background-color: #fafafa;
  border: 1px solid #e8e8e8;
  border-radius: 2px;
  box-sizing: content-box;
  padding: 0 4px 0 10px;
  outline: 0;
  overflow: hidden;

  &:focus {
    border-color: #40a9ff;
    background-color: #e6f7ff;
  }

  & span {
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }

  & svg {
    font-size: 12px;
    cursor: pointer;
    padding: 4px;
  }
`;

const Listbox = styled('ul')`
  width: 300px;
  margin: 2px 0 0;
  padding: 0;
  position: absolute;
  list-style: none;
  background-color: #fff;
  overflow: auto;
  max-height: 250px;
  border-radius: 4px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
  z-index: 1;

  & li {
    padding: 5px 12px;
    display: flex;

    & span {
      flex-grow: 1;
    }

    & svg {
      color: transparent;
    }
  }

  & li[aria-selected='true'] {
    background-color: #fafafa;
    font-weight: 600;

    & svg {
      color: #1890ff;
    }
  }

  & li[data-focus='true'] {
    background-color: #e6f7ff;
    cursor: pointer;

    & svg {
      color: #000;
    }
  }
`;

 const CreateInvoice = (props) => {
  const classes = useStyles();
  const {getProducts,products} = useContext(ProductContext);
  const {addToCart,cart,increment,decrement,createOfflineSale,success} = useContext(OrderContext);
 
  const {
    getRootProps,
    getInputProps,
    getTagProps,
    getListboxProps,
    getOptionProps,
    groupedOptions,
    value,
    focused,
    setAnchorEl,
  } = useAutocomplete({
    id: 'customized-hook-demo',
    multiple: true,
    options: products.filter((product)=>product.stock > 0 ),
    getOptionLabel: (option) => option.name,
     
  });




useEffect(()=>{
  getProducts();
  addToCart(value);
  //eslint-disable-next-line
},[value])


const BalanceArray = cart.map(function(product) {
  return product.specialPrice*product.quantity;
});

const totalPrice = BalanceArray.reduce(function(accumulator, currentValue) {
  return accumulator + currentValue;;
}, 0);

const [formData,setFormData]=useState({
  name:"",
  email:"",
  phone:"",
});

const onChange = e => { setFormData({ ...formData,[e.target.name]:e.target.value }); }
const {name,email,phone}=formData
const paymentId = 'complete'
const status = 'offlineSale'
const obj = {
  name,email,phone,paymentId,cart,status,totalPrice
}

const onCreatOfflineSale=()=>{
if (!obj.name || !obj.email || !obj.phone || !obj.paymentId  || !obj.cart.length || !obj.status || !obj.totalPrice) {
  return alert('please fill all field')
}
createOfflineSale(obj);
}

  return (
    <div className={classes.root}>
     
    <Grid container >
      <Grid item xs={12}>
        <Paper elevation={5}  className={classes.title}>Create Offline Sale</Paper>
      </Grid>

      <Grid item xs={7}>
        <Paper elevation={5} className={classes.productSearch}>
            <NoSsr>
            <div >
              <div {...getRootProps()} className={classes.searchIcon}>
            
                <AddBoxIcon className={classes.iconSize}/> 
              <InputWrapper ref={setAnchorEl} className={focused ? 'focused' : ''}>
                  {value.map((option, index) => (
                    <Tag label={option.name} {...getTagProps({ index })} />
                  ))}

                 <input {...getInputProps()} placeholder="Search Product"/>
                </InputWrapper>
              </div>
              {groupedOptions.length > 0 ? (
                <Listbox {...getListboxProps()}>
                  {groupedOptions.map((option, index) => (
                    <li {...getOptionProps({ option, index })}>
                      <span>{option.name}</span>
                      <CheckIcon fontSize="small" />
                    </li>
                  ))}
                </Listbox>
              ) : null}
            </div>
          </NoSsr>
        </Paper>
  
        <Paper elevation={5} className={classes.productTable}>
          <TableContainer component={Paper}>     
          <Table className={classes.table} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Sl</TableCell>
              <TableCell align="right">Product Name</TableCell>
              <TableCell align="right">Price</TableCell>
                <TableCell align="right">Quantity</TableCell>
                <TableCell align="right">Total Price</TableCell> 
              </TableRow>
          </TableHead>
          <TableBody>
              {cart.map((product,index) => (
              <TableRow key={index}>
                <TableCell component="th" scope="row">
                  {index+1}
                </TableCell>
                <TableCell align="right">{product.name}</TableCell>
                <TableCell align="right">৳{product.specialPrice}</TableCell>
                <TableCell align="right">
                <div>

                {product.quantity  > 1 ? ( <button onClick={()=>decrement(product._id)}>-</button>) : (<button disable>-</button>) }
                <span>{product.quantity }</span>
                {product.quantity  < product.stock ? ( <button onClick={()=>increment(product._id)}>+</button>) : (<button disable>+</button>) }
               
               
                </div>
                 </TableCell>
                <TableCell align="right">৳{product.specialPrice*product.quantity}</TableCell>
              </TableRow>
            ))}
          </TableBody>
          </Table>
          </TableContainer>
        </Paper>

      </Grid>
      <Grid item xs={5}>
        <div>
        <Paper elevation={5} className={classes.customerBox}>
       
        <TextField
            size="small"
            variant="outlined"
            margin="normal"
            required
            fullWidth
            label="Name"
            name="name"
            value={name}
            onChange={e=> onChange(e)}
          />
          <TextField
            size="small"
            variant="outlined"
            margin="normal"
            required
            fullWidth
            label="Email Address"
            name="email"
            value={email}
            onChange={e=> onChange(e)}
          />
           <TextField
            size="small"
            type="number"
            variant="outlined"
            margin="normal"
            required
            fullWidth
            label="Phone"
            name="phone"
            value={phone}
            onChange={e=> onChange(e)}
          />
        
        
     
          </Paper>
    
        </div>
       


        <Paper elevation={5} className={classes.accountDetails}>
        <Typography>Sub Total: {totalPrice}</Typography>
              <Typography>Tax: 0</Typography>
              <Typography>Grand Total: {totalPrice}</Typography>
       
  
        
        </Paper>
      

    
     
        <div className={classes.accountDetails}>
        <Button variant="contained" color="primary" onClick={()=>onCreatOfflineSale()} disableElevation>
      Create Sale
    </Button>
        </div>
      
      </Grid>
   
    </Grid>
  </div>
  )
}
export default CreateInvoice;

