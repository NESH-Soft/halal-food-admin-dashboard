
import React from 'react';
import {BrowserRouter, Route, Switch } from 'react-router-dom'
import Footer from './Components/layout/Footer'
import SignIn from './Components/Auth/SignIn'
import ForgotPassword from './Components/Auth/ForgotPassword'
import ResetPassword from './Components/Auth/ResetPassword'
import Dashboard from './Components/Dashboard/Dashboard'
import Info from './Pages/Info';

import AuthState from './context/AuthContext/AuthState';
import ProductState from './context/ProductContext/ProductState';
import CategoryState from './context/CategoryContext/CategoryState';
import OrderState from './context/OrderContext/OrderState'
import CustomerState from './context/CustomerContext/CustomerState'
import InvoiceState from './context/InvoiceContext/InvoiceState'

import PrivateRoute from './Routing/PrivateRoute'

import './App.css';

function App() {
  return (
    <AuthState>
      <ProductState>
        <CategoryState>
          <OrderState>
        <CustomerState>
          <InvoiceState>
            <BrowserRouter>
              <div className='App'>
                <Switch>
                  <Route exact  path="/" component={SignIn}/>
                  <PrivateRoute exact  path="/info" component={Info}/>
                  <PrivateRoute exact  path="/dashboard" component={Dashboard}/>
                  <PrivateRoute exact  path="/dashboard/:comp" component={Dashboard}/>
                  <PrivateRoute exact  path="/dashboard/:comp/:cop" component={Dashboard}/>
                  
                </Switch>

                <Footer/>
            </div>
          </BrowserRouter>
          </InvoiceState>
        </CustomerState>
        </OrderState>
        </CategoryState>
      </ProductState>
    </AuthState>
  );
}

export default App;