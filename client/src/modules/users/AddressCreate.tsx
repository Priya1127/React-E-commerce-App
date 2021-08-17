import React, { ReactFragment, useEffect, useState } from 'react';
import { useDispatch, useSelector, useStore } from 'react-redux';
import { createuserAddress } from '../../redux/users/user.actions';
import * as userReducer from '../../redux/users/user.reducer';
import { Address } from './models/User';
import { useHistory } from "react-router";
import * as alertActions from "../../redux/Alert/alert.action";
import { NavLink } from 'react-router-dom';

interface IProps{}
interface IState{
    userKey:userReducer.userState
}

let AddressCreate:React.FC<IProps> = ({}) => {
    let dispatch = useDispatch();
    let history = useHistory();

    let [stateAddress, setAddressState] = useState<Address>({       
        flat : '',
        street : '',
        landmark : '',
        city : '',
        state : '',
        country : '',
        pin : '',
        phone : ''
    })

    let [stateError, setErrorState] = useState({
        pinError : '',
        phoneNoError : ''
    })

    let userAddress =(event:React.ChangeEvent<HTMLInputElement>)=>{
        setAddressState({
                ...stateAddress,
                [event.target.name] : event.target.value
            }
        )
    }

    let validatePhoneNo = (event: React.ChangeEvent<HTMLInputElement>)  =>{
        setAddressState({
            ...stateAddress,
                [event.target.name] : event.target.value
        });
        Number(event.target.value) < 1 ? setErrorState({...stateError, phoneNoError: 'Enter a valid phone number'}) : 
        setErrorState({...stateError, phoneNoError: ''})
    }

    let validatePin = (event: React.ChangeEvent<HTMLInputElement>)  =>{
        setAddressState({
            ...stateAddress,
                [event.target.name] : event.target.value
        });
        Number(event.target.value) < 1 ? setErrorState({...stateError, pinError: 'Enter a valid pincode'}) : 
        setErrorState({...stateError, pinError: ''})
    }


    let userStore:userReducer.userState =useSelector((store:IState)=>{
        return store.userKey
    })

    let {user} = userStore;

    let createAddress = (event:React.FormEvent<HTMLFormElement>)=>{
        event.preventDefault();
        stateError.phoneNoError.length  | stateError.pinError.length ?  dispatch(alertActions.showAlert('bg-danger', 'Enter phone number and pin correctly', 'fa-exclaimation-circle')) //error alert
        : dispatch(createuserAddress(stateAddress,history));        
    }

    useEffect(()=>{
        if (user.address){
            setAddressState({
                ...stateAddress,
                flat : user.address.flat,
                street : user.address.street,
                landmark : user.address.landmark,
                city : user.address.city,
                state : user.address.state,
                country : user.address.country,
                pin : user.address.pin,
                phone : user.address.phone
            })
        } 
    },[])

    return(
        <React.Fragment>
            <section>
                <div className="container">
                    <div className="row">
                        <div className="col-md-6">
                        <div className="card text-center mt-5">
                            <div className="card-header bg-dark text-white text-center">
                                <p>Enter Address Details</p>
                            </div>
                            <div className="card-body">
                                <form onSubmit={createAddress}>
                                    <ul className='list-group'>
                                        <input onChange={userAddress}
                                        name='flat'
                                        value={stateAddress.flat}
                                        className='form-control m-1' type="text" placeholder='flat no.'/>
                                        <input onChange={userAddress}
                                        name='street'
                                        value={stateAddress.street}
                                        className='form-control m-1' type="text" placeholder='street no.'/>
                                        <input onChange={userAddress}
                                        name='landmark'
                                        value={stateAddress.landmark}
                                        className='form-control m-1' type="text" placeholder='landmark'/>
                                        <input onChange={userAddress}
                                        name='city'
                                        value={stateAddress.city}
                                        className='form-control m-1' type="text" placeholder='city'/>
                                        <input onChange={userAddress}
                                        name='state'
                                        value={stateAddress.state}
                                        className='form-control m-1' type="text" placeholder='state'/>
                                        <input onChange={userAddress}
                                        name='country'
                                        value={stateAddress.country}
                                        className='form-control m-1' type="text" placeholder='country'/>
                                        <input onChange={validatePin}
                                        name='pin'
                                        value={stateAddress.pin}
                                        className={`form-control ${stateError.pinError.length > 0 ? 'is-invalid' : ''}`} type="number" placeholder='pin no.'/>
                                        <small className='m-1'>{stateError.pinError}</small>
                                        <input onChange={validatePhoneNo}
                                        name='phone'
                                        value={stateAddress.phone}
                                        className={`form-control ${stateError.phoneNoError.length > 0 ? 'is-invalid' : ''}`} type="number" placeholder='Phone no.'/>                               
                                        <small className='m-1'>{stateError.phoneNoError}</small>
                                    </ul>
                                    <div className='d-flex'>
                                        <NavLink to={'/users/profile'} className='btn btn-sm btn-secondary'>Back</NavLink>
                                        <button className='btn btn-sm btn-warning'>update address</button>
                                    </div>                                    
                                </form>
                            </div>                        
                        </div>
                        </div>
                    </div>
                </div> 
            </section>
        </React.Fragment>
        
        
    )
};
export default AddressCreate;