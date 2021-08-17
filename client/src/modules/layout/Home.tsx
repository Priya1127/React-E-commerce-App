import React from 'react';
import {NavLink} from "react-router-dom";
import { UserService } from '../../services/userService';

interface IProps{}
interface IState{}

let Home:React.FC<IProps> = ({}) => {
    return(
        <React.Fragment>
            <div className="landing-page">
                <div className="wrapper">
                    <div className="d-flex flex-column justify-content-center align-items-center text-center h-100">
                        <h2 className="display-2">Online Shopping</h2>
                        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aspernatur beatae esse quas soluta suscipit. Aspernatur consequatur cumque, debitis doloribus, eos esse maxime minus nostrum numquam quaerat rerum saepe vitae, voluptatem.</p>
                        { 
                        !UserService.isLoggedin() ? 
                        <React.Fragment>
                            <div>
                                <NavLink to={'/users/login'} className="btn btn-success btn-sm">Login</NavLink>
                                <NavLink to={'/users/register'} className="btn btn-secondary btn-sm">Register</NavLink>                                
                            </div>
                                <NavLink to ={'/contact'} className='btn btn-primary btn-sm'>Contact us</NavLink>
                        </React.Fragment>
                             : 
                            <div>
                                <NavLink to={'/contact'} className="btn btn-success btn-sm">Contact us</NavLink>
                                <NavLink to={'/about'} className="btn btn-secondary btn-sm">About us</NavLink> 
                        </div>                                                  
                        }
                    </div>
                </div>
            </div>
        </React.Fragment>
    )
};
export default Home;