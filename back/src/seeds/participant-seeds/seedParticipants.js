import dotenv from 'dotenv';
import fs from 'fs';
import mongoose from 'mongoose';
import { envPath } from '../../configure-env-path.js';
import Participant from '../../models/Participant.js';
dotenv.config({ path: envPath });
const DB_URL = process.env.DB_URL;

function readParticipantsFromFile() {
	try {
		const data = fs.readFileSync('participants.json', 'utf8');
		return JSON.parse(data);
	} catch (err) {
		console.error('Error reading participants file:', err);
		return [];
	}
}

B;
async function seedParticipants() {
	try {
		await mongoose.connect(DB_URL, {
			useNewUrlParser: true,
			useUnifiedTopology: true,
			dbName: 'events_db',
		});
		console.log('Connected to MongoDB');

		const participants = readParticipantsFromFile();

		await Participant.insertMany(participants);
		console.log(`${participants.length} participants inserted into MongoDB`);
	} catch (err) {
		console.error('Error:', err);
	} finally {
		mongoose.connection.close();
		console.log('Connection to MongoDB closed');
	}
}

seedParticipants();
