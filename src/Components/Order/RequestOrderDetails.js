import React,{ useContext} from 'react'
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import Avatar from '@material-ui/core/Avatar';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import { Button,Paper,makeStyles,Typography,Grid} from '@material-ui/core';
import moment from 'moment';
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
     margin:"5px",
     padding:"20px",
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
    signature:{
      textAlign:'center',
      paddingTop:'5%'
    }
   
  }))


const RequestOrderDetails = () => {
const {singleOrder, changeOrderStatus} = useContext(OrderContext)
const data = singleOrder[0] || []
const s = data.status
const _id = data._id
const cart = data.cart || []

const BalanceArray = cart.map(function(product) {
  return product.specialPrice*product.quantity;
});

const totalPrice = BalanceArray.reduce(function(accumulator, currentValue) {
  return accumulator + currentValue;;
}, 0);



    const classes = useStyles()
    const [status, setStatus] = React.useState(s);
    // useEffect(()=>{
    //   getSingleOrder(props.match.params.id)
    //   // eslint-disable-next-line
    // },[])

  
    const handleChange = (event) => {
      setStatus(event.target.value);
    };

    const requestHandleStatus = (data)=>{
      if(!status){
        return alert('select status')
        
      }
      const da = {_id,status}
      changeOrderStatus(da)
   
    }
 

    return (
  
           <Grid  className={classes.content}>
           <Grid container spacing={3}>
        <Grid item xs={12}>
          <Paper className={classes.paper}><h3>Order details</h3></Paper>
        </Grid>
       
        <Grid item xs={6} sm={3}>
          <Paper className={classes.paper}>Date </Paper>
      
        <Typography className={classes.title} color="textSecondary" >
          {moment( data.createdAt).format("Do MMMM YYYY, h:mm:ss a")}
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
         
        
          {
            data.shipping ? (
              <div>
              <Typography  color="textSecondary">Line1: {data.shipping.line1}</Typography>
              <Typography  color="textSecondary">city: {data.shipping.city}</Typography>
               <Typography  color="textSecondary">postCode: {data.shipping.postalCode}</Typography>
              </div>
            ) : (
              <div>
                 <Typography  color="textSecondary">N/A</Typography>
              </div>
            )
          }
      
        </Grid>
         
        </Grid>



        <Grid item xs={6} sm={3}>

          <Paper className={classes.paper}>Status</Paper>
          <Grid className={classes.titleContent}>
            {data.status}
  
      <div>
      {
          data.status === 'delivered' || data.status === 'offlineSale' ? (
            <div>

            </div>
          ) : (
            <div>
               <InputLabel id="demo-controlled-open-select-label"></InputLabel>
      
          {
            data.status === 'active'? (
              <div>
                  <Select
          labelId="demo-controlled-open-select-label"
          id="demo-controlled-open-select"
          value={status}
          onChange={handleChange}
        >
                 <MenuItem value='delivered'>Delivered</MenuItem>
          </Select>   
              </div>
            ) : (
              <div> 
              <div>
                  <Select
          labelId="demo-controlled-open-select-label"
          id="demo-controlled-open-select"
          value={status}
          onChange={handleChange}
        >
                 <MenuItem value='active'>Active</MenuItem>
          </Select>   
              </div>
        
             </div>
            )
          }
        

       
        <div>
        <Button variant="contained" onClick={()=>requestHandleStatus()} color="primary">Save
          </Button>
        </div>
              
            </div>
          )
      }
      </div>

     
       

   
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
          <TableCell align="right">{row.specialPrice}</TableCell>
          <TableCell align="right">{row.quantity * row.specialPrice}</TableCell>
          </TableRow>
          ))}

          <TableRow>
         

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
        <Grid className={classes.signature}>
            <Typography>**This is computer generated invoice,no signature required**</Typography>
          </Grid>
      </Grid> 
   
        
     
   
    )
}
export default RequestOrderDetails;
