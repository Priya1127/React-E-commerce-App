import * as productActions from './product.actions';
import {Product} from "../../modules/products/models/Product";

export interface ProductState{
    selectedProduct : Product;
    products : Product[];
    loading : boolean;
    errorMessage : string;
}

let initialState:ProductState = {
    selectedProduct : {} as Product,
    products : [] as Product[],
    loading : false,
    errorMessage : ''
};

export const reducer = (state = initialState , action:any):ProductState => {
    switch(action.type){
        // upload a product
        case productActions.UPLOAD_PRODUCT_REQUEST:
            return  {
                ...state,
                loading : true
            };
        case productActions.UPLOAD_PRODUCT_SUCCESS:
            return  {
                ...state,
                loading : false
            };
        case productActions.UPLOAD_PRODUCT_FAILURE:
            return  {
                ...state,
                loading : false
            };
         // get all products by category
        case productActions.GET_PRODUCTS_REQUEST:
                return  {
                    ...state,
                    loading : true                    
                };
        case productActions.GET_PRODUCTS_SUCCESS:
                return  {
                    ...state,
                    loading : false,
                    products: action.payload.products
                };
        case productActions.GET_PRODUCTS_FAILURE:
                return  {
                    ...state,
                    loading : false,
                    errorMessage: action.payload.error
                    
                };
        // get a product
        case productActions.GET_PRODUCT_REQUEST:
                return  {
                    ...state,
                    loading : true                    
                };
        case productActions.GET_PRODUCT_SUCCESS:
                return  {
                    ...state,
                    loading : false,
                    selectedProduct: action.payload.product
                };
        case productActions.GET_PRODUCT_FAILURE:
                return  {
                    ...state,
                    loading : false,
                    errorMessage: action.payload.error
                    
                };        
        default : return state;
    }
};