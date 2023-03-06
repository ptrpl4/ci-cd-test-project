/* eslint-disable semi */
const express = require('express');
const path = require('path');
const fs = require('fs');
const {MongoClient} = require('mongodb');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({
  extended: true,
}));
app.use(bodyParser.json());

app.get('/', (req, res) => {
  res.sendFile(path.join(`${__dirname}/index.html`));
});

// use when starting application locally
const mongoUrlLocal = 'mongodb://admin:password@localhost:27017';

// use when starting application as docker container
const mongoUrlDocker = 'mongodb://admin:password@mongodb';

// pass these options to mongo client connect request to avoid DeprecationWarning for current Server Discovery and Monitoring engine
const mongoClientOptions = {useNewUrlParser: true, useUnifiedTopology: true};

// "user-account" in demo with docker. "my-db" in demo with docker-compose
const databaseName = 'user-account';

app.get('/profile-picture', (req, res) => {
  const img = fs.readFileSync(path.join(__dirname, 'images/profile-1.jpg'));
  res.writeHead(200, {'Content-Type': 'image/jpg'});
  res.end(img, 'binary');
});

app.post('/update-profile', (req, res) => {
  const userObj = req.body;

  MongoClient.connect(mongoUrlLocal, mongoClientOptions, (err, client) => {
    if (err) throw err;

    const db = client.db(databaseName);
    userObj.userid = 1;

    const myquery = {userid: 1};
    const newvalues = {$set: userObj};

    db.collection('users').updateOne(myquery, newvalues, {upsert: true}, (err, res) => {
      if (err) throw err;
      client.close();
    });
  });
  // Send response
  res.send(userObj);
});

app.get('/get-profile', (req, res) => {
  let response = {};
  // Connect to the db
  MongoClient.connect(mongoUrlLocal, mongoClientOptions, (err, client) => {
    if (err) throw err;

    const db = client.db(databaseName);

    const myquery = {userid: 1};

    db.collection('users').findOne(myquery, (err, result) => {
      if (err) throw err;
      response = result;
      client.close();

      // Send response
      res.send(response || {});
    });
  });
});

app.listen(port, () => {
  console.log(`app listening on port ${port}! http://localhost:3000/ `);
});
