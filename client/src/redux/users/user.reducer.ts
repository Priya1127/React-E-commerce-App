 import { response } from 'express';
import { User } from '../../modules/users/models/User';
import { UserService } from '../../services/userService';
import * as userActions from './user.actions';

export interface userState{
    user : User;
    loading : boolean;
    errorMessage : string;
    token : string;
    isAuthentiated: boolean;
}
let initialState:userState = {
    user : {} as User,
    loading : false,
    errorMessage : '',
    token : '',
    isAuthentiated: false    
};

export const reducer = (state = initialState , action : any): userState => {
    switch(action.type){
        case userActions.REGISTER_USER_REQUEST:
            return{
                ...state,
                loading:true
            }
        case userActions.REGISTER_USER_SUCCESS:
            return{
                ...state,
                loading:false
            }
        case userActions.REGISTER_USER_FAILURE:
            return{
                ...state,
                loading:false,
                errorMessage: action.payload.error
            }
        //user Login
        case userActions.LOGIN_USER_REQUEST:
            return{
                ...state,
                loading:true
            }
        case userActions.LOGIN_USER_SUCCESS:
            UserService.setTokenkey(action.payload);
            return{
                ...state,
                loading:false,
                token: action.payload,
                isAuthentiated:true
            }
        case userActions.LOGIN_USER_FAILURE:
            return{
                ...state,
                loading:false,
                token: '',
                isAuthentiated:false,
                errorMessage: action.payload.error
            }
        //get user info
        case userActions.GET_USER_REQUEST:
            return state

        case userActions.GET_USER_SUCCESS:            
            return{
                ...state,
                user : action.payload,
                isAuthentiated:true
            }
        case userActions.GET_USER_FAILURE:
            return{
                ...state,
                user: {} as User,
                token: '',
                isAuthentiated:false,
                errorMessage: action.payload.error
            }

        //create user Address
        case userActions.CREATE_USER_ADDRESS_REQUEST:
            return {
                ...state,
                loading:true
            }
        case userActions.CREATE_USER_ADDRESS_SUCCESS:            
            return{
                ...state,
                user : action.payload,
                isAuthentiated:true
            }
        case userActions.CREATE_USER_ADDRESS_FAILURE:
            return{
                ...state,
                errorMessage: action.payload.error
            }

         //update user data
         case userActions.UPDATE_USER_DATA_REQUEST:
            return {
                ...state,
                loading:true
            }
        case userActions.UPDATE_USER_DATA_SUCCESS:            
            return{
                ...state,
                user : action.payload,
                isAuthentiated:true
            }
        case userActions.UPDATE_USER_DATA_FAILURE:
            return{
                ...state,
                errorMessage: action.payload.error
            }

        //logout user
        case userActions.LOGOUT_USER:
            UserService.removeTokenkey();
            return{
                ...state,
                user: {} as User,
                loading:false,
                token: '',
                isAuthentiated:false
            }

        default:
            return state
    }
};













