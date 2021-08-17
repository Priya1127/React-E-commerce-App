import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import dotEnv from 'dotenv';
import userRouter from "./router/userRouter";
import productRouter from "./router/productRouter";
import paymentRouter from "./router/paymentRouter";
import orderRouter from "./router/orderRouter";

const app:express.Application = express();

dotEnv.config({path : './.env'})

const port = process.env.PORT || 5000;

// configuration
app.use(cors()); // CORS
app.use(express.json()) // express to receive the form data from client in json

// mongoose configuration
const DB_URL:string | undefined = process.env.MONGO_DB_URL;
if(DB_URL){
    mongoose.connect(DB_URL, {
        useUnifiedTopology : true,
        useNewUrlParser : true
    }).then((response) => {
        console.log('Connected to MongoDB Successfully.........')        
    }).catch((error) => {
        console.error('Connected to MongoDB Failed : Stopped the Server');
        process.exit(1); // stop the node js process
    });
}

app.get('/', (request : express.Request , response : express.Response) => {
    response.json({
        msg : 'Welcome to Express Server'
    });
});

// configure the routers
app.use('/api/v1/users', userRouter);
app.use('/api/v1/products', productRouter);
app.use('/api/v1/orders', orderRouter);
app.use('/api/v1/payments', paymentRouter);

app.listen(port, () => {
    console.log(`Express Server has Started`);
});