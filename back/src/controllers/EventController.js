import Event from '../models/Event.js';
import Participant from '../models/Participant.js';

class EventController {
	async getEvents(req, res) {
		try {
			const { quantity, page } = req.query;
			const offset = page * quantity;
			const totalEvents = await Event.countDocuments();
			const data = await Event.find().limit(quantity).skip(offset).sort({ date: 1});
			const availablePages = Math.ceil(totalEvents / quantity);
			res.status(200).json({ events: data, pages: availablePages });
		} catch (e) {
			res.status(400).json({ message: 'Cannot find events' });
		}
	}

	async addParticipant(req, res) {
		try {
			const { eventId } = req.params;
			const participant = req.body;
			const newParticipant = new Participant(participant);
			await newParticipant.save();
			const event = await Event.findByIdAndUpdate(eventId, { $push: { participants: newParticipant } }, {
				new: true
			});
			// if (event.restrictions && event.restrictions.dob) {
			// 	const { dob } = event.get('restrictions');
			// 	console.log(dob)
			// 	console.log(participant.dob);
			// 	const result = compareDates(dob, participant.dob)
			// 	console.log(result)
			// }
			res.status(201).json({ message: 'created'})
		}
		catch(e) {
			res.status(400).json({ message: e.message})
		}
	}
}

export default new EventController();
