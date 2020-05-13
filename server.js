// starting point of the application

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

// what to use in the application
// http request logger
app.use(morgan('tiny'));

// define routes for GET requests
// -< set this route to start with /api
app.get('/api', (req, res) => {
	const data = {
		username: 'ludde',
		age: 33
	};
	res.json(data); // -> send this data as json back to client
});

// another route
app.get('/api/name', (req, res) => {
	const data = {
		username: 'gurra',
		age: 32
	};
	res.json(data); // -> send this data as json back to client
});

app.listen(PORT, console.log(`Server is starting at ${PORT}`));
