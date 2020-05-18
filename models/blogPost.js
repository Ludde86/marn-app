const mongoose = require('mongoose');

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

module.exports = BlogPostModel;
