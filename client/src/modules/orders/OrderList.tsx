import React from 'react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Spinner from "../layout/Spinner"
import { NavLink } from 'react-router-dom';
import * as orderActions from '../../redux/orders/order.actions';
import * as orderReducer from '../../redux/orders/order.reducer';

interface IProps{}
interface IState{
    orderKey: orderReducer.orderState
}

let OrderList:React.FC<IProps> = ({}) => {
    //let dispatch = useDispatch();

    let orderStore:orderReducer.orderState = useSelector((store:IState)=>{
        return store.orderKey;
    })

    let {orderList, loading} = orderStore;

    return(
        <React.Fragment>
            <section className='mt-2'>
            <div className="container">
                <div className="row">
                    <h3>Your Orders</h3>
                    <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Necessitatibus, quod numquam ipsam repudiandae debitis consectetur earum id adipisci magnam nisi sit expedita, illum voluptas voluptates quisquam? Dolorum, consectetur. Saepe, nesciunt!</p>
                </div>
            </div>
            </section>
            <section className='mt-2'>
            <div className="container">
                <div className="row">
                    {
                        loading? <Spinner/> : <React.Fragment>
                            {
                        orderList.length >0 ?
                        <React.Fragment>
                            <table className='table table-hover table-striped'>
                                <thead className='bg-dark text-white text-center'>
                                    <tr>
                                        <th>Order Id</th>
                                        <th>Product Details</th>
                                        <th>Total</th>
                                        <th>Phone No</th>
                                        <th>Ordered By</th>
                                        <th>Ordered on</th>
                                    </tr>
                                </thead>
                                <tbody  className='bg-light text-center'>
                                {
                                orderList.map(list=>{
                                    return(
                                        <tr key={list._id}>
                                            <td className='text-center'>{list._id.substr(list._id.length- 5)}</td>
                                            <td>
                                                    <ul className="list-group">
                                                    {
                                                    list.items.map(item => {
                                                            return (
                                                                <React.Fragment>
                                                                    <li className="list-group-item">
                                                                        NAME : <small className='fw-bold'>{item.name} {", "}</small>
                                                                        Qty : <small className='fw-bold'>{item.qty} {", "}</small>
                                                                        Size : <small className='fw-bold'>{item.size} {", "}</small>
                                                                        Price : <small className='fw-bold'>{item.price} {""}</small>
                                                                    </li>
                                                                </React.Fragment>
                                                                )
                                                        })
                                                    }
                                                    </ul>
                                            </td>
                                            <td> &#8377;{(Number(list.total) + Number(list.tax)).toFixed(2)}</td>                                          
                                            <td>{list.phone}</td>
                                            <td>{list.name}</td>
                                            <td>{new Date(list.createdAt).toLocaleDateString()}</td>
                                        </tr>
                                    )
                                })
                                }
                                </tbody>
                            </table>
                            <div className="col text-center">
                                <NavLink to={'/users/profile'} className='btn btn-success btn-sm'>Back</NavLink>
                            </div>                           
                        </React.Fragment>
                        : <React.Fragment>
                            <div className="container">
                                <div className="row">
                                    <div className="col text-center">
                                        <p className="h5">------------You haven't placed any orders yet-------------</p>
                                        <NavLink to={'/users/profile'} className='btn btn-success btn-sm'>Go Back</NavLink>
                                    </div>
                                </div>
                            </div>
                        </React.Fragment>
                    }
                    </React.Fragment>
                }                    
                </div>
            </div>
            </section>
            
            
        </React.Fragment>
    )
};
export default OrderList;