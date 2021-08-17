import React, { ReactFragment, useEffect, useState } from 'react';
import { useDispatch, useSelector, useStore } from 'react-redux';
import * as userActions from '../../redux/users/user.actions';
import * as userReducer from '../../redux/users/user.reducer';
import { User } from './models/User';
import { useHistory } from "react-router";
import { NavLink } from 'react-router-dom';

interface IProps{}
interface IState{
    userKey:userReducer.userState
}

let UpdateUserDetails:React.FC<IProps> = ({}) => {
    let dispatch = useDispatch();
    let history = useHistory();

    let [stateUser, setUserState] = useState<User>({       
        name : '',
        email : '',
        //password : '',
        avatar : ''
    })

    let userDetails =(event:React.ChangeEvent<HTMLInputElement>)=>{
        setUserState({
                ...stateUser,
                [event.target.name] : event.target.value
            }
        )
    }

    let updateImage = async (event:React.ChangeEvent<HTMLInputElement | any>) => {
        let imageFile:Blob = event.target.files[0];
        let base64Image:string | ArrayBuffer = await convertBase64String(imageFile);
        setUserState({
            ...stateUser,
            avatar : base64Image.toString()
        }
    )};

    let convertBase64String = (imageFile:Blob):Promise<string | ArrayBuffer> => {
        return new Promise((resolve, reject) => {
            let fileReader = new FileReader();
            fileReader.readAsDataURL(imageFile);
            fileReader.addEventListener('load', () => {
                if(fileReader.result){
                    resolve(fileReader.result);
                }
                else {
                    reject('Error Occurred');
                }
            })
        });
    };

    let userStore:userReducer.userState =useSelector((store:IState)=>{
        return store.userKey
    })

    let {user} = userStore;

    let updateUserData = (event:React.FormEvent<HTMLFormElement>)=>{
        event.preventDefault();
        dispatch(userActions.updateUserData(stateUser,history));
    }

    useEffect(()=>{
        if (user){
            setUserState({
                ...stateUser,
                name : user.name,
                email : user.email,
                avatar : user.avatar
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
                                <p>Update your details</p>
                            </div>
                            <div className="card-body">
                                <form onSubmit={updateUserData}>
                                    <ul className='list-group'>
                                        <input onChange={userDetails}
                                        name='name'
                                        value={stateUser.name}
                                        className='list-group-item' type="text" placeholder='name'/>
                                        <input onChange={userDetails}
                                        name='email'
                                        value={stateUser.email}
                                        className='list-group-item' type="text" placeholder='email'/>
                                        <li className='list-group-item fw-bold d-flex'>choose a profile picture:</li>
                                        <input onChange={updateImage}
                                        name='avatar'
                                        className="list-group-item" type="file" id="formFile"/>
                                        <small className='fa fa-info-circle'>File size should be less than 70 KB.</small> 
                                            {
                                                    stateUser.avatar && stateUser.avatar?.length > 0 ?
                                                        <small className='list-group-item d-flex'>
                                                            <img src={stateUser.avatar} alt={''} width={'40'} height={'50'}/>
                                                        </small>
                                                           : null
                                            }                                 
                                    </ul>
                                    <div className='d-flex'>
                                        <NavLink to={'/users/profile'} className='btn btn-sm btn-secondary'>Back</NavLink>
                                        <button className='btn btn-sm btn-warning'>update</button>
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
export default UpdateUserDetails;