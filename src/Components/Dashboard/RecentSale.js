import React from 'react';
import {Link} from 'react-router-dom'
import moment from 'moment'
import { makeStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Title from './Title';
import { Typography } from '@material-ui/core';



const useStyles = makeStyles((theme) => ({
  seeMore: {
    marginTop: theme.spacing(2),
  },
  spinner: {
    textAlign: 'center',
    padding:100

  }
}));

const RecentSale=({recentSale})=>{
  const classes = useStyles();
  const itemCount = (cartParameter)=>{
    const quantityArray = cartParameter.map(function(product) {
      return product.quantity;
    });
    const totalItem = quantityArray.reduce(function(accumulator, currentValue) {
      return accumulator + currentValue;;
    }, 0);
    return totalItem
  
  }
    
  return (
    <React.Fragment>

{!recentSale.length ? (<div className={classes.spinner}>
        <Typography>No recent oder</Typography>
        </div>)
         : (<div>

      <Title>Recent order</Title>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>Date</TableCell>
            <TableCell>Customer Name</TableCell>
            <TableCell>Address</TableCell>
            <TableCell>Payment</TableCell>
            <TableCell>total Item</TableCell>
            <TableCell>Total</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {recentSale.map((order,index) => (
            <TableRow key={index}>
           <TableCell>{(moment(order.createdAt).format("MMMM Do YYYY"))}</TableCell>
          <TableCell>{order.user && order.user.name}</TableCell>
              <TableCell>{order.shipping && order.shipping.line1}</TableCell>
              <TableCell>{order.paymentId ? 'completed' : 'cash on delivery'}</TableCell>
              <TableCell>{itemCount(order.cart)}</TableCell>
              <TableCell >{order.totalPrice}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <div className={classes.seeMore}>
        <Link to ="/dashboard/invoice/invoice-list" color="primary" >
          See more sale
        </Link>
      </div>
      </div>)
 }
    </React.Fragment>
  );
}

export default RecentSale