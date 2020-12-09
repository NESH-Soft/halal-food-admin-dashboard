import React,{useEffect,useContext} from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import RequestOrder from './RequestOrder';
import DeliveryOrder from './DeliveryOrder';
import OfflineSale from './OfflineSale';
import CancelOrder from './CancelOrder';
import ActiveOrder from './ActiveOrder'
import OrderContext from '../../context/OrderContext/OrderContext'
function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`nav-tabpanel-${index}`}
      aria-labelledby={`nav-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `nav-tab-${index}`,
    'aria-controls': `nav-tabpanel-${index}`,
  };
}

function LinkTab(props) {
  return (
    <Tab
      component="a"
      onClick={(event) => {
        event.preventDefault();
      }}
      {...props}
    />
  );
}

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
  },
}));

export default function NavTabs() {
const {getOrders,orderRequest,deliveredOrder,activeOrder,offlineSale} = useContext(OrderContext)

  useEffect(()=>{
    getOrders()
  },[])
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);

  };

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Tabs
          variant="fullWidth"
          value={value}
          onChange={handleChange}
          aria-label="nav tabs example"
        >
          <LinkTab label={`Request Order (${orderRequest.length})`} href="/request-order" {...a11yProps(0)} />
          <LinkTab label={`Active Order (${activeOrder.length})`} href="/active-order" {...a11yProps(1)} />
          <LinkTab label={`Delivered Order (${deliveredOrder.length})`} href="/delivery-order" {...a11yProps(2)} />
          <LinkTab label={`Offline Sale (${offlineSale.length})`} href="/offline-sale"  {...a11yProps(3)} />
        </Tabs>
      </AppBar>
      <TabPanel value={value} index={0}>
          <RequestOrder orderRequest={orderRequest}/>
      </TabPanel>
      <TabPanel value={value} index={1}>
      <ActiveOrder activeOrder={activeOrder}/>
      </TabPanel>
      <TabPanel value={value} index={2}>
      <DeliveryOrder deliveredOrder={deliveredOrder}/>
      </TabPanel>
      <TabPanel value={value} index={3}>
      <OfflineSale offlineSale={offlineSale}/>
      </TabPanel>
    </div>
  );
}

