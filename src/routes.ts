import express from 'express';

const routes = express.Router();


//Main route
routes.get('/',(req,res)=>{
    res.send('Hello from route');
});


routes.get('/products',(req,res)=>{
    res.json({
        message:"Olá"
    })
});




export default routes;