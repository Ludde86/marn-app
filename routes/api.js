const express = require('express');

const router = express.Router();

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const auth = require('../middleware/auth');
// const { check, validationResult } = require('express-validator/check');

const BlogPostModel = require('../models/blogPost');
const Todo = require('../models/todo');
const Shopping = require('../models/shopping');
const User = require('../models/user');

//
// Posts API
//

// define routes for GET requests
// -> set this route to start with /api
router.get('/', (req, res) => {
	// find everything within the DB
	// -> return the data we find
	BlogPostModel.find({})
		.then((data) => {
			// console.log('Data: ', data);
			res.json(data); // -> send this data as json back to client
		})
		.catch((error) => {
			console.error('Error: ', error);
		});
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

//
// Todos API
//

// this is our get method
// this method fetches all available data in our database
router.get('/getTodoList', auth, async (req, res) => {
	try {
		const todos = await Todo.find({ user: req.user.id });
		res.json(todos);
	} catch (error) {
		console.error(error.message);
		res.status(500).send('Server Error - When get Todolist');
	}
});

// this is our create method
// this method adds new data in our database
router.post('/postTodo', auth, async (req, res) => {
	const { message } = req.body;

	try {
		const newTodo = new Todo({
			message,
			user: req.user.id
		});

		const todo = await newTodo.save();
		res.json(todo);
	} catch (error) {
		console.error(error.message);
		res.status(500).send('Server Error - When send Todo to DB');
	}
});

// this is our update method
// this method overwrites existing data in our database
router.put('/putTodo/:id', auth, async (req, res) => {
	const { update } = req.body;

	try {
		let todo = await Todo.findById(req.params.id);
		if (!todo) {
			return res.status(404).json({ msg: 'Todo Item not found' });
		}
		if (todo.user.toString() !== req.user.id) {
			return res.status(401).json({ msg: 'Not authorized - When updating Todo Item' });
		}
		todo = await Todo.findByIdAndUpdate(req.params.id, { message: update }, { new: true });
		res.json(todo);
	} catch (error) {
		console.error(error.message);
		res.status(500).send('Server Error - When updating Todo Item');
	}

	// Todo.findByIdAndUpdate(req.params.id, update, (err) => {
	// 	if (err) return res.json({ success: false, error: err });
	// 	return res.json({ success: true });
	// });
});

// this is our delete method
// this method removes existing data in our database
router.delete('/deleteData', auth, (req, res) => {
	const { id } = req.body;
	Todo.findByIdAndRemove(id, (err) => {
		if (err) return res.send(err);
		return res.json({ success: true });
	});
});

router.put('/putTodoChecked/:id', (req, res) => {
	// the request body = update: {title, body, isChecked}
	const { update } = req.body;

	Todo.findByIdAndUpdate(req.params.id, { isChecked: update }, (err) => {
		if (err) return res.json({ success: false, error: err });
		return res.json({ success: true });
	});
});

//
// Shopping API
//

// @route	GET api/getShopping
// @desc	Get shopping list
// @access	Private
router.get('/getShopping', auth, async (req, res) => {
	try {
		const shoppings = await Shopping.find({ user: req.user.id });
		// console.log('get shoppings', shoppings);
		res.json(shoppings);
	} catch (error) {
		console.error(error.message);
		res.status(500).send('Server Error - When get Shoppinglist');
	}
});

// @route	POST api/postShopping
// @desc	Add new shopping
// @access	Private
router.post('/postShopping', auth, async (req, res) => {
	const { message } = req.body;

	try {
		// req.user.id = the logged in user
		const newShopping = new Shopping({
			message,
			user: req.user.id
		});

		const shopping = await newShopping.save();

		// return the shopping item to the client
		res.json(shopping);
	} catch (error) {
		console.error(error.message);
		res.status(500).send('Server Error - When send Shopping to DB');
	}
});

// @route	PUT api/putShopping
// @desc	Update shopping
// @access	Private
router.put('/putShopping/:id', auth, async (req, res) => {
	// const { message } = req.body;
	const { update } = req.body;

	// // build shopping item object
	// const shoppingFields = {};
	// if (message) shoppingFields.message = message;
	try {
		let shopping = await Shopping.findById(req.params.id);
		if (!shopping) {
			return res.status(404).json({ msg: 'Shopping Item not found' });
		}

		// make sure the user "owns" the shopping, we dont want someone else to update
		// -> the logged in user is a String (req.user.id),
		// -> so we need to turn shopping.user into a String to compare
		if (shopping.user.toString() !== req.user.id) {
			return res.status(401).json({ msg: 'Not authorized - When updating Shopping Item' });
		}

		// pass in the shopping item we want to update
		// (try if the second object passed in works with just the message)
		shopping = await Shopping.findByIdAndUpdate(
			req.params.id,
			// {
			// 	$set: shoppingFields
			// }
			// can we destruct this?
			{
				message: update
			},
			{
				new: true
			}
		);

		res.json(shopping);
	} catch (error) {
		console.error(error.message);
		res.status(500).send('Server Error - When updating Shopping Item');
	}

	// try {
	// 	// in put request, we pass this updated message
	// 	const { update } = req.body;

	// 	await Shopping.findByIdAndUpdate(req.params.id, { message: update });
	// 	res.json({ success: true });
	// } catch (error) {
	// 	console.error(error);
	// }
});

// @route	DELETE api/deleteShopping/:id
// @desc	Delete shopping item
// @access	Private
router.delete('/deleteShopping/:id', auth, async (req, res) => {
	try {
		let shopping = await Shopping.findById(req.params.id);

		if (shopping.user.toString() !== req.user.id) {
			return res.status(401).json({ msg: 'Not authorized - When deleting Shopping Item' });
		}

		await Shopping.findByIdAndRemove(req.params.id);
		res.json({ msg: 'Contact Removed' });
	} catch (error) {
		console.error(error.message);
		res.status(500).send('Server Error - When deleting Shopping Item');
	}
});

router.delete('/clearShopping', async (req, res) => {
	await Shopping.deleteMany({}, (err) => {
		if (err) {
			return res.send(err);
		} else {
			return res.json({ success: true });
		}
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

//
// User API
//

// @route	POST api/postUser
// @desc 	Register a user
// @access 	Public
router.post('/postUser', async (req, res) => {
	const { name, password } = req.body;

	try {
		let user = await User.findOne({ name });
		if (user) {
			// return res.json({ success: false, error: 'Name already exists' });
			return res.status(400).json({ msg: 'Name already exists' });
		}

		user = new User({
			name,
			password
		});

		// encrypt the password
		const salt = await bcrypt.genSalt(10);
		user.password = await bcrypt.hash(password, salt);

		await user.save();
		// res.send(req.body);
		// res.send('User saved');

		// payload - the object we want to send, in the token
		// -> we can get specific data based on the users id
		let payload = {
			user: {
				id: user.id
			}
		};

		// to generate a token, we have to sign it
		// -> secret (put in seperate config file)
		// expiresIn - the time the created token lives (we dont need it)
		jwt.sign(
			payload,
			'secret',
			{
				expiresIn: 360000
			},
			(err, token) => {
				if (err) throw err;
				res.json({ token });
			}
		);
	} catch (error) {
		// return res.json({ success: false, error: error });
		console.error(error);
		res.status(500).send('Server Error');
	}
	// res.send('Register a user');
	// res.send(req.body);
});

//
// Auth API
//

// @route	GET api/getAuth
// @desc	Get logged in user
// @access 	Private

// auth (middleware)
router.get('/getAuth', auth, async (req, res) => {
	// res.send('Get logged in user');
	try {
		// get the user from the database
		// if we send the correct token, and we are logged in
		// -> this request object (req) is gonna have a user object attached to it,
		// -> whit the current logged in users id
		// (in the middleware we assign it to req.user)
		// the data we return, its going to get the user data, and we dont want to return the password
		const user = await User.findById(req.user.id).select('-password');
		res.json(user);
	} catch (error) {
		console.error(error.message);
		res.status(500).send('Server Error - Login');
	}
});

// @route	POST api/postAuth
// @desc	Auth user & get token
// @access	Private
router.post('/postAuth', async (req, res) => {
	// res.send('Log in user');
	// return res.status(400).json({ success: false, error: err })

	const { name, password } = req.body;

	try {
		let user = await User.findOne({ name });

		if (!user) {
			return res.status(400).json({ msg: 'Invalid Credentials' });
		}

		const isMatch = await bcrypt.compare(password, user.password);

		if (!isMatch) {
			return res.status(400).json({ msg: 'Invalid Credentials' });
		}

		const payload = {
			user: {
				id: user.id
			}
		};

		jwt.sign(payload, 'secret', { expiresIn: 360000 }, (err, token) => {
			if (err) throw err;
			res.json({ token });
		});
	} catch (error) {
		console.error(error.message);
		res.status(500).send('Server Error');
	}
});

module.exports = router;
