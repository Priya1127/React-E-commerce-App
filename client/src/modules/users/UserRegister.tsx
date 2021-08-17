import React, {useState} from 'react';
import {NavLink, useHistory} from "react-router-dom";
import * as userActions from '../../redux/users/user.actions';
import {useDispatch} from "react-redux";
import { User } from './models/User';

interface IProps{}
interface IState{
    user: User
}

let UserRegister:React.FC<IProps> = ({}) => {
    let history = useHistory();
    let dispatch = useDispatch();

    let [stateUser, setUserstate] = useState({
        user: {} as User
    })

    let [stateError, setErrorstate] = useState({
        usernameError : '',
        emailError: '',
        passwordError : ''
    })

    let usernameValidation = (event:React.ChangeEvent<HTMLInputElement>)=>{
        setUserstate({
            user: {
                ...stateUser.user,
            [event.target.name] : event.target.value
            }            
        })
        let regExp = /^[a-zA-Z0-9_]{5,15}$/;
        !(regExp.test(event.target.value))? setErrorstate({...stateError, usernameError:'Enter a valid username'}):
        setErrorstate({...stateError, usernameError:''})
    }

    let emailValidation = (event:React.ChangeEvent<HTMLInputElement>)=>{
        setUserstate({
            user: {
                ...stateUser.user,
            [event.target.name] : event.target.value
            }            
        })
        let regExp = /^\w+([\\.-]?\w+)*@\w+([\\.-]?\w+)*(\.\w{2,3})+$/;
        !(regExp.test(event.target.value))? setErrorstate({...stateError, emailError:'Enter a valid email'}):
        setErrorstate({...stateError, emailError:''})
    }

    let passwordValidation = (event:React.ChangeEvent<HTMLInputElement>)=>{
        setUserstate({
            user: {
                ...stateUser.user,
            [event.target.name] : event.target.value
            }            
        })
        let regExp = /^[a-zA-Z0-9_]\w{6,14}$/;
        !(regExp.test(event.target.value))? setErrorstate({...stateError, passwordError:'Enter a valid password'}):
        setErrorstate({...stateError, passwordError:''})
    }

    let registerUser = (event:React.FormEvent<HTMLFormElement>) =>{
        event.preventDefault();
        if(Number(stateUser.user.name?.length) > 0 && stateError.usernameError === '' && Number(stateUser.user.email?.length) > 0 && stateError.emailError === '' && Number(stateUser.user.password?.length) > 0 && stateError.passwordError === ''){
            dispatch(userActions.registerUser(stateUser.user,history))
        }
        else{
            //add alert
            console.log('Enter all the fields');
        }
    }

    return(
        <React.Fragment>            
            <section className="mt-3">
                <div className="container">
                    <div className="row">
                        <div className="col">
                            <p className="h3 text-success">Register Here</p>
                            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. At autem blanditiis commodi consequatur corporis distinctio dolores doloribus enim, error harum, labore natus necessitatibus neque quae, rem ullam unde vel voluptas?</p>
                        </div>
                    </div>
                </div>
            </section>
            <section className="mt-3">
                <div className="container">
                    <div className="row">
                        <div className="col-md-4">
                            <form onSubmit = {registerUser}>
                                <div className="mb-2">
                                <input name='name'
                                value = {stateUser.user.name}
                                onChange = {usernameValidation}
                                type='text' placeholder='name' className={`form-control ${stateError.usernameError.length > 0 ? 'is-invalid' : ''} `} />
                                {stateError.usernameError.length > 0 ? <small>{stateError.usernameError}</small> : ''}
                                </div>
                                <div className="mb-2">
                                <input onChange={emailValidation}
                                name = 'email'
                                value = {stateUser.user.email}
                                type='email' placeholder='email' className={`form-control ${stateError.emailError.length > 0 ? 'is-invalid': ''} `}/>
                                {stateError.emailError.length>0 ? <small>{stateError.emailError}</small>: ''}
                                </div>
                                <div className="mb-2">
                                <input onChange={passwordValidation}
                                name = 'password'
                                value = {stateUser.user.password}
                                type='password' placeholder='password' className={`form-control ${stateError.passwordError.length > 0 ? 'is-invalid': ''}`}/>
                                {stateError.passwordError.length > 0 ? <small>invalid password</small>: ''}
                                </div>
                                <div className="mb-2">
                                    <input type="submit" className="btn btn-success btn-sm" value="Register"/>
                                </div>
                                <small>
                                    Already have an Account ?
                                    <NavLink to={'/users/login'} className="text-success fw-bold"> Login</NavLink>
                                </small>
                            </form>
                        </div>
                    </div>
                </div>
            </section>
        </React.Fragment>
    )
};
export default UserRegister;