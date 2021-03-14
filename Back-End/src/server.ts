import express from 'express';
import morgan from 'morgan';
import bodyParser from 'body-parser';
import cors from 'cors';
import routes from './routes';

const app = express();
const port = 8000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(morgan(':status :method :url  - :response-time ms'));
app.use(cors());

app.use('/', routes);

app.listen(port, () => {
  console.log(`Listening on port: ${port}`);
});
