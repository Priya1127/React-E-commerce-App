import * as alertActions from './alert.action';

export interface alertType {
    id: string;
    color: string;
    msg: string;
    alertType: string;
}

export interface alertState{
    alerts : alertType[]
}

let initialState:alertState = {
    alerts: [] as alertType[]
}

export const reducer = (state = initialState, action:any):alertState =>{
    switch(action.type){
        case alertActions.SHOW_ALERT:
            return {  
                ...state,              
                alerts : [
                    ...state.alerts,
                    {                        
                    id: action.payload.id,
                    color: action.payload.color,
                    msg: action.payload.msg,
                    alertType: action.payload.alertType
                    }]
                }
        case alertActions.HIDE_ALERT:
            let remAlert:alertType[] = state.alerts.filter(alert=>{
                return alert.id !== action.payload.id
            }) 
            return {  
                alerts : [ ...remAlert ]
                };
        default:
            return state;

    }
}