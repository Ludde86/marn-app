// /backend/data.js
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// this will be our data base's data structure
const TodoSchema = new Schema(
	{
		user: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'users'
		},
		message: String,
		isChecked: {
			type: Boolean,
			default: false
		}
	},
	{ timestamps: true }
);

// export the new Schema so we could modify it using Node.js
module.exports = mongoose.model('Todo', TodoSchema);
