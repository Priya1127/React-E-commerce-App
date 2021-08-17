 import React , {useState} from 'react';
// import * as userActions from '../../redux/users/user.actions';
// import * as userReducer from '../../redux/users/user.reducer';
// import {useDispatch, useSelector} from "react-redux";
// import { useHistory } from "react-router";

// interface IProps{}
// interface IUserState{
//     userKey : userReducer.userState
// }


// let ProfilePic:React.FC<IProps> = ({}) => {
//     let dispatch=useDispatch();
//     let history = useHistory();

//     let userStore:userReducer.userState = useSelector((store:IUserState) =>{
//         return store.userKey;
//     }) 

//     let {user, isAuthentiated} = userStore;

//     let [state , setState] = useState({
//             profileImg: !user.profilePic? user.avatar : user.profilePic
//         }
//     );

//     let updateImage = async (event:React.ChangeEvent<HTMLInputElement | any>) => {
//         let imageFile:Blob = event.target.files[0];
//         let base64Image:string | ArrayBuffer = await convertBase64String(imageFile);
//         setState(           
//             {   ...state,
//                 profileImg:  base64Image.toString()
//             }
//         );
//     };

//     let convertBase64String = (imageFile:Blob):Promise<string | ArrayBuffer> => {
//         return new Promise((resolve, reject) => {
//             let fileReader = new FileReader();
//             fileReader.readAsDataURL(imageFile);
//             fileReader.addEventListener('load', () => {
//                 if(fileReader.result){
//                     resolve(fileReader.result);
//                 }
//                 else {
//                     reject('Error Occurred');
//                 }
//             })
//         });
//     };

//     let updateProfilepic = (event : React.FormEvent<HTMLFormElement>) => {
//         event.preventDefault();
//         dispatch(userActions.updateProfilepic(state.profileImg, history));
//     };

//     return(
//         <React.Fragment>            
//             <section className="mt-3">
//                 <div className="container">
//                     <div className="row">
//                         <div className="col">
//                             <p className="h3 text-success">Upload a profile picture here</p>
//                             <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. At autem blanditiis commodi consequatur corporis distinctio dolores doloribus enim, error harum, labore natus necessitatibus neque quae, rem ullam unde vel voluptas?</p>
//                         </div>
//                     </div>
//                 </div>
//             </section>
//             <section>
//                 <div className="container">
//                     <div className="row">
//                         <div className="col-md-4 text-center">
//                         {
//                             user.profilePic? <img src = {user.profilePic} alt='' className='rounded-circle' width={220} height={220}/>: 
//                             <img src= {user.avatar} alt='' className='rounded-circle' width={220} height={220}/>
//                         }  
//                             {/* <img src= {user.avatar} alt='' className='rounded-circle' width={220} height={220}/>  */}
//                             <form onSubmit={updateProfilepic}>                                    
//                                 <input 
//                                     type='file'
//                                     name = 'profileImg'
//                                     onChange={updateImage}
//                                     className='btn btn-secondary btn-sm text-center form-control mt-3'
//                                     id="formFile">
//                                 </input>
//                                 <button className='btn btn-sm btn-success'>Update Profile Pic</button>
//                             </form>
//                         </div>
//                     </div>
//                 </div>
//             </section>
//         </React.Fragment>
//     )
// };
// export default ProfilePic;