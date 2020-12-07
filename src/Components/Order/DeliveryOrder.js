import React, { useEffect, useState } from 'react'
import moment from 'moment'
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
  Typography
  } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import IconButton from '@material-ui/core/IconButton';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';


const useStyles = makeStyles((theme) => ({
  root: {
      flexGrow: 1,
    },

  buttonBar: {
      height: 60,
      padding:0,
      margin:0,
      display:'flex'
    },
  addButton:{
    padding:5,
    marginLeft: 'auto',
    },
  backButton:{
      padding:5,
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
  spinner: {
      textAlign: 'center',
      marginTop:'17%'
    },
    greenColor:{
      color:'green'
    },
    orangeColor:{
      color:'orange'
    },
    deleteContent:{
      border: '1px solid',
    padding: theme.spacing(1),
    backgroundColor: theme.palette.background.paper,
    },
    deleteContentMiddle:{
      display:'flex',
    },
    deleteContentSpace:{
      paddingRight:6
    }
  }))
 const DeliveredOrder = (props) => {
const deliveredOrder = props.deliveredOrder || []

console.log(deliveredOrder)
    const classes = useStyles()

    useEffect(() => {
      // getCustomers();
      // eslint-disable-next-line
    }, []);
  
    const [filteringStateColumnExtensions] = useState([
      { columnName: 'action', filteringEnabled: false },
    ]);
  
  
    const [columns] = useState([
      { name: 'sl', title: 'Sl' },
      { name: 'createdAt', title: 'Date Added' },
      { name: 'name', title: 'Customer name' },
      { name: 'payment', title: 'Payment' },
      { name: 'address', title: 'Address' },
      { name: 'total', title: 'Total' },
      { name: 'view', title: 'View', columnFilteringEnabled: false},
  
    ]);
  
    const data = deliveredOrder.map((order,index) => {
      return {
        sl: index+1,
        createdAt:(moment( order.createdAt).format("MMMM Do YYYY")),
        name: order.user.name,
        payment: order.paymentId ? 'completed' : 'uncompleted',
        address: order.shipping.line1,
        total: order.totalPrice,
        view:( <Link className={classes.linkStyle} to={`/dashboard/customer/${order._id}`}><Button variant="contained" size="small" color="primary">
          View
        </Button> </Link>),
  
          }
    })
  
    const [defaultColumnWidths] = useState([
      { columnName: 'sl', width: 50 },
      { columnName: 'createdAt', width: 150  },
      { columnName: 'name', width: 140 },
      { columnName: 'payment', width: 150 },
      { columnName: 'address', width: 160 },
      { columnName: 'total', width: 160 },
      { columnName: 'address', width: 120  },
      { columnName: 'view', width: 70  },
   
    ]);


    return (
        <div>
             <Paper variant="outlined" square  className={classes.buttonBar}> 
                  <div className={classes.backButton}>
                  <Link to ='/dashboard' className={classes.linkStyle}>
                      <Button variant="contained" color="primary">
                    <ArrowBackIosIcon/>Back
                      </Button>
                </Link>
                </div> 
           </Paper > 

     <div>
       
           <Paper variant="outlined" elevation={5} className={classes.content}>
           <h3>DeliveredOrder here</h3>
      
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

    
      
        </div>
    )
}
export default DeliveredOrder;
