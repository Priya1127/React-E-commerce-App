import {v4 as uuidv4} from 'uuid';

export const SHOW_ALERT:string = 'SHOW_ALERT';
export const HIDE_ALERT:string = 'HIDE_ALERT';

export const showAlert = (color:string, msg:string, alertType:string)=>{
    let id = uuidv4();
    return (dispatch:any) =>{
        try{            
            dispatch({type:SHOW_ALERT, payload:{
                id: id,
                color: color,
                msg: msg,
                alertType: alertType
            }});
            setTimeout(() => {
                dispatch(hideAlert(id));
            }, 2000); // close the alert after 2 seconds automatically
        }
        catch(error){
            console.error(error);
        }
    }
}

export const hideAlert = (id:string)=>{
    return (dispatch:any) =>{
        try{
            dispatch({type:HIDE_ALERT, payload:{
                id: id
            }})
        }
        catch(error){
            console.error(error);
        }
    }
}