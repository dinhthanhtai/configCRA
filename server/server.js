import path from 'path';
import express from 'express';
import { MongoClient } from 'mongodb';
import template from './../template';

import devBundle from './devBundle';

const app = express();

devBundle.compile(app);

const CURRENT_WORKING_DIR = process.cwd();
app.use('/dist', express.static(path.join(CURRENT_WORKING_DIR, 'dist')));

app.get('/', (req, res) => {
    res.status(200).send(template())
})

let port = process.env.PORT || 3000;

app.listen(port, function onStart(err) {
    if (err) {
        console.log(err);
    } 
    console.info('Server started on port ', port);
})

const uri = "mongodb+srv://taidt :Tt123456@cluster0.2r7l3.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
client.connect(err => {
  const collection = client.db("test").collection("devices");
  // perform actions on the collection object
  client.close();
});

// const url = process.env.MONGODB_URL || MongoClient.connect(url, (err, db) => {
//     console.log('Connected successfully to mongodb server');
// })






