import { isTemplateExpression } from 'typescript';
import { Order } from '../../modules/orders/Order';
import { Product } from '../../modules/products/models/Product';
import * as orderActions from './order.actions';

export interface orderState {
    loading : boolean;
    cartItems: Product[];
    errorMessage : string;
    orderList : Order[];
}

const initialState = {
    loading : false,
    cartItems : [] as Product[],
    // cartItems :[ {
    //     "_id" : 'dummyProduct',
    //     "name" : "Casual Jackets",
    //     "brand" : "Levis",
    //     "size": "15",
    //     "price": 1500,
    //     "qty" : 2,
    //     "image" : "https://i.insider.com/5c9ced992cc7402bb7501a75?width=1000&format=jpeg&auto=webp",
    //     "category": "KIDS_FASHION",
    //     "description" : "100% Cotton, Imported, Button closure, Wash And Dry Inside Out With Like Colors, Liquid Detergent Is Recommended, Sits at waist, Regular through seat and thigh, Straight leg, Button fly",
    //     "usage" : "Daily wear Jackets"
    // }],    
    errorMessage : '',
    orderList : [] as Order[]
}

export const reducer =(state=initialState, action:any):orderState=>{
    switch(action.type){

        //add to cart
        case orderActions.ADD_TO_CART_SUCCESS:
            return {
                    ...state,
                    cartItems: [
                        ...state.cartItems,
                        action.payload.product
                    ]
                }

        // increment and decrement in cart page
        case orderActions.INCREMENT:
            let IncCartItem: Product[] = state.cartItems.map(item =>{
                    if(item._id === action.payload){
                        return {
                            ...item,
                            qty : Number(item.qty) + 1 
                            }                        
                        }
                    return item;
                })                
            return {
                ...state,
                 cartItems: [...IncCartItem]
            }
        case orderActions.DECREMENT:
            let decCartItem: Product[] = state.cartItems.map(item =>{
                    if(item._id === action.payload){
                        return {
                            ...item,
                            qty : Number(item.qty) > 1 ? Number(item.qty) - 1 : 1
                            }                        
                        }
                    return item;
                })                
            return {
                ...state,
                 cartItems: [...decCartItem]
            }
        
        //delete products from cart
        case orderActions.DELETE_CARTITEM:
            let updatedCartItem: Product[] = state.cartItems.filter(item =>{
               return item._id !== action.payload
            })
            return {
                ...state,
                 cartItems: [...updatedCartItem]
            }

        //Make stripe Payment
        case orderActions.STRIPE_PAYMENT_REQUEST:
            return {
                ...state,
                loading:true
                 
            }
        case orderActions.STRIPE_PAYMENT_SUCCESS:
            return {
                ...state,
                loading:false
                
            }
        case orderActions.STRIPE_PAYMENT_FAILURE:
            return {
                ...state,
                loading:false,
                errorMessage: action.payload.error 
            }

        //place an order
        case orderActions.PLACE_ORDER_REQUEST:
            return {
                ...state,
                loading:true                 
            }
        case orderActions.PLACE_ORDER_SUCCESS:
            return {
                ...state,
                loading:false
            }
        case orderActions.PLACE_ORDER_FAILURE:
            return {
                ...state,
                loading:false,
                errorMessage: action.payload.error 
            }

        //clear the cart after order is placed
        //place an order
        case orderActions.CART_AFTER_CHECKOUT:
             return {
                 ...state,
                  cartItems: []
             }
        //retrieve your previous order
        case orderActions.GET_ORDERS_REQUEST:
            return {
                ...state,
                loading:true                 
            }
        case orderActions.GET_ORDERS_SUCCESS:
            return {
                ...state,
                loading:false,
                orderList:action.payload.orders
            }
        case orderActions.GET_ORDERS_FAILURE:
            return {
                ...state,
                loading:false,
                errorMessage: action.payload.error 
            }
        default:
            return state;
    }
}