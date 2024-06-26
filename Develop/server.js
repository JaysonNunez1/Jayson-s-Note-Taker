const express = require('express');


const PORT = process.env.PORT || 3001;

const path = require('path');

const app = express();

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.use(express.static('public'));

const apiRoutes = require('./routes/apiRoutes');

const htmlRoutes = require('./routes/htmlRoutes');

app.use('/api', apiRoutes);

app.use('/', htmlRoutes);

app.listen(PORT,() =>{
    console.log(`API server now on port ${PORT}!`);
});