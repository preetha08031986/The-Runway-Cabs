import express from 'express'
import dotenv from 'dotenv'
dotenv.config();
import cors from 'cors';
import { notFound, errorHandler } from './middleware/errorMiddleware.js';
import connectDB from './confg/db.js';
import router from './routes/auth-routes.js'
import driverrouter from './routes/driver-routes.js';
import adminrouter from './routes/admin.js';

import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';
const port = process.env.PORT || 5001;

connectDB();  
 
const app = express(); 
app.use(cors()); 
app.use(express.json());   
app.use(cookieParser()); 
app.use(bodyParser.urlencoded({ extended: true, limit: '1mb' }));
app.use(express.urlencoded({ extended: true, limit: '1mb'}));

app.use('/api/users', router) 
app.use('/api/driver', driverrouter)
app.use('/api/admin',adminrouter)
app.get('/',(req,res)=> res.status(200).send("Server is ready"))
//  app.get('/admin',(req,res)=> res.status(200).send("Admin Server is ready"))


app.use(notFound);
app.use(errorHandler);

app.listen(port, () => console.log(`server is listening to port  ${port}`))