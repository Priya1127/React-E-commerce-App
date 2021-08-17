import mongoose, {Schema, Model} from 'mongoose';
import {UserModel} from '../models/UserModel';

const userSchema = new mongoose.Schema({
    name : {type : String , required : true},
    email : {type : String , required : true , unique : true},
    password : {type : String , required : true},
    avatar : {type : String , required : true},
    isAdmin : {type : Boolean , default : false},
    address : {
        flat : {type : String},
        street : {type : String},
        landmark : {type : String},
        city : {type : String},
        state : {type : String},
        country : {type : String},
        pin : {type : String},
        phone : {type : String}
    },
}, {timestamps : true});

export const UserTable:Model<UserModel> = mongoose.model('user', userSchema);










