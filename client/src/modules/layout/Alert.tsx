import React from 'react';
import { useSelector } from 'react-redux';
import * as alertReducer from '../../redux/Alert/alert.reducer';

interface IProps{}
interface IAlertState{
    alertKey : alertReducer.alertState;
}

let Alert:React.FC<IProps> = ({}) => {

    let alertStore: alertReducer.alertState = useSelector((store:IAlertState)=>{
        return store.alertKey;
    })
	let {alerts} = alertStore;

    return(
        <React.Fragment>
            {
              alerts && alerts.length>0 && alerts.map(alert=>{
                    return(
                        <div key={alert.id}
                            className ={`alert text-white d-flex align-items-center alert-dismissible animate__animated animate__slideInUp fixed-bottom ${alert.color}`} role='alert'>
                            <i className={`fa ${alert.alertType}`}></i>
                            <div>
                                &nbsp; {alert.msg} !!
                            </div>
                            <button type="button" className="btn-close text-white" data-bs-dismiss="alert" aria-label="Close"/>
                        </div>
                    )

                })
            }
            
        </React.Fragment>
    )
};
export default Alert;