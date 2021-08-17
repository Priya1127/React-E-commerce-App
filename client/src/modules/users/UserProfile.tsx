import React, {useState, useEffect } from 'react';
import * as userActions from '../../redux/users/user.actions';
import * as userReducer from '../../redux/users/user.reducer';
import {useDispatch, useSelector} from "react-redux";
import { NavLink } from 'react-router-dom';

interface IProps{}

interface IUserState{
    userKey : userReducer.userState
}

let UserProfile:React.FC<IProps> = ({}) => {

    let dispatch=useDispatch();

    useEffect(()=>{
        dispatch(userActions.getuserData);
    },[])

    let userStore:userReducer.userState = useSelector((store:IUserState) =>{
        return store.userKey;
    }) 

    let {user, isAuthentiated} = userStore;

    return(
        <React.Fragment>
            <section className="mt-3">
                <div className="container">
                    <div className="row">
                        <div className="col">
                            <p className="h3 text-success">Review your profile</p>
                            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. At autem blanditiis commodi consequatur corporis distinctio dolores doloribus enim, error harum, labore natus necessitatibus neque quae, rem ullam unde vel voluptas?</p>
                        </div>
                    </div>
                </div>
            </section>
            <section className="mt-3">
                <div className="container">
                    <div className="row">
                        <div className="col-md-3 text-center">
                            <img src= {user.avatar} alt='' className='rounded-circle' width={220} height={220}/>                         
                            <div className=' text-center'>
                                {/* <NavLink to={'/users/profile/address'} className='text-white text-center btn btn-success btn-sm'>Change Profile Pic</NavLink> */}
                                <NavLink to={'/users/profile/updateUserDetails'}className='text-white text-center btn btn-success btn-sm'>Change Profile Pic</NavLink>
                            </div>                                                                                                       
                        </div>
                        <div className="col-md-8">
                            <div className="card">
                                <div className="card-header bg-dark text-white text-center">
                                <p className='h6'>Profile Information<NavLink to={'/users/profile/updateUserDetails'} className='float-end fa fa-edit mx-2 text-white'/></p>
                                </div>
                                <div className="card-body ">
                                    <ul className='list-group'>
                                        <li className='list-group-item'>Name: <small className='fw-bold'>{user.name}</small></li>
                                        <li className='list-group-item'>Email:  <small className='fw-bold'>{user.email}</small></li>
                                        <li className='list-group-item'>Phone Number:  <small className='fw-bold'>{user.address?.phone}</small></li>
                                        <li className='list-group-item'><NavLink to='/users/orderList' className='btn btn-success btn-sm text-center'>View Previous Orders</NavLink></li>
                                    </ul>
                                </div>                                 
                            </div>     
                        </div>
                    </div>                
                    <div className="row mt-2">
                        <div className="col-md-3"> </div>
                        <div className="col-md-8">                           
                        {user.address?.phone ? <React.Fragment>
                            <div>
                                <div className="card">
                                    <div className="card-header bg-dark text-white text-center">
                                        <p className='h6'>Shipping Address<NavLink to='/users/profile/address' className='float-end fa fa-edit mx-2 text-white'/></p>
                                    </div>
                                    <div className="card-body ">
                                        <ul className='list-group'>
                                            <li className='list-group-item'>Flat: <small className='fw-bold'>{user.address?.flat}</small></li>
                                            <li className='list-group-item'>Street:  <small className='fw-bold'>{user.address?.street}</small></li>
                                            <li className='list-group-item'>Landmark:  <small className='fw-bold'>{user.address?.landmark}</small></li>
                                            <li className='list-group-item'>City:  <small className='fw-bold'>{user.address?.city}</small></li>
                                            <li className='list-group-item'>State:  <small className='fw-bold'>{user.address?.state}</small></li>
                                            <li className='list-group-item'>Country:  <small className='fw-bold'>{user.address?.country}</small></li>
                                            <li className='list-group-item'>Phone Number:  <small className='fw-bold'>{user.address?.phone}</small></li>
                                        </ul>
                                    </div>  
                                </div> 
                            </div>                            
                        </React.Fragment>:
                                <React.Fragment>
                                    <div className="card">
                                        <div className="card-header bg-dark text-white text-center">
                                            <p className='h6'>Shipping Address</p>
                                        </div>
                                        <div className="card-body ">
                                            <p>You don't have any shipping address yet, create a new address.</p>
                                            <NavLink to ='/users/profile/address' className='btn btn-primary btn-sm'>Create address</NavLink>
                                        </div>
                                    </div>
                                </React.Fragment>}
                        </div>
                          
                    </div>
                </div>
            </section>
        </React.Fragment>
    )
}
export default UserProfile;