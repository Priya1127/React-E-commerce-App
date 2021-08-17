import { Product } from "../../modules/products/models/Product";
import { UserService } from "../../services/userService";
import { TokenServices } from "../../services/tokenService";
import * as alertActions from '../Alert/alert.action';
import axios from "axios";

const SERVER_URL = process.env.REACT_APP_SERVER_URL;

export const ADD_TO_CART_SUCCESS:string ='ADD_TO_CART_SUCCESS';
export const ADD_TO_CART_FAILURE:string ='ADD_TO_CART_FAILURE';

export const INCREMENT ='INCREMENT';
export const DECREMENT ='DECREMENT';
														  
export const DELETE_CARTITEM = 'DELETE_CARTITEM';																				  
																				  
export const STRIPE_PAYMENT_REQUEST:string ='STRIPE_PAYMENT_REQUEST';
export const STRIPE_PAYMENT_SUCCESS:string ='STRIPE_PAYMENT_SUCCESS';
export const STRIPE_PAYMENT_FAILURE:string ='STRIPE_PAYMENT_FAILURE';

export const PLACE_ORDER_REQUEST:string ='PLACE_ORDER_REQUEST';
export const PLACE_ORDER_SUCCESS:string ='PLACE_ORDER_SUCCESS';
export const PLACE_ORDER_FAILURE:string ='PLACE_ORDER_FAILURE';

export const GET_ORDERS_REQUEST:string ='GET_ORDERS_REQUEST';
export const GET_ORDERS_SUCCESS:string ='GET_ORDERS_SUCCESS';
export const GET_ORDERS_FAILURE:string ='GET_ORDERS_FAILURE';

export const CART_AFTER_CHECKOUT:string = 'CART_AFTER_CHECKOUT';

export const addtoCart = (product:Product)=>{
    return (dispatch:any)=>{
        try{
        dispatch({type:ADD_TO_CART_SUCCESS, payload:{product: product}});
        dispatch(alertActions.showAlert('bg-primary', 'Product added to cart successfully', 'fa-check-circle')); //success alert       
        }
        catch(error){
            dispatch({type:ADD_TO_CART_FAILURE, payload:error});
            dispatch(alertActions.showAlert('bg-danger', 'Error, Product addition to cart failed', 'fa-exclamation-circle'));  //error alert
        }
    }
}

export const increaseQty = (productId:string)=>{
    return (dispatch:any)=>{
        try{
            dispatch({type:INCREMENT, payload: productId}) ;           
        }
        catch(error){
            console.error(error);
        }
    }
}

export const decreaseQty = (productId:string)=>{
    return (dispatch:any)=>{
        try{
        dispatch({type:DECREMENT, payload:productId}) ;           
        }
        catch(error){
            console.error(error);
        }
    }
}

export const deletecartItem = (productId:string)=>{
    return (dispatch:any)=>{
        try{
            dispatch({type:DELETE_CARTITEM, payload: productId}) ; 
            dispatch(alertActions.showAlert('bg-warning', 'product is removed from your cart', 'fa-exclamation-triangle')); //warning alert
        }
        catch(error){
            console.error(error);
        }							  
    }							 
}
	  

//private request
export const makestripePayment = (body:any,order:any, history:any)=>{
    return async (dispatch:any)=>{
        try{
            dispatch({type : STRIPE_PAYMENT_REQUEST});
            let token = UserService.getTokenkey();
            if(token){ 
                TokenServices.settokenVerifier(token);     
                TokenServices.setStripeApiKey();
                let dataUrl:string = `${SERVER_URL}/api/v1/payments/checkout`;
                let response = await axios.post(dataUrl,body);						  
                dispatch({type:STRIPE_PAYMENT_SUCCESS, payload: response.data});
                dispatch(alertActions.showAlert('bg-primary', 'Payment Successfull !!', 'fa-check-circle')); //success alert
                // place an order
                dispatch(placeOrder(order));
                history.push('/users/orderList');
            }         
        }
        catch(error){					  
            dispatch({type:STRIPE_PAYMENT_FAILURE, payload: {error: error}});
            dispatch(alertActions.showAlert('bg-danger', 'Payment Failed !!', 'fa-exclamation-circle')); //failure alert			   
        }
    }
}

//private request
export const placeOrder = (order:any)=>{
    return async (dispatch:any)=>{
        try{
            dispatch({type : PLACE_ORDER_REQUEST});
            let token = UserService.getTokenkey();
            if(token){ 
                TokenServices.settokenVerifier(token);               
                let dataUrl:string = `${SERVER_URL}/api/v1/orders/place`;
                let response = await axios.post(dataUrl,order);
                dispatch({type:PLACE_ORDER_SUCCESS, payload: response.data.msg});
                dispatch(alertActions.showAlert('bg-primary', 'Order is successfully placed !!', 'fa-check-circle')); //success alert
                dispatch(getpreviousOrders());
                //empty the cart
                dispatch(emptyCart());                																					 
            }         
        }
        catch(error){
            dispatch({type:PLACE_ORDER_FAILURE, payload: {error: error}});
            dispatch(alertActions.showAlert('bg-danger', 'Order placing failed !!', 'fa-exclamation-circle')); //error alert
        }
    }
}							

//clear the cart after order is successfully placed.
export const emptyCart = ()=>{
    return (dispatch:any)=>{
        try{
        dispatch({type:CART_AFTER_CHECKOUT});      
        }
        catch(error){
            console.error(error);
        }
    }
}

//get the orders from your orders table 
//private request
export const getpreviousOrders = ()=>{
    return async (dispatch:any)=>{
        try{
            dispatch({type : GET_ORDERS_REQUEST});
            let token = UserService.getTokenkey();
            if(token){ 
                TokenServices.settokenVerifier(token);               
                let dataUrl:string = `${SERVER_URL}/api/v1/orders/orderList`;
                let response = await axios.get(dataUrl);
                console.log(response.data);
                dispatch({type:GET_ORDERS_SUCCESS, payload: response.data});																			 
            }         
        }
        catch(error){
            dispatch({type:GET_ORDERS_FAILURE, payload: {error: error}})
        }
    }
}