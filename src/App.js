
import React from 'react';
import {BrowserRouter, Route, Switch } from 'react-router-dom'
import ReactNotification from 'react-notifications-component';
import 'react-notifications-component/dist/theme.css'
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
import PrivateRoute from './Routing/PrivateRoute'

import './App.css';

function App() {
  return (
    
    <AuthState>
      <ProductState>
        <CategoryState>
          <OrderState>
        <CustomerState>
      
            <BrowserRouter>
              <div className='App'>
              <ReactNotification />
                <Switch>
                  <Route exact  path="/" component={SignIn}/>
                  <Route exact  path="/forgot" component={ForgotPassword}/>
                  <PrivateRoute exact  path="/info" component={Info}/>
                  <PrivateRoute exact  path="/dashboard" component={Dashboard}/>
                  <Route exact  path="/reset/:token" component={ResetPassword}/>
                  <PrivateRoute exact  path="/dashboard/:comp" component={Dashboard}/>
                  <PrivateRoute exact  path="/dashboard/:comp/:cop" component={Dashboard}/>
                  
                </Switch>

                <Footer/>
            </div>
          </BrowserRouter>
      
        </CustomerState>
        </OrderState>
        </CategoryState>
      </ProductState>
    </AuthState>
  );
}

export default App;