import React,{useEffect, useContext} from 'react'
import Skeleton from '@material-ui/lab/Skeleton';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import Avatar from '@material-ui/core/Avatar';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import {Link} from 'react-router-dom'
import { Button,Paper,makeStyles,Typography,Grid} from '@material-ui/core';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import OrderContext from '../../context/OrderContext/OrderContext'


const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
    },
    tittle: {
      height: 60,
      padding:0,
      margin:0,
      display:'flex'
    },
    title:{
      textAlign:'center',
    },
    titleContent:{
      margin: "5px"
    },
   
  backButton:{
      padding:5,
    },

    content:{
   
       flexGrow: 1,
       textAlign: 'center',

    overflow: 'auto',
    },
    linkStyle:{
      textDecoration: 'none',
      color: 'white'
    },
    spinner: {
      textAlign: 'center',
      marginTop:'15%'
    
    },
    table: {
      minWidth: 700,
    },
   
  }))


const RequestOrderDetails = (props) => {
console.log(props.match.params.id)
const {getSingleOrder,singleOrder} = useContext(OrderContext)
const data = singleOrder[0] || []
const cart = data.cart || []

const BalanceArray = cart.map(function(product) {
  return product.price*product.quantity;
});

const totalPrice = BalanceArray.reduce(function(accumulator, currentValue) {
  return accumulator + currentValue;;
}, 0);



    const classes = useStyles()
    const [status, setStatus] = React.useState('');

    useEffect(()=>{
      getSingleOrder(props.match.params.id)
    },[])

  
    const handleChange = (event) => {
      setStatus(event.target.value);
    };
    const TAX_RATE = 0.07;



function ccyFormat(num) {
  return `${num.toFixed(2)}`;
}

function priceRow(qty, unit) {
  return qty * unit;
}

function createRow(name,image,category, quantity, price,) {
  const totalCount = priceRow(quantity, price);
  return {name,image,category, quantity, price,totalCount };
} 

function subtotal(items) {
  return items.map(({ price }) => price).reduce((sum, i) => sum + i, 0);
}


const rows = cart.map(item=>(
  createRow(`${item.name}, ${item.name}, ${item.category}, ${item.quantity}, ${item.price}`)
))


const invoiceSubtotal = subtotal(rows);
const invoiceTaxes = TAX_RATE * invoiceSubtotal;
const invoiceTotal = invoiceTaxes + invoiceSubtotal;

 

    return (
        <div>
          <Paper variant="outlined" square  className={classes.tittle}> 
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
           <Grid container spacing={3}>
        <Grid item xs={12}>
          <Paper className={classes.paper}>Order details</Paper>
        </Grid>
       
        <Grid item xs={6} sm={3}>
          <Paper className={classes.paper}>Date </Paper>
      
        <Typography className={classes.title} color="textSecondary" >
          {data.createdAt}
        </Typography>

        
        </Grid>
        <Grid item xs={6} sm={3}>
        <Paper className={classes.titlePaper}> Customer </Paper>
      <Grid className={classes.titleContent}>

    
        <Typography  color="textSecondary" >
        {data.user && data.user.name}
        </Typography>
        <Typography  color="textSecondary" >
         {data.user && data.user.phone}
        </Typography>
        <Typography  color="textSecondary" gutterBottom>
        {data.user && data.user.email}
        <Typography  color="textSecondary" >
        payment: {data.paymentId ? data.paymentId : 'Cash on delivery'}
        </Typography>
       
        </Typography>
        </Grid>
        </Grid>

        <Grid item xs={6} sm={3}>
          <Paper className={classes.paper}> Shipping </Paper>
          <Grid className={classes.titleContent}>
          <Typography className={classes.title} color="textSecondary" gutterBottom>
          {data.shipping && data.shipping.line1}
        </Typography>
        </Grid>
         
        </Grid>
        <Grid item xs={6} sm={3}>
          <Paper className={classes.paper}>Status</Paper>
          <Grid className={classes.titleContent}>
        <InputLabel id="demo-controlled-open-select-label">{data.status}</InputLabel>
        <Select
          labelId="demo-controlled-open-select-label"
          id="demo-controlled-open-select"
          value={status}
          onChange={handleChange}
        >
          
          <MenuItem value='Active'>Active</MenuItem>
          <MenuItem value='Delivered'>Delivered</MenuItem>
          <MenuItem value='Cancel'>Cancel</MenuItem>
        </Select>
   
        </Grid>
        </Grid>
      </Grid>

      <div>
        <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="spanning table">
        <TableHead>
        
          <TableRow>
            <TableCell>Product Name</TableCell>
            <TableCell align="right">Image</TableCell>
            <TableCell align="right">Category</TableCell>
            <TableCell align="right">Qty</TableCell>
            <TableCell align="right">price</TableCell>
            <TableCell align="right">Total</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {cart.map((row,index) => (
            <TableRow key={index}>
             <TableCell>{row.name}</TableCell>
          <TableCell  align="right"> <Avatar src={row.image} variant="square" className={classes.square}></Avatar></TableCell>
          <TableCell align="right">{row.category}</TableCell>
          <TableCell align="right">{row.quantity}</TableCell>
          <TableCell align="right">{row.price}</TableCell>
          <TableCell align="right">{row.quantity * row.price}</TableCell>
          </TableRow>
          ))}

          <TableRow>
            {/* <TableCell  />
            <TableCell  />
            <TableCell  />
            <TableCell  /> */}

            <TableCell align="right" colSpan={5}>Subtotal</TableCell>
            <TableCell align="right">{totalPrice}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell align="right" colSpan={5}>Shipping Cost</TableCell>
            <TableCell align="right">00</TableCell>
          </TableRow>
          <TableRow>
            <TableCell align="right" colSpan={5}>Total</TableCell>
            <TableCell align="right">{totalPrice}</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
        </div>
      </Paper> 
   
        
        </div>
   

      
        </div>
    )
}
export default RequestOrderDetails;
