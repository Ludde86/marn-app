const mongoose = require('mongoose');

// define schema for mongoDB
const Schema = mongoose.Schema;
const BlogPostSchema = new Schema({
	user: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'users'
	},
	title: String,
	body: String,
	isChecked: {
		type: Boolean,
		default: false
	},
	date: {
		type: String,
		default: Date.now()
	}
});

module.exports = mongoose.model('BlogPost', BlogPostSchema);
