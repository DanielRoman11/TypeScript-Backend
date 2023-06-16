import express, {Express, Request, Response} from  'express';
import dotenv from 'dotenv';
import UserRouter from './routes/user.Routes';
import morgan from 'morgan';
import db from './db/db';
dotenv.config();

const app: Express = express();

//* Conexión a DB
db();

//* Middlewares
app.use(morgan('dev'));
app.use(express.json());


//* Routes
app.use("/api", UserRouter);

export default app;