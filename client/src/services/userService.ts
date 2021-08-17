export class UserService{

    private static tokenKey:string | undefined= process.env.REACT_APP_TOKEN_KEY;

    public static setTokenkey:any = (token:string) =>{
        if(token && UserService.tokenKey){
            sessionStorage.setItem(UserService.tokenKey , token);
        }
    }

    public static getTokenkey :any = ()  =>{
        return UserService.tokenKey && sessionStorage.getItem(UserService.tokenKey); 
    }

    public static isLoggedin () {
        return UserService.tokenKey && sessionStorage.getItem(UserService.tokenKey); 
    }


    public static removeTokenkey = () =>{
        if (UserService.tokenKey){
            sessionStorage.removeItem(UserService.tokenKey); 
        }        
    }
}