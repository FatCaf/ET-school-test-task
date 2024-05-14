import { Participant } from './Participant';

export type EventType = {
    _id: string,
    title: string,
    description: string,
    date: string,
    organizer: string,
    restrictions: {
        dob: string
    }
    participants: Participant[];
}
