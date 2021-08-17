import {Address, User} from "../../modules/users/models/User";
import axios from 'axios';
import { useHistory } from "react-router";
import { TokenServices } from "../../services/tokenService";
import { UserService } from "../../services/userService";
import * as alertActions from '../Alert/alert.action';

const SERVER_URL = process.env.REACT_APP_SERVER_URL;

export const REGISTER_USER_REQUEST : string = 'REGISTER_USER_REQUEST';
export const REGISTER_USER_SUCCESS : string = 'REGISTER_USER_SUCCESS';
export const REGISTER_USER_FAILURE : string = 'REGISTER_USER_FAILURE';

export const LOGIN_USER_REQUEST : string = 'LOGIN_USER_REQUEST';
export const LOGIN_USER_SUCCESS : string = 'LOGIN_USER_SUCCESS';
export const LOGIN_USER_FAILURE : string = 'LOGIN_USER_FAILURE';

export const GET_USER_REQUEST : string = 'GET_USER_REQUEST';
export const GET_USER_SUCCESS : string = 'GET_USER_SUCCESS';
export const GET_USER_FAILURE : string = 'GET_USER_FAILURE';

export const CREATE_USER_ADDRESS_REQUEST : string = 'CREATE_USER_ADDRESS_REQUEST';
export const CREATE_USER_ADDRESS_SUCCESS : string = 'CREATE_USER_ADDRESS_SUCCESS';
export const CREATE_USER_ADDRESS_FAILURE : string = 'CREATE_USER_ADDRESS_FAILURE';

export const UPDATE_USER_DATA_REQUEST : string = 'UPDATE_USER_DATA_REQUEST';
export const UPDATE_USER_DATA_SUCCESS : string = 'UPDATE_USER_DATA_SUCCESS';
export const UPDATE_USER_DATA_FAILURE : string = 'UPDATE_USER_DATA_FAILURE';

export const LOGOUT_USER : string = 'LOGOUT_USER';

export const registerUser = (registerData:User, history:any)=> {
    return async (dispatch:any) =>{
        try{
            dispatch({type:REGISTER_USER_REQUEST})
            let dataUrl:string = `${SERVER_URL}/api/v1/users/register`;
            let response = await axios.post(dataUrl, registerData);
            dispatch({type:REGISTER_USER_SUCCESS, payload: response.data})
            dispatch(alertActions.showAlert('bg-primary', 'Registration Successful, Please login to continue', 'fa-check-circle'));
            history.push('/users/login');
        }
        catch(error){
            dispatch({type: REGISTER_USER_FAILURE, payload: {error:error.message}})
            dispatch(alertActions.showAlert('bg-danger', 'Error, Please try again with the correct info', 'fa-exclamation-circle'));  //error alert
        }
    }
} 

export const loginUser = (loginData:any, history:any)=> {
    return async (dispatch:any) =>{
        try{
            dispatch({type:LOGIN_USER_REQUEST})
            let dataUrl:string = `${SERVER_URL}/api/v1/users/login`;
            let response = await axios.post(dataUrl, loginData);
            dispatch({type:LOGIN_USER_SUCCESS, payload: response.data.token})
            dispatch(getuserData());
            dispatch(alertActions.showAlert('bg-primary', 'Login Successful, Happy Shopping with us', 'fa-check-circle'))
            history.push('/');
        }
        catch(error){
            dispatch({type: LOGIN_USER_FAILURE, payload: {error:error.message}})
            dispatch(alertActions.showAlert('bg-danger', 'Error, Please try again with the correct info', 'fa-exclamation-circle'));  //error alert
        }
    }
} 

export const logoutUser = ()=> {
    return async (dispatch:any) =>{
        try{
            dispatch({type:LOGOUT_USER})
            dispatch(alertActions.showAlert('bg-primary', 'Logout Successful', 'fa-check-circle'))
        }
        catch(error){
            console.error(error);
        }
    }
} 

export const getuserData = ()=> {
    return async (dispatch:any) =>{
        try{ 
            //do the token verifiation for private access
            let token = UserService.getTokenkey();
            if(token){
                console.log('token found');
                TokenServices.settokenVerifier(token);
                dispatch({type:GET_USER_REQUEST})
                let dataUrl:string = `${SERVER_URL}/api/v1/users/`;
                let response = await axios.get(dataUrl);
                dispatch({type:GET_USER_SUCCESS, payload: response.data.user})
            }
            else{
                console.log('no token found');
            }           
            
        }
        catch(error){
            dispatch({type: GET_USER_FAILURE, payload: {error:error.message}})
        }
    }
} 

export const createuserAddress = (address:Address, history:any)=> {
    return async (dispatch:any) =>{
        try{ 
            //do the token verifiation
            let token = UserService.getTokenkey();
            if(token){
                console.log('token found');
                TokenServices.settokenVerifier(token);
                dispatch({type:CREATE_USER_ADDRESS_REQUEST})
                let dataUrl:string = `${SERVER_URL}/api/v1/users/address`;
                let response = await axios.post(dataUrl,address);
                dispatch({type:CREATE_USER_ADDRESS_SUCCESS, payload: response.data.user})
                dispatch(alertActions.showAlert('bg-primary', 'Address updated Successfully', 'fa-check-circle'));
                history.push('/users/profile');
            }
            else{
                console.log('no token found');
            }  
        }
        catch(error){
            dispatch({type: CREATE_USER_ADDRESS_FAILURE, payload: {error:error.message}})
            dispatch(alertActions.showAlert('bg-danger', 'Error, Address updation failed, Please try again with correct info.', 'fa-exclamation-circle'));
        }
    }
}

//update user Data
export const updateUserData = (profilePic:any, history:any)=> {
    return async (dispatch:any) =>{
        try{ 
            //do the token verifiation
            let token = UserService.getTokenkey();
            if(token){
                console.log('token found');
                TokenServices.settokenVerifier(token);
                dispatch({type:UPDATE_USER_DATA_REQUEST})
                let dataUrl:string = `${SERVER_URL}/api/v1/users/userData`;
                let response = await axios.post(dataUrl,profilePic);
                dispatch({type:UPDATE_USER_DATA_SUCCESS, payload: response.data.user})
                dispatch(alertActions.showAlert('bg-primary', 'User details updated successfully', 'fa-check-circle'));
                history.push('/users/profile');
            }
            else{
                console.log('no token found');
            }  
        }
        catch(error){
            dispatch({type: UPDATE_USER_DATA_FAILURE, payload: {error:error.message}})
            dispatch(alertActions.showAlert('bg-danger', `Something went wrong! couldn't update the profile pic, Please try again.`, 'fa-exclamation-circle'));
        }
    }
}