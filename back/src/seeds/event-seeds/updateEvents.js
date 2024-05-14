import dotenv from 'dotenv';
import mongoose from 'mongoose';
import { envPath } from '../../configure-env-path.js';
import Event from '../../models/Event.js';
import Participant from '../../models/Participant.js';

dotenv.config({ path: envPath });
const DB_URL = process.env.DB_URL;

async function connectToMongoDB() {
	try {
		await mongoose.connect(DB_URL, {
			useNewUrlParser: true,
			useUnifiedTopology: true,
			dbName: 'events_db',
		});
		console.log('Connected to MongoDB');
	} catch (err) {
		console.error('Error connecting to MongoDB:', err);
	}
}

async function addParticipantsToEvents() {
	try {
        const events = await Event.find();
        for (const event of events) {
            if (event.restrictions && event.restrictions.dob) {
                const participants = await Participant.find({
                    dob: { $lte: event.restrictions.dob },
                }).limit(10);

                event.participants = participants; // Embed full participant documents
            } else {
                const randomParticipants = await Participant.aggregate([
                    { $sample: { size: 10 } },
                ]);

                event.participants = randomParticipants; // Embed full participant documents
            }
            await event.save();
            console.log(`Participants added to event: ${event._id}`);
        }
    } catch (err) {
        console.error('Error adding participants to events:', err);
    } finally {
        await mongoose.disconnect();
        console.log('Disconnected from MongoDB');
    }
}

connectToMongoDB()
	.then(addParticipantsToEvents)
	.catch((err) => console.error('Error:', err));
