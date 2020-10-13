import express from 'express';
import ProductsController from './controllers/ProductsController';
import UsersController from './controllers/UsersController';

const routes = express.Router();
const userController = new UsersController();
const productsController = new ProductsController();
//Main route
routes.get('/', (req, res) => {
    res.send('Hello from route');
});

//Produtos
routes.get('/products',productsController.index);
routes.get('/products/:id',productsController.unique);
routes.post('/products',productsController.create);
routes.delete('/products/:id',productsController.delete);



//Usuarios
routes.post('/users', userController.create);//Creates new user
routes.get('/users', userController.index);//Show all users
routes.post('/users/auth', userController.login);//Login
routes.delete('/users/:id', userController.delete);//Deletes a user
routes.put('/users/:id', userController.update);//Update user
routes.get('/howmany',userController.howMany);




export default routes;