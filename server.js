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

// // dummy data created and saved into mongo DB
// // -> with our model we can save data to mongoDB
// const data = {
// 	title: 'Test Title',
// 	body: 'test Body'
// };

// // create a new blogpost instance of the model, with our test data
// const testBlogPost = new BlogPostModel(data);

// // -> save the blogpost to the database
// // -> create callback if error
// testBlogPost.save((error) => {
// 	if (error) {
// 		console.log('Something went wrong');
// 	} else {
// 		console.log('Data saved to database');
// 	}
// });

// what to use in the application
// http request logger
app.use(morgan('tiny'));

// configure the api route
// -> starting point, and the required (imported) route
app.use('/', routes);

app.listen(PORT, console.log(`Server is starting at ${PORT}`));
