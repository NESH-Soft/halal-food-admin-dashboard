import React from 'react'
import { Switch ,Route } from 'react-router-dom';
import DashboardInfo from '../Components/Dashboard/DashboardInfo';
import ProfileView from '../Components/Auth/account/AccountView/index'
import ChangePassword from '../Components/Auth/ChangePassword';
import ProductList from '../Components/Product/ProductList';
import AddProduct from '../Components/Product/AddProduct';
import EditProduct from '../Components/Product/EditProduct';
import Order from '../Components/Order/index'
import CustomerList from '../Components/Customer/CustomerList';
import InvoiceList from '../Components/Invoice/InvoiceList';
import CreateInvoice from '../Components/Invoice/CreateInvoice';
import Invoice from '../Components/Invoice/InvoicePrint';
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
          path="/dashboard/order"
          component={Order}
        />
          <Route
          exact
          path="/dashboard/customer"
          component={CustomerList}
        />
       
        
          <Route
          exact
          path="/dashboard/invoice/create-invoice"
          component={CreateInvoice}
        />
          <Route
          exact
          path="/dashboard/invoice/invoice-list"
          component={InvoiceList}
        />
          <Route
          exact
          path="/dashboard/invoice/single"
          component={Invoice}
        />
         <Route
          exact
          path="/dashboard/reports"
          component={UpCoaming}
        />
          <Route
          exact
          path="/dashboard/e-commerce"
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