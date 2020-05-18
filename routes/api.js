const express = require('express');

const router = express.Router();

const BlogPostModel = require('../models/blogPost');

// define routes for GET requests
// -> set this route to start with /api
router.get('/', (req, res) => {
	// find everything within the DB
	// -> return the data we find
	BlogPostModel.find({})
		.then((data) => {
			console.log('Data: ', data);
			res.json(data); // -> send this data as json back to client
		})
		.catch((error) => {
			console.log('Error: ', error);
		});
});

// another route
router.get('/name', (req, res) => {
	// find a specific
	const data = {
		username: 'ludde',
		age: 33
	};
	res.json(data); // -> send this data as json back to client
});

// post request
router.post('/save', (req, res) => {
	// req.body is the data from the form post request
	console.log('Req body: ', req.body);

	// we need to make a new instance of the blogpost to save it into the database
	const newBlogPost = new BlogPostModel(req.body);
	newBlogPost.save((error) => {
		if (error) {
			console.log('Cannot save data into database');
		} else {
			res.json({
				msg: 'Server received data'
			});
		}
	});
});

module.exports = router;
