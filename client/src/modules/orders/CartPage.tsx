import React from 'react';
import * as orderActions from '../../redux/orders/order.actions';
import * as alertActions from '../../redux/Alert/alert.action';
import * as orderReducer from '../../redux/orders/order.reducer';
import {useDispatch, useSelector, useStore} from 'react-redux';
import * as userReducer from '../../redux/users/user.reducer';
import store from '../../redux/store';
import { NavLink } from 'react-router-dom';

interface IProps{}
interface IState{
    orderKey : orderReducer.orderState
}

interface IuserState{
    userKey : userReducer.userState;
}

const taxPercent = 5.0;

let CartPage:React.FC<IProps> = ({}) => {
    let dispatch = useDispatch();

    let orderStore:orderReducer.orderState = useSelector((store:IState) =>{
        return store.orderKey
    })

    let {cartItems} = orderStore; 

    let totalAmount = ():number=>{
        let total=0;
            for(let item of cartItems){
                total += Number(item.qty) * Number(item.price);
            }
            return total;
        }
    
    let taxAmount = (taxPercent/100 * totalAmount());

    let decreaseQty= (productId:string)=>{
        dispatch(orderActions.decreaseQty(productId));
    }

    let increaseQty= (productId:string)=>{
        dispatch(orderActions.increaseQty(productId));
    }

    let deleteItem = (productId:string)=>{
        dispatch(orderActions.deletecartItem(productId));
    }

    // get user and its address info from Store
    let userStore:userReducer.userState = useSelector((store: IuserState) => {
        return store.userKey;
    });

    let alertLogin = ()=> {
        dispatch(alertActions.showAlert('bg-danger', 'Please login to proceed check-out.', 'fa-exclamation-circle')) //error alert
    }
    let alertAddress = ()=> {
        dispatch(alertActions.showAlert('bg-warning', 'Please add shipping address details before check-out.', 'fa-exclamation-circle')) //info alert
    }
    let {user} = userStore;

    return(
        <React.Fragment>
            <section className="mt-3">
                <div className="container">
                    <div className="row">
                        <div className="col">
                            <p className="h3 text-success">CartPage Component</p>                           
                        </div>
                    </div>
                </div>                
            </section>
            {
                cartItems.length > 0 ? <React.Fragment>
                <section>
                    <div className="container">
                        <div className="row">
                            <div className="col text-center">
                                <p className = 'm-2 text-center'>Below items in your Shopping Cart are waiting to be proceeded for check-out. Please order before the items in your cart goes out of stock.</p>
                                <p className = 'm-2 text-center'>------Happy Shopping with us !!------</p>
                            </div>
                        </div>
                    </div>
                </section>                
                <section>
                    <div className="container">
                        <div className="row">
                            <div className="col-md-9">
                                <table className='table table-striped table-hover'>
                                    <thead className="bg-dark text-white text-center">
                                        <tr>
                                            <th>Image</th>
                                            <th>Name</th>                                            
                                            <th>Size</th>
                                            <th>Price</th>
                                            <th>Qty</th>
                                            <th>Total</th>
                                            <th>Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody className='text-center'>
                                        {cartItems && cartItems.map(item =>{
                                            return (
                                                <tr key = {item._id}>
                                                    <td><img src = {item.image} alt ='' width = {50} height={80}/></td>
                                                    <td>{item.name}</td>
                                                    
                                                    <td>{item.size}</td>
                                                    <td>&#8377; {Number(item.price).toFixed(2)}</td>
                                                    <td>
                                                        <span onClick={decreaseQty.bind(this,item._id as string)} className='fa fa-minus-square mx-1'/>
                                                            {item.qty}
                                                        <span onClick={increaseQty.bind(this,item._id as string)} className='fa fa-plus-square mx-1'/>
                                                    </td>
                                                    <td>{Number(Number(item.qty) * Number(item.price)).toFixed(2)}</td>
                                                    <td> <button onClick = {deleteItem.bind(this,item._id as string)} className='btn btn-danger btn-sm' ><i className='fa fa-trash'/></button> </td>
                                                </tr>
                                            )}
                                        )}
                                    </tbody>
                                </table>
                            </div>
                            <div className='col-md-3'>
                                <div className="card">
                                    <div className="card-header bg-dark text-white text-center">
                                        <p className='fw-bold'>PROCEED CHECK-OUT</p>
                                    </div>
                                    <div className="card-body">
                                        <ul className='list-group'>
                                            <li  className='list-group-item'>Total Amount: <span className='fw-bold'>{Number(totalAmount()).toFixed(2)}</span></li>
                                            <li  className='list-group-item'>Total Tax: <span className='fw-bold'>{Number(taxAmount).toFixed(2)}</span></li>
                                            <li  className='list-group-item'>GrandTotal: <span className='fw-bold'>{Number(totalAmount() + taxAmount).toFixed(2)}</span></li>
                                        </ul>
                                    </div>
                                    <div className="card-footer d-flex justify-content-around">
                                       <React.Fragment>
                                       {
                                        !(Object.keys(user).length > 0) ? <NavLink to={'/users/login'} onClick={alertLogin} className='btn btn-success btn-sm'>Check-Out</NavLink> :
                                        !(user.address)? <NavLink to={'/users/profile/address'}  onClick={alertAddress} className='btn btn-success btn-sm'>Check-Out</NavLink> :
                                        <NavLink to={'/orders/checkout'} className='btn btn-success btn-sm' >Check-out</NavLink>
                                        }
                                       </React.Fragment>
                                        <NavLink to={'/'}  className='btn btn-primary btn-sm'>Shop More</NavLink>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
                </React.Fragment>: <React.Fragment>
                    <div className="container">
                        <div className="row">
                            <div className="col text-center">
                                <p className="h5">------- Cart is Empty ------- </p>
                                <NavLink to={'/'} className='btn btn-success btn-sm'>Go Home</NavLink>
                            </div>
                        </div>
                    </div>
                </React.Fragment>                
            }

        </React.Fragment>
    )
}
export default CartPage;