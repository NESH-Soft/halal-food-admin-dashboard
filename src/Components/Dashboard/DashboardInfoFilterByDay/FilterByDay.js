import React,{useContext,useEffect} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import RemoveShoppingCartIcon from '@material-ui/icons/RemoveShoppingCart';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import MoneyIcon from '@material-ui/icons/Money';
import  NumberWithComma from '../../../utils/NumberWithComma';
import OrderContext from '../../../context/OrderContext/OrderContext';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
   
  },
  demo: {
    backgroundColor: theme.palette.background.paper,
  },
 
  listStyle:{
      padding:0,
      margin:0
  },
  profitColor:{
      color:'green'
  },
  saleAmountColor:{
    color:'green'
  },
  costColor:{
      color:'red'
  },
  saleColor:{
    color: '#154360 '
  },
  soldColor:{
color: '#01579b',
  }
}));



export default function InteractiveList() {
  const classes = useStyles();

  const {getOrderInfoByDay,orderInfoByDay,} =useContext(OrderContext);

  const [day, setDay] = React.useState(0);
  
  useEffect(()=>{
    getOrderInfoByDay(day);
    //eslint-disable-next-line
  },[day]);
  
  const handleClick = (e) => {
    setDay(e.target.value)
  
  };
  const {totalSaleAmount,totalSoldProduct,totalSoldInvoice }  = orderInfoByDay || {}
 const defaultValue = 0;
  return (
    <div className={classes.root}>
   
     
        <Grid>
        <Grid className={classes.selectMenu}>
              <FormControl  style={{width:'210px'}} size="small" >
        <InputLabel htmlFor="outlined-age-native-simple">Sale Info Filter By Days</InputLabel>
        <Select
          native
          name="day"
          
          value={day}
          onChange={(e)=>handleClick(e)}
          label="Sale Information Filter By Days"
        >
        
          <option value={0}>Today</option>
          <option value={7}>Last week</option>
          <option value={15}>Last 15 days</option>
          <option value={30}>Last 30 days</option>
        </Select>
      </FormControl>
      </Grid>

          <div className={classes.demo}>


            <List >
                <ListItem divider={true} className={classes.soldColor}>
                      <RemoveShoppingCartIcon fontSize="small" />
                  <ListItemText
                    primary="Sale Product"
                  
                  />
                  <ListItemSecondaryAction>
                      <Typography className={classes.soldColor}>
                     {totalSoldProduct ? totalSoldProduct : defaultValue}
                        </Typography>
                  </ListItemSecondaryAction>
                </ListItem>
           
            </List>

            <List >
                <ListItem divider={true}
                className={classes.saleColor}>
                      <MoneyIcon fontSize="small" />
                  <ListItemText
                    primary="Sale Amount"
                    
                  />
                  <ListItemSecondaryAction>
                      <Typography
                      className={classes.saleColor}>
                       
                       ¥ {totalSaleAmount ? NumberWithComma(totalSaleAmount) : defaultValue}
                        </Typography>
                  </ListItemSecondaryAction>
                </ListItem>
           
            </List>

      

      

            <List >
                <ListItem divider={true}
                className={classes.profitColor} >
                      <MoneyIcon fontSize="small" />
                  <ListItemText
                    primary="Completed order"
                    
                  />
                  <ListItemSecondaryAction>
                      <Typography className={classes.profitColor}>
                      ¥ <span className={classes.profitColor} >{totalSoldInvoice ? totalSoldInvoice : defaultValue}</span> 
                        </Typography>
                  </ListItemSecondaryAction>
                </ListItem>
           
            </List>


      



          </div>
        </Grid>
     
    </div>
  );
}