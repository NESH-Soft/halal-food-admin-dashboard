import React from 'react'
import { Switch ,Route } from 'react-router-dom';
import DashboardInfo from '../Components/Dashboard/DashboardInfo';
import ProfileView from '../Components/Auth/account/AccountView/index'
import ChangePassword from '../Components/Auth/ChangePassword';
import ProductList from '../Components/Product/ProductList';
import AddProduct from '../Components/Product/AddProduct';
import EditProduct from '../Components/Product/EditProduct';
import Order from '../Components/Order/index';
import RequestOrderDetails from '../Components/Order/RequestOrderDetails'
import GetCategory from '../Components/Category/GetCategory'
import CustomerList from '../Components/Customer/CustomerList';
import CreateSale from '../Components/OfflineSale/CreateSale';
import UpCoaming from '../Components/common/UpCoaming';
import Calculator from '../Components/common/Calculator';
import DeleteAccount from '../Components/Auth/DeleteAccount'
const DashboardRoutes = () => {
    return (
        <Switch>
         <Route
          exact
          path="/dashboard"
          component={DashboardInfo}
        />
         <Route
          exact
          path="/dashboard/me"
          component={ProfileView}
        />
        
         <Route
          exact
          path="/dashboard/change-password"
          component={ChangePassword}
        />
          <Route
          exact
          path="/dashboard/product"
          component={ProductList}
        />
         <Route
          exact
          path="/dashboard/product/add-product"
          component={AddProduct}
        />
         <Route
          exact
          path="/dashboard/product/edit-product"
          component={EditProduct}
        />
         <Route
          exact
          path="/dashboard/category"
          component={GetCategory}
        />
         <Route
          exact
          path="/dashboard/order"
          component={Order}
        />
         <Route
          exact
          path="/dashboard/order-details/:id"
          component={RequestOrderDetails}
        />
          <Route
          exact
          path="/dashboard/customer"
          component={CustomerList}
        />
       
        
          <Route
          exact
          path="/dashboard/create-sale"
          component={CreateSale}
        />
        
         <Route
          exact
          path="/dashboard/reports"
          component={UpCoaming}
        />
        
         <Route
          exact
          path="/dashboard/current-month"
          component={UpCoaming}
        />
          <Route
          exact
          path="/dashboard/last-quarter"
          component={UpCoaming}
        />
         <Route
          exact
          path="/dashboard/year-end"
          component={UpCoaming}
        />
         <Route
          exact
          path="/dashboard/calculator"
          component={Calculator}
        />
        <Route
          exact
          path="/dashboard/delete-account"
          component={DeleteAccount}
        />
        
        </Switch>
    )
}
export default DashboardRoutes;