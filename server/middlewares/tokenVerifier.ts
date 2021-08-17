import express from 'express';
import jwt from 'jsonwebtoken';

const tokenVerifier = (request:express.Request , response : express.Response , next : express.NextFunction) => {
    let token = request.headers['x-auth-token'];
    if(!token){
        return response.status(401).json({errors : [{msg : 'No Token Provided! Access Denied'}]});
    }
    try{
        let secretKey = process.env.JWT_SECRET_KEY;
        if(secretKey) {
            let decode: any = jwt.verify(token.toString() , secretKey);
            request.headers['user'] = decode.user;
            next();
        }
    }
    catch (error){
        return response.status(401).json({errors : [{msg : 'Invalid Token! Access Denied'}]});
    }
};
export default tokenVerifier;