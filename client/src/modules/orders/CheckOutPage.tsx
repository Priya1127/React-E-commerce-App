import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {NavLink, useHistory} from 'react-router-dom';
import StripeCheckout from 'react-stripe-checkout';
//import stripeImage from '../../assets/img/LuckyStripe.png'
import stripeImage from '../../assets/img/LuckyClove.png'
import * as orderActions from '../../redux/orders/order.actions';
import * as orderReducer from '../../redux/orders/order.reducer';
import * as userActions from '../../redux/users/user.actions';
import * as userReducer from '../../redux/users/user.reducer';

const taxPercent:number = 5.0;

const reactstripeKey: string | undefined = process.env.REACT_APP_STRIPE_KEY;

interface IProps{}
interface Istate{
    paymentMode : string;
}

interface IuserState{
    userKey : userReducer.userState;
}
interface IorderState{
    orderKey : orderReducer.orderState;
}

let CheckOutPage:React.FC<IProps> = ({}) => {

    let history = useHistory();
    let dispatch = useDispatch();

    let[state,setState] = useState<Istate>({
        paymentMode: 'Credit card Payment'
    })

    let checkPaymentMode = (event:React.ChangeEvent<HTMLInputElement>) => {
        setState({
            ...state,
            [event.target.name] : event.target.value
        })
    }
// get user Address info from Store
    let userStore:userReducer.userState = useSelector((store: IuserState) => {
        return store.userKey;
    });
// get cart details
    let orderStore: orderReducer.orderState = useSelector((store: IorderState) => {
        return store.orderKey;
    });

    let {user , loading} = userStore;
    let {cartItems} = orderStore;

// calculate total
    let totalAmount = ():number=>{
        let total=0;
            for(let item of cartItems){
                total += Number(item.qty) * Number(item.price);
            }
            return total;
        }
    
    let taxAmount:number = (taxPercent/100 * totalAmount());
    let grandTotal = ():number =>{
        return (totalAmount() + taxAmount)
    }

    let items:any = cartItems.map(item =>{
        return{
            name: item.name,
            brand: item.brand,
            size: item.size,
            qty: item.qty,
            price: item.price
        }
    })

    let order:any = {
        items : items,
        tax:taxAmount,
        total: grandTotal()
    }


    let handleToken = async (token?:any , addresses?:any)=>{
        const body = {
            product: {
                name: `${cartItems[0].name}..`,
                amount: grandTotal() * 100,
                currency: 'INR'
            },
            customer: {
                name : addresses.billing_name,
                address : {
                    line1: addresses.billing_address_line1,
                    postal_code: addresses.billing_address_zip,
                    city: addresses.billing_address_city,
                    state: addresses.billing_address_state,
                    country: addresses.billing_address_country
                    },
            },
            description: 'shopping with Jing-Dong',
            email : token.email,
            source: token.id,
            stripetokenType:token.type
        }
        dispatch(orderActions.makestripePayment(body, order, history));
    }

    //place order for cash on delivery
    let placeOrder = ()=>{
        dispatch(orderActions.placeOrder(order))
    }
    return(
        <React.Fragment>
            <section className="mt-2">
                <div className="container">
                    <h3 className='text-success'> Proceed Check-out</h3>
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Impedit error ab, vel minima sed modi reiciendis. Id, incidunt. Nobis eos culpa similique dicta aliquid id itaque inventore minus sapiente tempora!</p>
                </div>            
            </section> 
            <section className="mt-2" >
                <div className="container">
                    <div className="row">
                        <div className="col-md-6">
                            <div className="card">
                                <div className="card-header bg-dark text-white">
                                    <p>Shipping Address <NavLink to='/users/profile/address' className='float-end fa fa-edit mx-2 text-white'/> </p>
                                </div>
                                <div className="card-body">
                                    <ul className='list-group' >
                                        <li className='list-group-item list-group-item-success'>
                                             Name: <small className='fw-bold'>{user.name}</small><br/>
                                             Flat: <small className='fw-bold'>{user.address?.flat}</small><br/>
                                             Street: <small className='fw-bold'>{user.address?.street}</small><br/>
                                             Landmark: <small className='fw-bold'>{user.address?.landmark}</small><br/>
                                             City: <small className='fw-bold'>{user.address?.city}</small><br/>
                                             State: <small className='fw-bold'>{user.address?.state}</small><br/>
                                             Country: <small className='fw-bold'>{user.address?.country}</small><br/>
                                             Pin: <small className='fw-bold'>{user.address?.pin}</small><br/> 
                                             Phone Number: <small className='fw-bold'>{user.address?.phone}</small>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                            <div className="card">
                                <div className="card-header bg-dark text-white">
                                    <p>Mode of Payment</p>
                                </div>
                                <div className="card-body">
                                    <ul className='list-group'>
                                        <li className='list-group-item list-group-item-success'>
                                            <input onChange = {checkPaymentMode} type='radio' value='Cash on Delivery' name='paymentMode' className='mx-2'/>
                                            <i className="fas fa-hand-holding mx-1"/>Cash on Delivery<br/>
                                            <input onChange = {checkPaymentMode} type='radio' value='Credit card Payment' defaultChecked name='paymentMode'  className='mx-2'/>
                                            <i className="fab fa-cc-stripe mx-1"/>Credit card Payment<br/>
                                            {/* <input type='radio' value='GooglePay' name='paymentMode' className='mx-2'/>
                                            <i className="fab fa-google-pay"></i>Google Pay */}
                                        </li>                                        
                                    </ul>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-6">
                            <div className="card">
                                    <div className="card-header bg-dark text-white">
                                        <p>Review order details</p>
                                    </div>
                                    <div className="card-body">
                                        <ul className='list-group'>
                                            <li className='list-group-item list-group-item-success'>
                                                <table className='table table-striped table-hover'>
                                                    <thead className="bg-dark text-white text-center">
                                                        <tr>
                                                            <th>Image</th>
                                                            <th>Name</th>
                                                            <th>Size</th>
                                                            <th>Price</th>
                                                            <th>Qty</th>
                                                            <th>Total</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody className='text-center'>
                                                        {cartItems && cartItems.map(item =>{
                                                            return (
                                                                <tr key = {item._id}>
                                                                    <td><img src = {item.image} alt ='' width = {50} height={50}/></td>
                                                                    <td>{item.name}</td>                                                                    
                                                                    <td>{item.size}</td>
                                                                    <td>&#8377; {Number(item.price).toFixed(2)}</td>
                                                                    <td>{item.qty}</td>
                                                                    <td>{Number(Number(item.qty) * Number(item.price)).toFixed(2)}</td>
                                                                </tr>
                                                            )}
                                                        )}
                                                    </tbody>
                                                </table>
                                            </li>                                        
                                        </ul>
                                    </div>
                                </div>
                                <div className="card">
                                    <div className="card-header bg-dark text-white text-center">
                                        <p className='fw-bold'>PROCEED CHECK-OUT</p>
                                    </div>
                                    <div className="card-body">
                                        <ul className='list-group'>
                                            <li  className='list-group-item'>Total Amount: <span className='fw-bold'>&#8377; {Number(totalAmount()).toFixed(2)}</span></li>
                                            <li  className='list-group-item'>Total Tax: <span className='fw-bold'>&#8377; {Number(taxAmount).toFixed(2)}</span></li>
                                            <li  className='list-group-item'>GrandTotal: <span className='fw-bold'>&#8377; {grandTotal().toFixed(2)}</span></li>
                                        </ul>
                                    </div>
                                    {
                                        state.paymentMode ==='Credit card Payment' ?                                    
                                        <div className="card-footer d-flex justify-content-between">
                                            <NavLink to='/orders/cart' className='btn btn-success btn-sm'>Back</NavLink>
                                            <StripeCheckout 
                                                token={handleToken}
                                                billingAddress                
                                                stripeKey={reactstripeKey?reactstripeKey:''}
                                                currency = 'INR'
                                                description = 'Make payment with stripe'
                                                name= 'Stripe Payment'
                                                amount = {grandTotal() * 100}                                 
                                                zipCode
                                                image={stripeImage}
                                                panelLabel = 'pay {{amount}}'>
                                                <button className="btn btn-danger btn-sm">Pay  &#8377; {grandTotal().toFixed(2)}</button>
                                            </StripeCheckout>
                                        </div> : state.paymentMode ==='Cash on Delivery' ?
                                        <div className="card-footer d-flex justify-content-between">
                                            <NavLink to='/orders/cart' className='btn btn-success btn-sm'>Back</NavLink>
                                            <NavLink  to='/users/orderList' onClick={placeOrder} className="btn btn-danger btn-sm">Place Order</NavLink>
                                        </div>: ''
                                    }
                                </div>             
                            </div>                                       
                    </div>
                </div>            
            </section>            
        </React.Fragment>
    )
};
export default CheckOutPage;