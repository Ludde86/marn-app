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

// const data = {
// 	title: 'testing',
// 	body: 'working'
// };

// const newBlogPost = new BlogPostModel(data);

// newBlogPost.save((error) => {
// 	if (error) {
// 		console.log('oooops');
// 	} else {
// 		console.log('success!!!!!!');
// 	}
// });

module.exports = BlogPostModel;
