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

const MONGO_URI = 'mongodb+srv://ludde123:ludde123@marndb-w95cn.mongodb.net/test?retryWrites=true&w=majority';

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

// define schema for mongoDB
const Schema = mongoose.Schema;
const BlogPostSchema = new Schema({
	title: String,
	body: String,
	date: {
		type: String,
		default: Date.now()
	}
});

// register a model for blogpost
const BlogPostModel = mongoose.model('BlogPost', BlogPostSchema);

// -> with our model we can save data to mongoDB
const data = {
	title: 'Test Title',
	body: 'test Body'
};

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
