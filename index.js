import express from 'express';
import bodyParser from 'body-parser';
import userRouter from './routes/userRouter.js';
import chequeRouter from './routes/chequeRouter.js';

const app = express();
const port = 3000;

app.use(bodyParser.json());

app.use('/user', userRouter); // CRUD Users
app.use('/cheque', chequeRouter);

app.listen(port, () => {
  console.log(`Server is listening at http://localhost:${port}`);
});