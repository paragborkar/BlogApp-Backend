import express from 'express';
import mongoose from 'mongoose';
import blogRouter from './routes/blog-routes.js';
import router from './routes/user-routes.js';
import cors from 'cors';
import dotenv from 'dotenv';
// import https from 'https';

dotenv.config();

const app=express();
app.use(cors());
app.use(express.json());
app.use('/api/user',router);
app.use('/api/blog' ,blogRouter);

app.get('/api/health', (req, res) => {
    res.status(200).json({ status: 'ok', message: 'Backend is active' });
});

mongoose.connect(`mongodb+srv://${process.env.MONGOUSERNAME}:${process.env.MONGOPASS}@cluster0.elmkicy.mongodb.net/?retryWrites=true&w=majority`,{
    useNewUrlParser : true
},(err)=>{
    if(err)
    {
        console.log(err);
    }
    else{
        console.log("Connection Successfull");
    }
});

app.listen(5000,()=>{
    console.log("listening on port 5000");

    // Periodically ping the backend to prevent Render's free tier from sleeping
    // setInterval(() => {
    //     https.get('https://mern-blogapp-backend.onrender.com/api/health', (res) => {
    //         console.log('Keep-alive ping sent. Status:', res.statusCode);
    //     }).on('error', (err) => {
    //         console.error('Error in keep-alive ping:', err.message);
    //     });
    // }, 300000); // Ping every 5 minutes (300,000 ms)
});
