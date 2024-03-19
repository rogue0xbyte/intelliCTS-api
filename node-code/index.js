import express from 'express';
import bodyParser from 'body-parser';
import userRouter from './routes/userRouter.js';
import chequeRouter from './routes/chequeRouter.js';
import swaggerUi from 'swagger-ui-express';
import cors from 'cors';
import swaggerDocument from './swagger.json' assert { type: "json" };



const app = express();
const port = 3000;

app.use(cors({
  origin: '*'
}));

app.use(bodyParser.json());

app.use('/user', userRouter);
app.use('/cheque', chequeRouter);


app.use('/api-docs', swaggerUi.serve);
app.get('/api-docs', swaggerUi.setup(swaggerDocument));

app.listen(port, () => {
  console.log(`Server is listening at http://localhost:${port}`);
});