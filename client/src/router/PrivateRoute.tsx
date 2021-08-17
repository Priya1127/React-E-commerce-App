import React from "react";
import {Route , Redirect} from 'react-router-dom';
import {UserService} from "../services/userService";

// @ts-ignore
let PrivateRoute = ({component : Component, ...rest}) => {
    return <Route {...rest} render={(props) => {
        return !UserService.getTokenkey() ? <Redirect to="/users/login"/> : <Component {...props}/>
    }}/>
};
export default PrivateRoute;