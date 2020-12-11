import React, { useContext, useEffect, useState } from 'react'
import moment from 'moment'
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
  Typography
  } from '@material-ui/core';
import CustomerContext from '../../context/CustomerContext/CustomerContext'

const useStyles = makeStyles((theme) => ({
  root: {
      flexGrow: 1,
    },

  content:{
       margin:8,
       flexGrow: 1,
       textAlign: 'center',
  height: '77vh',
    overflow: 'auto',
    },
  linkStyle:{
      textDecoration: 'none',
      color: 'white'
    },
  
  }))
 const CustomerList = () => {

  const { customers, getCustomers, } = useContext(CustomerContext);

    const classes = useStyles()

    useEffect(() => {
      getCustomers();
      // eslint-disable-next-line
    }, []);
  

  
  
    const [filteringStateColumnExtensions] = useState([
      { columnName: 'action', filteringEnabled: false },
    ]);
  
  
    const [columns] = useState([
      { name: 'sl', title: 'Sl' },
      { name: 'name', title: 'Customer name' },
      { name: 'phone', title: 'Phone' },
      { name: 'email', title: 'Email' },
      { name: 'createdAt', title: 'Date Added' },
      { name: 'view', title: 'View', columnFilteringEnabled: false },
    ]);
  
    const data = customers.map((c,index) => {
      return {
        sl: index+1,
        name: c.name,
        phone: c.phone,
        email:(c.email? c.email : <Typography className={classes.orangeColor}>no Email</Typography> ),
        createdAt:(moment( c.createdAt).format("MMMM Do YYYY")),
        view:( <Button variant="contained" size="small" color="primary">
          View
        </Button>),
  
      }
    })
  
    return (
        <div>
  
       
           <Paper variant="outlined" elevation={5} className={classes.content}>
           <h3>All customer here</h3>
            <Grid
              rows={data}
              columns={columns}
            >
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
export default CustomerList;
