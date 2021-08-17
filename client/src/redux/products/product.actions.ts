import axios from 'axios';
import { UserService } from '../../services/userService';
import { TokenServices } from '../../services/tokenService';
import * as alertActions from '../Alert/alert.action';

export const UPLOAD_PRODUCT_REQUEST:string = 'UPLOAD_PRODUCT_REQUEST';
export const UPLOAD_PRODUCT_SUCCESS:string = 'UPLOAD_PRODUCT_SUCCESS';
export const UPLOAD_PRODUCT_FAILURE:string = 'UPLOAD_PRODUCT_FAILURE';

export const GET_PRODUCTS_REQUEST:string = 'GET_PRODUCTS_REQUEST';
export const GET_PRODUCTS_SUCCESS:string = 'GET_PRODUCTS_SUCCESS';
export const GET_PRODUCTS_FAILURE:string = 'GET_PRODUCTS_FAILURE';

export const GET_PRODUCT_REQUEST:string = 'GET_PRODUCT_REQUEST';
export const GET_PRODUCT_SUCCESS:string = 'GET_PRODUCT_SUCCESS';
export const GET_PRODUCT_FAILURE:string = 'GET_PRODUCT_FAILURE';

const SERVER_URL = process.env.REACT_APP_SERVER_URL;

export const uploadProduct = (product:any, history:any) => {
    return async (dispatch:any) => {
        //set token verifier sine uploading product has private access.
        let token = UserService.getTokenkey();
            if(token){
                console.log('token found');
                TokenServices.settokenVerifier(token);
            }
            else{
                console.log('no token found');
            }      
        try {
            dispatch({type : UPLOAD_PRODUCT_REQUEST});
            let dataURL:string = `${SERVER_URL}/api/v1/products/upload`;
            let response = await axios.post(dataURL, product);
            dispatch({type : UPLOAD_PRODUCT_SUCCESS, payload : response.data});
            console.log(response.data.msg);
            dispatch(alertActions.showAlert('bg-primary', 'product upload successful', 'fa-check-circle')); //success alert
            history.push('/');
        }
        catch (error){
            dispatch({type : UPLOAD_PRODUCT_FAILURE, payload : error.message});
            dispatch(alertActions.showAlert('bg-danger', 'product upload error, Either the product already exists or the file size exceeds 70KB.', 'fa-exclamation-circle'));  //error alert
        }
    };
};

export const getProducts = (category:string) => {
    return async (dispatch:any) =>{
        try{
            dispatch({type:GET_PRODUCTS_REQUEST})
            let dataURL:string = ''
            if(category === 'MEN_FASHION'){
                dataURL = `${SERVER_URL}/api/v1/products/fashion/men`;
            }
            if(category=== 'WOMEN_FASHION'){
                dataURL = `${SERVER_URL}/api/v1/products/fashion/women`;
            }
            if(category=== 'KIDS_FASHION'){
                dataURL = `${SERVER_URL}/api/v1/products/fashion/kids`;
            }  
            let response = await axios.get(dataURL);
            dispatch({type:GET_PRODUCTS_SUCCESS, payload: {products : response.data.products}})
        }
        catch(error){
            dispatch({type:GET_PRODUCTS_FAILURE, payload: error})
            }
    }
};

export const getProduct = (productId:string) => {
    return async (dispatch:any) =>{
        try{
            dispatch({type:GET_PRODUCT_REQUEST})
            let dataURL:string = `${SERVER_URL}/api/v1/products/${productId}`
            let response = await axios.get(dataURL);
            dispatch({type:GET_PRODUCT_SUCCESS, payload: {product : response.data.product}})
        }
        catch(error){
            dispatch({type:GET_PRODUCT_FAILURE, payload: error})
            }
    }
};