import React, { useEffect } from 'react';
import {NavLink} from "react-router-dom";
import pin_duo from '../../assets/img/pinduoduo_img.png';
import jingdong from '../../assets/img/Jingdong.png'
import * as orderReducer from '../../redux/orders/order.reducer';
import {useSelector} from 'react-redux';
import {UserService} from "../../services/userService";
import * as userActions from '../../redux/users/user.actions';
import * as userReducer from '../../redux/users/user.reducer';
import {useDispatch} from "react-redux";
//import { getProducts } from '../../redux/products/product.actions';

interface IProps{}
interface IOrderState{
    orderKey : orderReducer.orderState
}
interface IUserState{
    userKey : userReducer.userState
}

let NavBar:React.FC<IProps> = ({}) => {
    let dispatch = useDispatch();


    let orderStore:orderReducer.orderState = useSelector((store:IOrderState)=>{
        return store.orderKey
    })
    let {cartItems,errorMessage} = orderStore;

    let userStore:userReducer.userState = useSelector((store:IUserState) =>{
        return store.userKey;
    }) 

    let {user, isAuthentiated} = userStore;

    let isLogged = () =>{
        return !!(UserService.getTokenkey() && isAuthentiated);
    }
    
    let isAdmin = ()=>{
        return !!(UserService.getTokenkey() && isAuthentiated && user.isAdmin);
    }

    let logoutUser = () =>{
        dispatch(userActions.logoutUser());
    }

    // can't be implemented
    // let getProductsData = ()=>{
    //     dispatch(getProducts('MEN_FASHION'));
    //     dispatch(getProducts('WOMEN_FASHION'));
    //     dispatch(getProducts('KIDS_FASHION'));
    // }

    return(
        <React.Fragment>          
           <nav className="navbar navbar-dark navbar-expand-sm">
               <div className="container">
                    <div >
                    <img src={pin_duo} alt="" height='33px' className = 'mx-2 curve-border1'/>
                        <NavLink to ={'/'} className='navbar-brand showBorder'>
                           ~ JING-DONG ~
                        </NavLink>
                    </div> 
                    <div className="collapse navbar-collapse">
                      <ul className="navbar-nav me-auto">
                          <li className="nav-item">
                              <NavLink to={'/fashion/men'} className="nav-link">Mens Fashion</NavLink>
                          </li>
                          <li className="nav-item">
                              <NavLink to={'/fashion/women'} className="nav-link">Women Fashion</NavLink>
                          </li>
                          <li className="nav-item">
                              <NavLink to={'/fashion/kids'} className="nav-link">Kids Fashion</NavLink>
                          </li>
                          {
                              isAdmin() ? <li className="nav-item">
                              <NavLink // onClick={getProductsData} //can't be implemented
                                to={'/products/upload'} className="nav-link">Upload</NavLink>
                                
                          </li>:''
                          } 
                          <li className="nav-item">
                              <NavLink to={'/orders/cart'} className="nav-link">
                                  <i className="fa fa-shopping-cart"/>
                                  <span className="badge bg-danger">{cartItems.length}</span>
                              </NavLink>
                          </li>
                      </ul>
                      <div className="d-flex">
                          {
                              isLogged() ? 
                            <ul className="navbar-nav">
                                {
                                 user && Object.keys(user).length > 0 &&
                                 <li className="nav-item">
                                     <NavLink to={'/users/profile'} className="nav-link">
                                        <img src={user.avatar} alt={''} width={25} height={25} className="avatarImg rounded-circle mx-1"/>
                                         {user.name}</NavLink>
                                 </li>                                
                                }
                                <li >
                                    <NavLink to ={'/'} onClick={logoutUser} className='nav-link'>LogOut</NavLink>
                                </li>                                                           
                            </ul>: 
                            <ul className="navbar-nav">
                                <li >
                                    <NavLink to ={'/users/login'} className='nav-link'>Login</NavLink>
                                </li>
                                <li >
                                    <NavLink to ={'/users/register'} className='nav-link'>Register</NavLink>
                                </li>
                                <li className='nav-item'>
                                    <NavLink to ={'/about'} className='nav-link'>About</NavLink>
                                </li> 
                                                           
                          </ul>
                          }                          
                      </div>
                  </div>
               </div>
           </nav>
        </React.Fragment>
    )
};
export default NavBar;