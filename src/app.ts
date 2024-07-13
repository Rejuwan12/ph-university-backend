import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import GlobalHandler from './app/middlewares/globalErrorHandler';
import NotFound from './app/middlewares/notFound';
import router from './app/routes/index';
const app: Application = express();

// parser
app.use(express.json());
app.use(cors());

// application routes

app.use('/api/v1', router);


const test = (req: Request, res: Response) => {
  const a = 10;
  res.send(a);
};

app.get('/',test)


// global error
app.use(GlobalHandler)
// not found
app.use(NotFound)



console.log(process.cwd());
//C:\Level 2.0\MIlestone-2\project-setup.env

export default app;
