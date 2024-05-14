import mongoose from "mongoose";

const Participant = new mongoose.Schema({
    name: { type: String, required: true},
    email: { type: String, required: true},
    dob: { type: Date, required: true},
    where_heard: { type: String, required: true},
})

export default mongoose.model('Participant', Participant);