// import express from 'express'
// import dotenv from 'dotenv'
// dotenv.config();
// import cors from 'cors';
// import { notFound, errorHandler } from './middleware/errorMiddleware.js';
// import connectDB from './config/db.js';
// import router from  './routes/admin-routes.js'
// import cookieParser from 'cookie-parser';
// import bodyparser from 'body-parser'
// const port = process.env.PORT || 5001;

// connectDB();  
 
// const app = express(); 
// app.use(cors()); 
// app.use(express.json());   
// app.use(cookieParser()); 
// app.use(bodyparser.urlencoded({ extended: true, limit: '1mb'}));


// app.use('/api/admin', router)
//  app.get('/',(req,res)=> res.status(200).send("Server is ready"))



// app.use(notFound);
// app.use(errorHandler);

// app.listen(port, () => console.log(`server is listening to port  ${port}`))