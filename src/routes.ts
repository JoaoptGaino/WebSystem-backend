import express from 'express';
import UsersController from './controllers/UsersController';

const routes = express.Router();
const userController = new UsersController();

//Main route
routes.get('/', (req, res) => {
    res.send('Hello from route');
});




routes.post('/users', userController.create);//Creates new user
routes.get('/users', userController.index);//Show all users
routes.delete('/users/:id', userController.delete);//Deletes a user
routes.put('/users/:id', userController.update);//Update user




export default routes;