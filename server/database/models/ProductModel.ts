import {Document} from 'mongoose';


export interface ProductModel extends Document{
    _id? : string;
    name? : string;
    brand? : string;
    size? : string;
    price? : number;
    qty? : number;
    image? : string;
    category? : string;
    description? : string;
    usage? : string;
    createdAt ? : string;
    updatedAt ? : string;
}