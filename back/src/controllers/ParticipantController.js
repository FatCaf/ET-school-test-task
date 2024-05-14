import Event from '.././models/Event.js';

class ParticipantController {
    async getParticipants(req, res) {
        try {
            const { eventId } = req.params;
            const event = Event.findById(eventId);
        }
        catch (e) {
            res.status(404).json({ message: 'No participants found' })
        }
    }
}

export default new ParticipantController();