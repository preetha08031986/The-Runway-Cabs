import express from 'express';
import cors from 'cors';
import proxy from 'express-http-proxy';

const app = express();
app.use(cors())
app.use(express.json())


 //app.use('/user',proxy('http://localhost:5002'))
app.use('/',proxy('http://localhost:5001'))
app.listen(5000,() => {
    console.log("Products is listening to port 5000");
})