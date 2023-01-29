const mongoose = require('mongoose')

const StorySchema = new mongoose.Schema({
	title: {
		type: String,
		required: true,
		trim: true
	},
	body: {
		type: String,
		required: true
	},
	status: {
		type: String,
		default: 'public',
		enum: ['public', 'private']
	},
	user: { //user connect to each story, so we know who did what; and the way we are connected to the User model is with 'ref'
		type: mongoose.Schema.Types.ObjectId,
		ref: 'User'
	},
	createdAd: {
		type: Date,
		default: Date.now
	}
})

module.exports = mongoose.model('Story', StorySchema)