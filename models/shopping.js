const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ShoppingSchema = new Schema(
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
	{
		timestamps: true
	}
);

module.exports = mongoose.model('Shopping', ShoppingSchema);
