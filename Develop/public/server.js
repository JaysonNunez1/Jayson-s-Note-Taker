const express = require('express');

const PORT = process.env.PORT || 3001;

const path = require('path');

const app = express();

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.use(express.static('public'));

const apiRoutes = require('./routes/apiRoutes');

const htmlRoutes = require('./routes/htmlRoutes');