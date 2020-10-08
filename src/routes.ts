import express from 'express';
import UsersController from './controllers/UsersController';

const routes = express.Router();
const userController = new UsersController();

//Main route
routes.get('/',(req,res)=>{
    res.send('Hello from route');
});



//Creates new user
routes.post('/users',userController.create);




export default routes;