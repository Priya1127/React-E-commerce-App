import express from 'express';
import tokenVerifier from '../middlewares/tokenVerifier';
import cors from "cors";
import {v4} from "uuid";

interface PaymentBody{
    product: {
        name?: string;
        amount?: number;
        currency?: string;
    },
    customer: {
        name?: string;			   
        address? : {
            line1?: string;
            postal_code?: string;
            city?: string;
            state?: string;
            country?: string;
            };
    },
    description?: string;
    email? : string;
    source?: string;
    stripetokenType?:string;
}
// const secretKey = process.env.STRIPE_SECRET_KEY;
// const stripe = Stripe(secretKey);
console.log(process.env.STRIPE_SECRET_KEY);
const paymentRouter:express.Router = express.Router();
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

/*
   @usage : checkout payment
   @url : /api/v1/payments/checkout
   @fields : paymentBody
   @method : post
   @access : PRIVATE
 */

paymentRouter.post('/checkout', tokenVerifier, cors(), async (request : express.Request , response : express.Response) => {
    try{
        console.log(request.body);
        let userObj:any = request.headers['user'];
        let userId = userObj.id;
        const paymentBody:PaymentBody = request.body;
        const newCustomer = await stripe.customers.create(
            {
                name : paymentBody.customer.name,
                address : {
                    line1: paymentBody.customer.address.line1,
                    postal_code: paymentBody.customer.address.postal_code,
                    city: paymentBody.customer.address.city,
                    state: paymentBody.customer.address.state,
                    country: paymentBody.customer.address.country
                    },
            description : paymentBody.description,
            email : paymentBody.email,
            source: paymentBody.source,
            metadata: {
                userId: userId,
                },
            });

        if(paymentBody.stripetokenType==='card'){
            const idempotencyKey = v4();
            const paymentCharge = await stripe.charges.create({
                amount: paymentBody.product.amount,
                currency: paymentBody.product.currency,
                customer : newCustomer.id,										  
                description: paymentBody.description                
            }, {idempotencyKey});
        }
        else{
            throw Error(`Unrecognized Stripe token type: "${paymentBody.stripetokenType}"`);
        }
		response.status(200).json({msg : 'payment is successful', customer: newCustomer.id});	
    }
    catch(error){
        console.error(error);
		response.status(400).json({errors : [{msg : error.message}]});															  
    }
});

export default paymentRouter;