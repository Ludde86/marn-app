// starting point of the application
// to start client and server -> npm run dev

// import npm packages
const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan');

// path module provides utilities for working with file and directory paths
const path = require('path');

// initialize an express application
const app = express();

// define a environment variable port
// -> when hosting the application on another service (like Heroku), the host may independently configure the process.env.PORT variable
const PORT = process.env.PORT || 8080;

const MONGO_URI = 'mongodb+srv://ludde123:ludde123@marndb-w95cn.mongodb.net/test?retryWrites=true&w=majority';

// import the route of http requests
const routes = require('./routes/api');

// connect to mongoose
// -> link of the connection
// -> options
mongoose.connect(MONGO_URI, {
	useNewUrlParser: true,
	useUnifiedTopology: true
});

// check if connected to mongoose
mongoose.connection.on('connected', () => {
	console.log('Mongoose is connected!');
});

// this is like a middleware that is being hooked into express
// -> this is gonna parse every single json that are coming in, or every single urlencoded
// -> extended false = how deep we want to go inside this json object
// true = all the way (if nested object)

// this is making all the requests coming in as json, or url encoded, available on req.body
// we can now see our data as in the request body
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// what to use in the application
// http request logger
app.use(morgan('tiny'));

// configure the api route
// -> starting point, and the required (imported) route
app.use('/api', routes);

app.listen(PORT, console.log(`Server is starting at ${PORT}`));
