
import React,{useContext,useEffect} from 'react';
import {
  Grid,
  makeStyles
} from '@material-ui/core';
import TotalProductCost from './TotalProductCost';
import TotalSale from './TotalSale'
import TotalCustomer from './TotalCustomer';
import ProductContext from '../../../context/ProductContext/ProductContext';
import OrderContext from '../../../context/OrderContext/OrderContext';
import CustomerContext from '../../../context/CustomerContext/CustomerContext'
const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    minHeight: '100%',
    paddingBottom: theme.spacing(1),
    paddingTop: theme.spacing(1),
    margin:'auto',
    width:'100%',
   
   
  },
  mainStyle:{
    marginRight:'auto'
  },

}));

const Info = () => {
  const classes = useStyles();
const {getAllProductInfo,productInfo} =useContext(ProductContext);
const {getAllSaleInfo,saleInfo} = useContext(OrderContext);
const {getTotalCustomer, totalCustomer} = useContext(CustomerContext)

useEffect(()=>{
  
  getAllProductInfo();
  getAllSaleInfo();
  getTotalCustomer();
 //eslint-disable-next-line
},[])
  return (
    <div className={classes.root}>
    <Grid container spacing={1}>
      <Grid item >
      <TotalProductCost productInfo={productInfo}/>
      </Grid>
      <Grid item >
      <TotalSale saleInfo={saleInfo}/>
      </Grid>
      <Grid item >
      <TotalCustomer totalCustomer={totalCustomer} />
      </Grid>
    
  
    </Grid>
  </div>
  

  );
};

export default Info;