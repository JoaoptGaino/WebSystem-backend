import express from 'express';
import cors from 'cors';
import routes from './routes';
const app = express();


//Using cors so that the api will run on all services
app.use(cors());
//Using JSON so we can parse everything as a JSON API
app.use(express.json());

//This call the routes to our server
app.use(routes);


//This listen to the port 3333
app.listen(3333);