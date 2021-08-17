import mongoose, {Schema, Model} from 'mongoose';
import {OrderModel} from "../models/OrderModel";

const orderSchema:Schema = new mongoose.Schema({
    name : {type : String , required : true},
    email : {type : String , required : true},
    phone : {type : Number , required : true},
    items : [
        {
            name : {type : String},
            brand : {type : String},
            price : {type : Number},
            qty : {type : Number}
        }
    ],
    tax : {type : Number , required : true},
    total : {type : Number , required : true}
}, {timestamps : true});

export const OrderTable:Model<OrderModel> = mongoose.model('order', orderSchema);










