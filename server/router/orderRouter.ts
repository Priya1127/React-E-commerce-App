import express from 'express';
import {OrderModel} from "../database/models/OrderModel";
import {OrderTable} from "../database/schemas/OrderSchema";
import tokenVerifier from "../middlewares/tokenVerifier";
import {body ,validationResult} from 'express-validator';
import {UserTable} from "../database/schemas/UserSchema";

const orderRouter:express.Router = express.Router();

/*
   @usage : Place an order
   @url : /api/v1/orders/place
   @fields : items , tax , total
   @method : POST
   @access : PRIVATE
 */
orderRouter.post('/place', [
    body('items').not().isEmpty().withMessage('Items is Required'),
    body('tax').not().isEmpty().withMessage('Tax is Required'),
    body('total').not().isEmpty().withMessage('Total is Required'),
] , tokenVerifier, async (request : express.Request , response : express.Response) => {
    // Finds the validation errors in this request and wraps them in an object with handy functions
    const errors = validationResult(request);
    if (!errors.isEmpty()) {
        return response.status(400).json({ errors: errors.array() });
    }
    try {
        let {items , tax , total} = request.body;
        let userObj:any  = request.headers['user'];
        let userId = userObj.id;
        if(userId) {
            let user = await UserTable.findById(userId).select('name email address');
            let order = new OrderTable({
                name : user.name,
                email : user.email,
                phone : user.address.phone,
                items : items,
                tax : tax,
                total : total
            });
            order = await order.save(); // save to db
            response.status(200).json({
                msg : 'Order is Placed',
                order : order
            });
        }
    }
    catch (error){
        console.error(error);
        response.status(500).json({ errors: [{msg : 'Server Error'}]});
    }
});

/*
   @usage : Get All Orders
   @url : /api/v1/orders/
   @fields : no-fields
   @method : GET
   @access : PRIVATE
 */
orderRouter.get('/orderList', tokenVerifier, async (request : express.Request, response: express.Response) => {
    try {
        let userObj:any  = request.headers['user'];
        let userId = userObj.id;
        if(userId) {
            let user = await UserTable.findById(userId).select('email');
            let orders = await OrderTable.find({email : user.email});
            return response.status(200).json({
                orders : orders
            });
        }
    }
    catch (error){
        console.error(error);
        response.status(500).json({ errors: [{msg : 'Server Error'}]});
    }
})

export default orderRouter;