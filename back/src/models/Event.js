import mongoose from "mongoose";

const Event = new mongoose.Schema({
    title: { type: String, required: true},
    description: { type: String, required: true},
    date: { type: Date, required: true},
    organizer: { type: String, required: true},
    restrictions: {
        dob: { type: Date}
    },
    participants: [
        {
            _id: { type: mongoose.Schema.Types.ObjectId, ref: 'Participant' },
            name: { type: mongoose.Schema.Types.String, ref: 'Participant'},
            email: { type: mongoose.Schema.Types.String, ref: 'Participant'},
            dob: { type: mongoose.Schema.Types.String, ref: 'Participant'},
            where_heard: { type: mongoose.Schema.Types.String, ref: 'Participant'},
        }
    ],
})

export default mongoose.model('Event', Event);