import express from 'express';
import { body, validationResult } from 'express-validator';
import bcrypt from 'bcryptjs';
import gravatar from 'gravatar';
import jwt from 'jsonwebtoken';
import {UserTable} from "../database/schemas/UserSchema";
import {UserModel} from "../database/models/UserModel";
import tokenVerifier from "../middlewares/tokenVerifier";

const userRouter:express.Router = express.Router();

/*
   @usage : Register a User
   @url : /api/v1/users/register
   @fields : name , email , password
   @method : POST
   @access : PUBLIC
 */
userRouter.post('/register', [
    body('name').not().isEmpty().withMessage('Name is Required'),
    body('email').not().isEmpty().withMessage('Email is Required'),
    body('password').not().isEmpty().withMessage('Password is Required'),
],async (request : express.Request , response : express.Response) => {
    // Finds the validation errors in this request and wraps them in an object with handy functions
    const errors = validationResult(request);
    if (!errors.isEmpty()) {
        return response.status(400).json({ errors: errors.array() });
    }
    try {
        let {name , email , password} = request.body;

        // check if the user exists
        let user = await UserTable.findOne({email : email});
        if(user){
            return response.status(401).json({ errors: [{msg : 'This user already exists'}]});
        }

        // encode the password
        let salt = await bcrypt.genSalt(10);
        let hashPassword = await bcrypt.hash(password , salt);

        //get avatar url
        let avatar = await gravatar.url(email , {
            s : '300',
            r : 'pg',
            d : 'mm'
        })

        // create a user
        user = new UserTable({
            name : name,
            email : email,
            password : hashPassword,
            avatar : avatar
        });
        user = await user.save(); // save to DB
        response.json({
            msg : 'user is created'
        });
    }
    catch (error){
        console.error(error);
        response.status(500).json({ errors: [{msg : 'Server Error'}]});
    }
});

/*
   @usage : Login a User
   @url : /api/v1/users/login
   @fields : email , password
   @method : POST
   @access : PUBLIC
 */
userRouter.post('/login',[
    body('email').not().isEmpty().withMessage('Email is Required'),
    body('password').not().isEmpty().withMessage('Password is Required'),
], async (request : express.Request , response : express.Response) => {
    // Finds the validation errors in this request and wraps them in an object with handy functions
    const errors = validationResult(request);
    if (!errors.isEmpty()) {
        return response.status(400).json({ errors: errors.array() });
    }
    try {
        let {email , password} = request.body;

        // check email
        let user:UserModel = await UserTable.findOne({email : email});
        if(!user){
            return response.status(401).json({ errors: [{msg : 'Invalid Credentials'}]});
        }

        // check the password
        let isMatch = await bcrypt.compare(password , user.password);
        if(!isMatch){
            return response.status(401).json({ errors: [{msg : 'Invalid Credentials'}]});
        }

        // token
        let payload = {
            user : {
               id : user._id,
               email : user.email
            }
        }
        let secretKey = process.env.JWT_SECRET_KEY;
        if(secretKey){
            let token = await jwt.sign(payload , secretKey);
            return response.status(200).json({
                msg : 'Login is successful',
                token : token
            });
        }
    }
    catch (error){
        console.error(error);
        response.status(500).json({ errors: [{msg : 'Server Error'}]});
    }
});

/*
   @usage : Get User Info
   @url : /api/v1/users/
   @fields : no-fields
   @method : GET
   @access : PRIVATE
 */
userRouter.get('/', tokenVerifier, async (request : express.Request , response : express.Response) => {
    try {
        let userObj:any  = request.headers['user'];
        let userId = userObj.id;
        if(userId){
            let user = await UserTable.findById(userId).select('-password');
            return response.status(200).json({
               user : user
            });
        }
        return response.status(400).json({errors : [{msg : 'No User Found'}]});
    }
    catch (error){
        console.error(error);
        response.status(500).json({ errors: [{msg : 'Server Error'}]});
    }
});

/*
   @usage : Create / Update Address
   @url : /api/v1/users/address
   @fields : flat , street , landmark , city , state , country , pin , phone
   @method : POST
   @access : PRIVATE
 */
userRouter.post('/address',  [
    body('flat').not().isEmpty().withMessage('Flat is Required'),
    body('street').not().isEmpty().withMessage('Street is Required'),
    body('landmark').not().isEmpty().withMessage('Landmark is Required'),
    body('city').not().isEmpty().withMessage('City is Required'),
    body('state').not().isEmpty().withMessage('State is Required'),
    body('country').not().isEmpty().withMessage('Country is Required'),
    body('pin').not().isEmpty().withMessage('Pin is Required'),
    body('phone').not().isEmpty().withMessage('Phone is Required'),
], tokenVerifier, async (request : express.Request , response : express.Response) => {
    // Finds the validation errors in this request and wraps them in an object with handy functions
    const errors = validationResult(request);
    if (!errors.isEmpty()) {
        return response.status(400).json({ errors: errors.array() });
    }
    try {
        let {flat , street , landmark , city , state , country , pin , phone} = request.body;
        let userObj:any  = request.headers['user'];
        let userId = userObj.id;
        if(userId){
            let user = await UserTable.findById(userId);
            user.address = {flat , street , landmark , city , state , country , pin , phone};
            user = await user.save(); // save to db
            return response.status(200).json({
                msg : 'Address is Updated',
                user : user
            });
        }
        return response.status(400).json({errors : [{msg : 'No user Found'}]});
    }
    catch (error){
        console.error(error);
        response.status(500).json({ errors: [{msg : 'Server Error'}]});
    }
});

/*
   @usage : Create / Update Address
   @url : /api/v1/users/address
   @fields : flat , street , landmark , city , state , country , pin , phone
   @method : POST
   @access : PRIVATE
 */
   userRouter.post('/userData',  [
    body('name').not().isEmpty().withMessage('Name is Required'),
    body('email').not().isEmpty().withMessage('Email is Required'),
    body('avatar').not().isEmpty().withMessage('Avatar is Required')
], tokenVerifier, async (request : express.Request , response : express.Response) => {
    // Finds the validation errors in this request and wraps them in an object with handy functions
    const errors = validationResult(request);
    if (!errors.isEmpty()) {
        return response.status(400).json({ errors: errors.array() });
    }
    try {
        let {name , email , avatar} = request.body;
        let userObj:any  = request.headers['user'];
        let userId = userObj.id;
        if(userId){
            let user = await UserTable.findById(userId);
            user.name = name ,
            user.email= email , 
            user.avatar = avatar;
            user = await user.save(); // save to db
            return response.status(200).json({
                msg : 'User data is Updated',
                user : user
            });
        }
        return response.status(400).json({errors : [{msg : 'No user Found'}]});
    }
    catch (error){
        console.error(error);
        response.status(500).json({ errors: [{msg : 'Server Error'}]});
    }
});

export default userRouter;