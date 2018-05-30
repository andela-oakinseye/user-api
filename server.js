import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import logger from 'util';

dotenv.config(); 

import User from './controllers/User';

const app = express();
const PORT = process.env.PORT || 3000;
const MONGO_URL = process.env.MONGO_URL;


app.use(express.json())
app.use(express.urlencoded({ extended: false }));

mongoose.Promise = global.Promise;

mongoose.connect(MONGO_URL);


app.get('/api/users/emailsearch', User.getUserByEmail)
app.get('/api/users/namesearch', User.getUsersByFirstName)
app.get('/api/users/all', User.getUsers)

app.post('/api/users/', User.create);

app.delete('/api/users', User.delete);

app.patch('/api/users/:userId', User.update);

app.listen(PORT, () => logger.log(`Running on ${PORT}`))