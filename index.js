import express from 'express';
import bodyParser from 'body-parser';
import userRoutes from './routes/userRouter.js';

const app = express();
const port = 3000;

app.use(bodyParser.json());

app.use('/user', userRoutes); // CRUD Users

app.listen(port, () => {
  console.log(`Server is listening at http://localhost:${port}`);
});