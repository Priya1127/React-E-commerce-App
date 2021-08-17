import {combineReducers} from 'redux';
import * as productReducer from './products/product.reducer';
import * as orderReducer from './orders/order.reducer';
import * as userReducer from './users/user.reducer';
import * as alertReducer from './Alert/alert.reducer';

export const rootReducer = combineReducers({
    productKey : productReducer.reducer,
    orderKey : orderReducer.reducer,
    userKey : userReducer.reducer,
    alertKey : alertReducer.reducer
});