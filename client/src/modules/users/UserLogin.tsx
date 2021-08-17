import React, {useState} from 'react';
import {NavLink, useHistory} from "react-router-dom";
import * as userActions from "../../redux/users/user.actions";
import {useDispatch} from "react-redux";

interface IProps{}
interface IState{}

let UserLogin:React.FC<IProps> = ({}) => {
    let history = useHistory();
    let dispatch = useDispatch();

    let [user , setUser] = useState({
        email : '',
        password : ''
    });

    let [userError , setUserError] = useState({
        emailError : '',
        passwordError : ''
    });

    let validateEmail = (event : React.ChangeEvent<HTMLInputElement>) => {
        setUser({...user , email: event.target.value});
        let regExp = /^\w+([\\.-]?\w+)*@\w+([\\.-]?\w+)*(\.\w{2,3})+$/;
        !regExp.test(event.target.value) ? setUserError({...userError , emailError:  'Enter Valid Email'}) :
            setUserError({...userError , emailError:  ''})
    };

    let validateUserPassword= (event : React.ChangeEvent<HTMLInputElement>) => {
        setUser({...user , password: event.target.value});
        let regExp = /^[a-zA-Z0-9_]\w{6,14}$/;
        !regExp.test(event.target.value) ? setUserError({...userError , passwordError:  'Enter Valid Password'}) :
            setUserError({...userError , passwordError:  ''})
    };

    let submitLogin = (event : React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (user.email.length > 0  && user.password.length > 0 ){
            dispatch(userActions.loginUser(user , history));
        }
       else{
           //alert
           console.log('Enter all the fields')
       }
    };

    return(
        <React.Fragment>
            <section className="mt-3">
                <div className="container">
                    <div className="row">
                        <div className="col">
                            <p className="h3 text-success">Login Here</p>
                            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. At autem blanditiis commodi consequatur corporis distinctio dolores doloribus enim, error harum, labore natus necessitatibus neque quae, rem ullam unde vel voluptas?</p>
                        </div>
                    </div>
                </div>
            </section>
            <section className="mt-3">
                <div className="container">
                    <div className="row">
                        <div className="col-md-4">
                            <form onSubmit = {submitLogin}>
                                <div className="mb-2">
                                <input name='email'
                                 value = {user.email}
                                 onChange = {validateEmail}
                                 type='email' placeholder='email' className={`form-control ${userError.emailError.length  > 0 ? 'is-invalid': '' } `}/>
                                </div>
                                <div className="mb-2">
                                <input  name='password'
                                 value = {user.password}
                                 onChange = {validateUserPassword}
                                type='password' placeholder='password' className={`form-control ${userError.passwordError.length  > 0 ? 'is-invalid': '' } `}/>
                                </div>
                                <div className="mb-2">
                                    <input type="submit" className="btn btn-success btn-sm" value="Login"/>
                                </div>
                                <small>
                                    Don't have an Account ?
                                    <NavLink to={'/users/register'} className="text-success fw-bold"> Register</NavLink>
                                </small>
                            </form>
                        </div>
                    </div>
                </div>
            </section>
        </React.Fragment>
    )
};
export default UserLogin;