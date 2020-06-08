const express = require('express');

const router = express.Router();

const BlogPostModel = require('../models/blogPost');
const Data = require('../models/data');
const Shopping = require('../models/shopping');

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
	const data = req.body;

	// we need to make a new instance of the blogpost to save it into the database
	const newBlogPost = new BlogPostModel(data);
	newBlogPost.save((error) => {
		if (error) {
			res.status(500).json({ msg: 'Something went wrong, internal server errors' });
		} else {
			res.json({
				msg: 'Server received data, and saved into the database'
			});
		}
	});
});

// this function takes in the axios put request items id
router.put('/putPost/:id', (req, res) => {
	// the request body = update: {title, body}
	const { update } = req.body;

	// here we use the id we take in
	// -> with the blog post model (schema), we find the id with mongoose find method
	// -> and updat with these updated values
	BlogPostModel.findByIdAndUpdate(req.params.id, { title: update.title, body: update.body }, (err) => {
		if (err) return res.json({ success: false, error: err });
		return res.json({ success: true });
	});
});

router.put('/putTodoChecked/:id', (req, res) => {
	// the request body = update: {title, body, isChecked}
	const { update } = req.body;

	Data.findByIdAndUpdate(req.params.id, { isChecked: update }, (err) => {
		if (err) return res.json({ success: false, error: err });
		return res.json({ success: true });
	});
});

router.put('/putShoppingChecked/:id', (req, res) => {
	// the request body = update: {title, body, isChecked}
	const { update } = req.body;

	Shopping.findByIdAndUpdate(req.params.id, { isChecked: update }, (err) => {
		if (err) return res.json({ success: false, error: err });
		return res.json({ success: true });
	});
});

router.put('/putPostChecked/:id', (req, res) => {
	// the request body = update: {title, body, isChecked}
	const { update } = req.body;

	// here we use the id we take in
	// -> with the blog post model (schema), we find the id with mongoose find method
	// -> and updat with these updated values
	BlogPostModel.findByIdAndUpdate(req.params.id, { isChecked: update }, (err) => {
		if (err) return res.json({ success: false, error: err });
		return res.json({ success: true });
	});
});

router.delete('/deletePost/:id', async (req, res) => {
	await BlogPostModel.findByIdAndRemove(req.params.id, (err) => {
		if (err) {
			return res.send(err);
		} else {
			return res.json({ success: true });
		}
	});
});

// this is our get method
// this method fetches all available data in our database
router.get('/getData', (req, res) => {
	Data.find((err, data) => {
		if (err) return res.json({ success: false, error: err });
		return res.json({ success: true, data: data });
	});
});

// this is our update method
// this method overwrites existing data in our database
router.post('/updateData', (req, res) => {
	const { id, update } = req.body;
	Data.findByIdAndUpdate(id, update, (err) => {
		if (err) return res.json({ success: false, error: err });
		return res.json({ success: true });
	});
});

// this is our delete method
// this method removes existing data in our database
router.delete('/deleteData', (req, res) => {
	const { id } = req.body;
	Data.findByIdAndRemove(id, (err) => {
		if (err) return res.send(err);
		return res.json({ success: true });
	});
});

// this is our create method
// this method adds new data in our database
router.post('/putData', (req, res) => {
	let data = new Data();

	const { id, message } = req.body;

	if ((!id && id !== 0) || !message) {
		return res.json({
			success: false,
			error: 'INVALID INPUTS'
		});
	}
	data.message = message;
	data.id = id;
	data.save((err) => {
		if (err) return res.json({ success: false, error: err });
		return res.json({ success: true });
	});
});

router.get('/getShopping', (req, res) => {
	Shopping.find((err, data) => {
		if (err) {
			return res.json({ success: false, error: err });
		} else {
			return res.json({ success: true, data: data });
		}
	});
});

router.post('/postShopping', (req, res) => {
	let shopping = new Shopping();
	const { message } = req.body;

	shopping.message = message;
	if (!message) {
		return res.json({ success: false, error: 'INVALID INPUTS' });
	} else {
		shopping.save((err, data) => {
			if (err) {
				return res.json({ success: false, error: err });
			} else {
				return res.json({ success: true, data: data });
			}
		});
	}
});

router.delete('/deleteShopping/:id', async (req, res) => {
	await Shopping.findByIdAndRemove(req.params.id, (err) => {
		if (err) {
			return res.send(err);
		} else {
			return res.json({ success: true });
		}
	});
});

router.put('/putShopping/:id', async (req, res) => {
	try {
		// in put request, we pass this updated message
		const { update } = req.body;

		await Shopping.findByIdAndUpdate(req.params.id, { message: update });
		res.json({ success: true });
	} catch (error) {
		console.error(error);
	}
});

module.exports = router;
