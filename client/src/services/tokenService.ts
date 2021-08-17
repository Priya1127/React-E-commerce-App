import axios from "axios";

export class TokenServices{

    //set headers value for [x-auth-token] while sending request to the server
    public static settokenVerifier = (token:string) =>{
        if(token){
            axios.defaults.headers['x-auth-token'] = token;
        }
        else{
            delete axios.defaults.headers['x-auth-token'];
        }
    }

    //set headers value for [Authorization] while sending request to the server
    public static setStripeApiKey (){
            axios.defaults.headers.common['Authorization'] = `Bearer ${process.env.REACT_APP_STRIPE_KEY}`;
    }
}