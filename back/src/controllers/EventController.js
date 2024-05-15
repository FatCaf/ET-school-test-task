import Event from '../models/Event.js';
import dataSorter from '../services/dataSorterService.js';
import compareDates from '../services/dateComparatorService.js';
import getRegStatPerDay from '../services/regStatService.js';

class EventController {
	async getEvents(req, res) {
		try {
			const { quantity, page, sortBy} = req.query;
			const offset = page * quantity;
			const totalEvents = await Event.countDocuments();
			let data = await Event.find().limit(quantity).skip(offset);

			if (sortBy) data = dataSorter(sortBy, data);

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

			const event = await Event.findById(eventId);

			if (!event) {
				return res.status(404).json({ message: 'Event not found' });
			}

			const participantExists = event.participants.some(
				(p) => p.email === participant.email
			);
			if (participantExists) {
				return res.status(400).json({ message: 'Participant already exists' });
			}

			if (event.restrictions && event.restrictions.age) {
				const { age } = event.restrictions;
				if (compareDates(age, participant.dob)) {
					return res
						.status(400)
						.json({ message: `Minimum age to participate is ${age}` });
				}
			}

			event.participants.push(participant);
			await event.save();

			res.status(201).json({ message: 'Participant added successfully' });
		} catch (e) {
			res.status(400).json({ message: e.message });
		}
	}

	async findParticipant(req, res) {
		try {
			const { eventId } = req.params;
			console.log(eventId);
			const { searchParam } = req.body;
			const event = await Event.findById(eventId);

			if (!event)
				return res.status(404).json({ message: 'Event was not found' });
			const participant = event.participants.find(
				(p) =>
					p.name.toLowerCase() === searchParam.toLowerCase() ||
					p.email === searchParam
			);
			if (!participant)
				return res.status(404).json({ message: 'Participant was not found' });

			res.status(200).json(participant);
		} catch (e) {
			res.status(404).json({ message: e.message });
		}
	}

	async getRegStat(req, res) {
		try {
			const { eventId } = req.params;
			const event = await Event.findById(eventId);
			const { participants } = event;

			if (!event)
				return res.status(404).json({ message: 'Event was not found' });
			
			const statArray = getRegStatPerDay(participants);
			
			res.status(200).json(statArray);
		}
		catch (e) {
			res.status(404).json({ message: e.message })
		}
	}
}

export default new EventController();
