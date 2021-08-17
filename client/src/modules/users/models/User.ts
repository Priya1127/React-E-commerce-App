export interface Address{
    _id? : string;
    flat ? : string;
    street ? : string;
    landmark ? : string;
    city ? : string;
    state ? : string;
    country ? : string;
    pin ? : string;
    phone ? : string
}

export interface User{
    _id? : string;
    name? : string;
    email? : string;
    password? : string;
    avatar? : string;
    isAdmin? : boolean;
    createdAt ? : string;
    updatedAt ? : string;
    address? : Address
}