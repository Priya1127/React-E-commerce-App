export interface Order{
    _id : string;
    name? : string;
    email? : string;
    phone? : number;
    items : [
        {
            name? : string;
            brand? : string;
            size? : string;
            price? : number;
            qty? : number;
        }
    ];
    tax? : number;
    total? : number;
    createdAt  : string;
    updatedAt ? : string;
}