import React, {useEffect} from 'react';
import {Product} from './models/Product';
import * as productActions from '../../redux/products/product.actions';
import * as productReducer from '../../redux/products/product.reducer';
import * as orderActions from '../../redux/orders/order.actions';
import * as orderReducer from '../../redux/orders/order.reducer';
import * as alertActions from '../../redux/Alert/alert.action';
import {useDispatch, useSelector} from 'react-redux';
import Spinner from '../layout/Spinner';
import { NavLink } from 'react-router-dom';


interface IProps{}
interface IState{
   productKey:productReducer.ProductState
}

interface orderState{
    orderKey : orderReducer.orderState
 }

let KidsFashion:React.FC<IProps> = ({}) => {
    let dispatch = useDispatch();
    const category:string = 'KIDS_FASHION'

     // get products data from REDUX store
     let productStore:productReducer.ProductState = useSelector((store:IState)=> {
        return store.productKey
    });

    let {loading, products} = productStore;
    
    useEffect(()=>{
        dispatch(productActions.getProducts(category));
    }, []);

    let orderStore:orderReducer.orderState = useSelector((store:orderState)=> {
        return store.orderKey
    });

    let {cartItems} = orderStore;
    
    let addtoCart =(product:Product)=>{
        let matchedItems:Product|undefined = cartItems.find(item =>
                item._id === product._id
        )
        if (matchedItems){            
            dispatch(alertActions.showAlert('bg-warning', 'Product is already added to the cart.', 'fa-exclamation-circle')) //info alert
            return product
        }
        dispatch(orderActions.addtoCart({...product, qty:1}))
    }

    return(
        <React.Fragment>
            <section className="mt-3">
                <div className="container">
                    <div className="row">
                        <div className="col">
                            <p className="h3 text-success">Kids Fashion</p>
                            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. At autem blanditiis commodi consequatur corporis distinctio dolores doloribus enim, error harum, labore natus necessitatibus neque quae, rem ullam unde vel voluptas?</p>
                        </div>
                    </div>
                </div>                
            </section>
            {
                loading ? <Spinner/> : <React.Fragment>
                    {
                        products.length > 0?
                        <React.Fragment>
                            <section className="mt-3">
                                <div className="container">
                                    <div className="row">
                                        {
                                            products.map(product =>{
                                            return (
                                                <div className="col-md-3"  key = {product._id}>
                                                    <div className="card shadow-lg">
                                                        <div className="card-header text-center">
                                                            <NavLink to={`/products/${product._id}`}>
                                                                <img src={product.image} alt='' width={150} height={300}/>
                                                            </NavLink>
                                                            
                                                        </div>
                                                        <div className="card-body">                                                        
                                                            <ul className='list-group'>
                                                                <li className="list-group-item">NAME : <span className="fw-bold">{product.name}</span></li>
                                                                <li className="list-group-item">BRAND : <span className="fw-bold">{product.brand}</span></li>
                                                                <li className="list-group-item">PRICE : <span className="fw-bold">&#8377;{product.price}</span></li>
                                                                <button onClick={addtoCart.bind(this,product)} className='btn btn-success btn-sm'>Add To Cart</button>
                                                            </ul>
                                                        </div>  
                                                    </div>
                                                </div>                                          
                                                )
                                            })
                                        }                                        
                                    </div>
                                </div>
                            </section>
                        </React.Fragment>: null                      
                    }
                </React.Fragment>
            }
        </React.Fragment> 
    )
}
export default KidsFashion;