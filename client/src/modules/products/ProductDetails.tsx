import React, {useEffect, useState} from 'react';
import {useParams} from 'react-router-dom';
import * as productActions from '../../redux/products/product.actions';
import * as productReducer from '../../redux/products/product.reducer';
import {useSelector , useDispatch} from 'react-redux';
import Spinner from "../layout/Spinner";
import { Product } from './models/Product';
import * as orderActions from '../../redux/orders/order.actions';
import * as orderReducer from '../../redux/orders/order.reducer';
import * as alertActions from '../../redux/Alert/alert.action';

interface UrlParam{
    productId : string;
}
interface IProps{}
interface IState{
    productKey : productReducer.ProductState
}

interface orderState{
    orderKey : orderReducer.orderState
 }

let ProductDetails:React.FC<IProps> = ({}) => {
    let [qtyState, qtySetState] = useState<{qty : number}>({
        qty: 1
    })

    let dispatch = useDispatch();
    let {productId} = useParams<UrlParam>();

    // get the product state from Redux Store
    let productState:productReducer.ProductState = useSelector((store:  IState) => {
        return store.productKey;
    });

    let {selectedProduct , loading , errorMessage} = productState;

    useEffect(() => {
        dispatch(productActions.getProduct(productId));
    }, [productId]);

    let changeQty = (event:React.ChangeEvent<HTMLSelectElement>) =>{
        qtySetState({
            qty : Number(event.target.value)
        })
    }

    let orderStore:orderReducer.orderState = useSelector((store:orderState)=> {
        return store.orderKey
    });

    let {cartItems} = orderStore;

    let addtoCart = ()=>{
        let matchedItems:Product|undefined = cartItems.find(item =>
            item._id === selectedProduct._id
        )
        if (matchedItems){
            // dispatch(orderActions.addtoCart({...selectedProduct,
            //     qty: Number(matchedItems.qty) + qtyState.qty}));
            dispatch(alertActions.showAlert('bg-primary', 'Product added to the cart succesfully.', 'fa-check-circle')) //info alert
            return matchedItems.qty = Number(matchedItems.qty) + qtyState.qty
            //Add and alert, item already present in the cart.
        }  
        dispatch(orderActions.addtoCart({...selectedProduct,
                 qty: qtyState.qty   
                }))   
    }

    return(
        <React.Fragment>
            <section className="mt-3">
                <div className="container">
                    <div className="row">
                        <div className="col">
                            <p className="h3 text-success">Selected Product</p>
                            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. At autem blanditiis commodi consequatur corporis distinctio dolores doloribus enim, error harum, labore natus necessitatibus neque quae, rem ullam unde vel voluptas?</p>
                        </div>
                    </div>
                </div>
            </section>
            {
                loading ? <Spinner/> : <React.Fragment>
                    {
                        Object.keys(selectedProduct).length > 0 &&
                        <section className="mt-3">
                            <div className="container">
                                <div className="row">
                                    <div className="col-md-4 text-center">
                                        <img src={selectedProduct.image} alt={''} className="shadow-lg" width={220} height={330}/>
                                    </div>
                                    <div className="col-md-8">
                                        <p className="h6">NAME : <span className="fw-bold">{selectedProduct.name}</span></p>
                                        <p className="h6">Brand : <span className="fw-bold">{selectedProduct.brand}</span></p>
                                        <p className="h6">Size : <span className="fw-bold">{selectedProduct.size}</span></p>
                                        <p className="h6">Price : <span className="fw-bold">&#8377; {selectedProduct.price}</span></p>
                                        <p className="h6">Select Quantity <span className="fw-bold">
                                            <div className="row mt-2">
                                                <div className="col-md-3">                                                    
                                                    <select
                                                        required
                                                        value = {qtyState.qty}
                                                        onChange = {changeQty}
                                                        className="form-control">
                                                        <option value="">Select Qty</option>
                                                        <option value="1">1</option>
                                                        <option value="2">2</option>
                                                        <option value="3">3</option>
                                                        <option value="4">4</option>
                                                        <option value="5">5</option>
                                                    </select>
                                                    <button className="btn btn-success btn-sm" onClick={addtoCart} >Add To Cart</button>
                                                </div>
                                            </div> 
                                        </span></p>    
                                        <p>Description : {selectedProduct.description}</p>
                                        {
                                            selectedProduct.usage && selectedProduct.usage?.length > 0 ? <p>Usage : {selectedProduct.usage}</p>: ''
                                        }
                                        
                                    </div>
                                </div>
                            </div>
                        </section>
                    }
                </React.Fragment>
            }
        </React.Fragment>
    )
}
export default ProductDetails;