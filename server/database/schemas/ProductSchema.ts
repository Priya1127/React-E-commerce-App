import mongoose, {Schema, Model} from 'mongoose';
import {ProductModel} from "../models/ProductModel";

const productSchema = new mongoose.Schema({
    name : {type : String , required : true , unique : true},
    brand : {type : String , required : true},
    size : {type : String , required : true},
    price : {type : Number , required : true},
    qty : {type : Number , required : true},
    image : {type : String , required : true},
    category : {type : String , required : true},
    description : {type : String , required : true},
    usage : {type : String }
}, {timestamps : true});

export const ProductTable:Model<ProductModel> = mongoose.model('product', productSchema);










