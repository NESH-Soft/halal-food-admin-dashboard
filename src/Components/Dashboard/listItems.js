import React from 'react';
import { Link } from 'react-router-dom'
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import DashboardIcon from '@material-ui/icons/Dashboard';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import ReceiptIcon from '@material-ui/icons/Receipt';
import PersonIcon from '@material-ui/icons/Person';
import CategoryIcon from '@material-ui/icons/Category';
import BarChartIcon from '@material-ui/icons/BarChart';
const linkStyle = {
  textDecoration: 'none',
  color: 'black'
}

export const mainListItems = (
  <div>
    <Link to ='/dashboard' style={linkStyle}>
    <ListItem button>
      <ListItemIcon>
        <DashboardIcon />
      </ListItemIcon>
      <ListItemText primary="Dashboard"/>
    </ListItem>
    </Link>
    <Link to ='/dashboard/product' style={linkStyle}>
    <ListItem button>
      <ListItemIcon>
        <ShoppingCartIcon />
      </ListItemIcon>
      <ListItemText primary="Product" />
    </ListItem>
    </Link>
    <Link to ='/dashboard/category' style={linkStyle}>
    <ListItem button>
      <ListItemIcon>
        <CategoryIcon />
      </ListItemIcon>
      <ListItemText primary="Category" />
    </ListItem>
    </Link>
    <Link to ='/dashboard/order' style={linkStyle}>
    <ListItem button>
      <ListItemIcon>
        <ShoppingCartIcon />
      </ListItemIcon>
      <ListItemText primary="Order" />
    </ListItem>
    </Link>
    <Link to ='/dashboard/customer' style={linkStyle}>
    <ListItem button>
      <ListItemIcon>
        <PersonIcon />
      </ListItemIcon>
      <ListItemText primary="Customer" />
    </ListItem>
    </Link>
    <Link to ='/dashboard/create-sale' style={linkStyle}>
    <ListItem button>
      <ListItemIcon>
        <ReceiptIcon />
      </ListItemIcon>
      <ListItemText primary="Create Sale" />
    </ListItem>
    </Link>
    <Link to ='/dashboard/reports' style={linkStyle}>
    <ListItem button>
      <ListItemIcon>
        <BarChartIcon />
      </ListItemIcon>
      <ListItemText primary="Reports" />
    </ListItem>
    </Link>

  </div>
);
