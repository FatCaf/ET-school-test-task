import mongoose from 'mongoose';

const Event = new mongoose.Schema({
	title: { type: String, required: true },
	description: { type: String, required: true },
	date: { type: Date, required: true },
	organizer: { type: String, required: true },
	restrictions: {
		age: { type: Number },
	},
	participants: [
		{
			name: { type: String },
			email: { type: String },
			dob: { type: String },
			where_heard: { type: String },
			createdAt: {type: Date}
		},
	],
});

export default mongoose.model('Event', Event);
