import express from 'express';
import {ProductTable} from "../database/schemas/ProductSchema";
import {ProductModel} from "../database/models/ProductModel";
import {body , validationResult} from 'express-validator';
import tokenVerifier from "../middlewares/tokenVerifier";

const productRouter:express.Router = express.Router();

/*
   @usage : Upload / Create a Product
   @url : /api/v1/products/upload
   @fields : name , brand , price , qty , image , category , description , usage
   @method : POST
   @access : PRIVATE
 */
productRouter.post('/upload', tokenVerifier, [
    body('name').not().isEmpty().withMessage('Name is Required'),
    body('price').not().isEmpty().withMessage('Price is Required'),
    body('brand').not().isEmpty().withMessage('Brand is Required'),
    body('size').not().isEmpty().withMessage('Size is Required'),
    body('qty').not().isEmpty().withMessage('Qty is Required'),
    body('image').not().isEmpty().withMessage('Image is Required'),
    body('category').not().isEmpty().withMessage('Category is Required'),
    body('description').not().isEmpty().withMessage('Description is Required')
    // ,body('usage').not().isEmpty().withMessage('Usage is Required'),
],  async (request : express.Request , response : express.Response) => {
    // Finds the validation errors in this request and wraps them in an object with handy functions
    const errors = validationResult(request);
    if (!errors.isEmpty()) {
        return response.status(400).json({ errors: errors.array() });
    }
    try {
        let {name ,brand ,size, price ,qty ,image ,category ,description ,usage} = request.body;
        // check the product is already exists
        let product = await ProductTable.findOne({name : name});
        if(product){
            return response.status(401).json({errors : [{msg : 'This product already exists!'}]})
            }
        product = new ProductTable({name , brand , size, price , qty , image , category , description , usage});
        product = await product.save(); // save to db
        response.status(200).json({
            msg : 'Product is Created',
            product : product
        });
    }
    catch (error){
        console.error(error);
        response.status(500).json({ errors: [{msg : 'Server Error'}]});
    }
});

/*
   @usage : Get Men Products
   @url : /api/v1/products/fashion/men
   @fields : no-fields
   @method : GET
   @access : PUBLIC
 */
productRouter.get('/fashion/men', async (request : express.Request , response : express.Response) => {
    try {
        let products = await ProductTable.find({category : 'MEN_FASHION'});
        if(!products){
            return response.status(401).json({errors : [{msg : 'No Product Found!'}]})
        }
        response.status(200).json({
            products : products
        });
    }
    catch (error){
        console.error(error);
        response.status(500).json({ errors: [{msg : 'Server Error'}]});
    }
});

/*
   @usage : Get Women Products
   @url : /api/v1/products/fashion/women
   @fields : no-fields
   @method : GET
   @access : PUBLIC
 */
productRouter.get('/fashion/women', async (request : express.Request , response : express.Response) => {
    try {
        let products = await ProductTable.find({category : 'WOMEN_FASHION'});
        if(!products){
            return response.status(401).json({errors : [{msg : 'No Product Found!'}]})
        }
        response.status(200).json({
            products : products
        });
    }
    catch (error){
        console.error(error);
        response.status(500).json({ errors: [{msg : 'Server Error'}]});
    }
});

/*
   @usage : Get Kids Products
   @url : /api/v1/products/fashion/kids
   @fields : no-fields
   @method : GET
   @access : PUBLIC
 */
productRouter.get('/fashion/kids', async (request : express.Request , response : express.Response) => {
    try {
        let products = await ProductTable.find({category : 'KIDS_FASHION'});
        if(!products){
            return response.status(401).json({errors : [{msg : 'No Product Found!'}]})
        }
        response.status(200).json({
            products : products
        });
    }
    catch (error){
        console.error(error);
        response.status(500).json({ errors: [{msg : 'Server Error'}]});
    }
});

/*
   @usage : Get a Product
   @url : /api/v1/products/:productId
   @fields : no-fields
   @method : GET
   @access : PUBLIC
 */
productRouter.get('/:productId', async (request : express.Request , response : express.Response) => {
    try {
        let productId = request.params.productId;
        let product = await ProductTable.findById(productId);
        if(!product){
            return response.status(401).json({errors : [{msg : 'No Product Found!'}]})
        }
        response.status(200).json({
            product : product
        });
    }
    catch (error){
        console.error(error);
        if(error.kind === 'ObjectId'){
            return response.status(401).json({errors : [{msg : 'No Product Found!'}]});
        }
        response.status(500).json({ errors: [{msg : 'Server Error'}]});
    }
});

export default productRouter;