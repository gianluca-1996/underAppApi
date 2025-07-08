import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import mainRouter from './routes/main.router.js';
import dotenv from 'dotenv';
dotenv.config();

import conectMongodb from './config/mongodb.config.js';

const app = express();
const port = process.env.PORT;
app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(cors());
app.use(bodyParser.json());
app.use(mainRouter);
conectMongodb();

app.listen(port, () => console.log(`Servidor escuchando en ${port}`));