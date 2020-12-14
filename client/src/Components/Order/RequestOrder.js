import React, { useState, useContext } from 'react'
import moment from 'moment';
import {Link} from 'react-router-dom';
import {
  FilteringState,
  IntegratedFiltering,
} from '@devexpress/dx-react-grid';
import {
  Table,
  TableHeaderRow,
  TableFilterRow,
  VirtualTable,
  TableColumnResizing,
  Grid,
} from '@devexpress/dx-react-grid-material-ui';
import {
  Button,
  Paper,
  makeStyles,

  } from '@material-ui/core';
  import OrderContext from '../../context/OrderContext/OrderContext';

const useStyles = makeStyles((theme) => ({
  root: {
      flexGrow: 1,
    },
  linkStyle:{
      textDecoration: 'none',
      color: 'white'
    },
 
  }))
 const RequestOrder = (props) => {
  const classes = useStyles()
  const {getSingleOrder} = useContext(OrderContext)
  const orderRequest = props.orderRequest || []
  const [filteringStateColumnExtensions] = useState([
      { columnName: 'action', filteringEnabled: false },
    ]);
  const [columns] = useState([
      { name: 'sl', title: 'Sl' },
      { name: 'createdAt', title: 'Date Added' },
      { name: 'name', title: 'Customer name' },
      { name: 'payment', title: 'Payment' },
      { name: 'address', title: 'Address' },
      { name: 'items', title: 'Total Item' },
      { name: 'total', title: 'Total' },
      { name: 'view', title: 'View', columnFilteringEnabled: false},
  
    ]);

const itemCount = (cartParameter)=>{
  const quantityArray = cartParameter.map(function(product) {
    return product.quantity;
  });
  const totalItem = quantityArray.reduce(function(accumulator, currentValue) {
    return accumulator + currentValue;;
  }, 0);
  return totalItem

}
  
  
    const data = orderRequest.map((order,index) => {
      return {
        sl: index+1,
        createdAt:(moment( order.createdAt).format("MMMM Do YYYY")),
        name: order.user.name,
        payment: order.paymentId ? 'completed' : 'cash on delivery',
        address: order.shipping.line1,
        items: itemCount(order.cart),
        total: order.totalPrice,
        view:( <Link className={classes.linkStyle} to="/dashboard/order-details/"><Button variant="contained" onClick={()=>getSingleOrder(order._id)} size="small" color="primary">
        View
      </Button> </Link>),
  
          }
    })
  
  


    return (
        <div>
           
           <Paper variant="outlined" elevation={5} >
           {/* <h3>Order Request here</h3> */}
      
            <Grid rows={data} columns={columns}>
              <FilteringState columnExtensions={filteringStateColumnExtensions}/>
              <IntegratedFiltering />
              <Table />
              <VirtualTable height="auto"/>
              <TableColumnResizing  />
              <TableHeaderRow />
              <TableFilterRow />
          
            </Grid>
          </Paper> 
    
        </div>
    )
}
export default RequestOrder;
