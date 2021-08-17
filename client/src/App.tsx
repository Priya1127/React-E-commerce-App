import React, { useEffect } from 'react';
import './App.css';
import {BrowserRouter , Route , Switch} from 'react-router-dom';
import NavBar from "./modules/layout/NavBar";
import Home from "./modules/layout/Home";
import About from "./modules/layout/About";
import MenFashion from "./modules/products/MenFashion";
import WomenFashion from "./modules/products/WomenFashion";
import KidsFashion from "./modules/products/KidsFashion";
import ProductUpload from "./modules/products/ProductUpload";
import UserLogin from "./modules/users/UserLogin";
import UserRegister from "./modules/users/UserRegister";
import UserProfile from "./modules/users/UserProfile";
import CartPage from "./modules/orders/CartPage";
import CheckOutPage from "./modules/orders/CheckOutPage";
import OrderList from "./modules/orders/OrderList";
import ProductDetails from "./modules/products/ProductDetails";
import * as userActions from './redux/users/user.actions';
import {useDispatch} from "react-redux";
import AddressCreate from './modules/users/AddressCreate';
import Alert from './modules/layout/Alert';
import PrivateRoute from "../src/router/PrivateRoute";
import UpdateUserDetails from './modules/users/UpdateUserDetails';
import Contact from './modules/layout/Contact';

function App() {

  let dispatch = useDispatch();

  useEffect(()=>{
    dispatch(userActions.getuserData())
  },[]) 

  return (
    <React.Fragment>
      <BrowserRouter>
          <NavBar/>
          <Alert/>
          <Switch>
              <Route exact path={'/'} component={Home}/>
              <Route exact path={'/about'} component={About}/>
              <Route exact path={'/contact'} component={Contact}/>
              <Route exact path={'/fashion/men'} component={MenFashion}/>
              <Route exact path={'/fashion/women'} component={WomenFashion}/>
              <Route exact path={'/fashion/kids'} component={KidsFashion}/>
              <PrivateRoute exact path={'/products/upload'} component={ProductUpload}/>
              <Route exact path={'/products/:productId'} component={ProductDetails}/>
              <Route exact path={'/users/login'} component={UserLogin}/>
              <Route exact path={'/users/register'} component={UserRegister}/>
              <PrivateRoute exact path={'/users/profile'} component={UserProfile}/>
              <PrivateRoute exact path={'/users/profile/updateUserDetails'} component={UpdateUserDetails}/>
              <PrivateRoute exact path={'/users/profile/address'} component={AddressCreate}/>
              {/* <PrivateRoute exact path={'/users/profile/profilepic'} component={ProfilePic}/> */}
              <PrivateRoute exact path={'/users/orderList'} component={OrderList}/>
              <Route exact path={'/orders/cart'} component={CartPage}/>
              <PrivateRoute exact path={'/orders/checkout'} component={CheckOutPage}/>
              
          </Switch>
      </BrowserRouter>
    </React.Fragment>
  );
}

export default App;
