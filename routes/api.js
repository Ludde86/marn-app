const express = require('express');

const router = express.Router();

const BlofPost = require('../models/blogPost');

// define routes for GET requests
// -> set this route to start with /api
router.get('/api', (req, res) => {
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
router.get('/api/name', (req, res) => {
	const data = {
		username: 'gurra',
		age: 32
	};
	res.json(data); // -> send this data as json back to client
});

module.exports = router;
