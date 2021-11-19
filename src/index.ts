import { MongoConnection } from './database/MongoConnection';
import express from 'express';
import { URLController } from './controllers/URLController';


const api = express();
api.use(express.json());

const database = new MongoConnection();
database.connect();

api.use(express.urlencoded({ extended: true }));

const urlController = new URLController();
api.post('/shorten', urlController.shorten);
api.get('/:hash', urlController.redirect);

api.listen(5000, () => {
    console.log('Express Listening in http://localhost:5000');
});