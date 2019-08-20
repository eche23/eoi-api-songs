const express = require('express');
const app = express();
const cors = require('cors');

const router1 = require('./app/v1.0/routes');
const router2 = require('./app/v2.0/routes');

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: true}));


app.use('/api/v1', router1);
app.use('/api/v2', router2);

module.exports = app;