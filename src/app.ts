import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import { studentRoutes } from './app/modules/student/student.route';
const app: Application = express();
const port = 3000;

// parser
app.use(express.json());
app.use(cors());

// application routes

app.use('/api/v1/students', studentRoutes);

app.get('/', (req: Request, res: Response) => {
  const a = 10;
  res.send(a);
});

console.log(process.cwd());
//C:\Level 2.0\MIlestone-2\project-setup.env

export default app;
