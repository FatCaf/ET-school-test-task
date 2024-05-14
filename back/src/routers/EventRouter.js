import { Router } from 'express';
import EventController from '../controllers/EventController.js';
const EventRouter = new Router();

EventRouter.get('/events', EventController.getEvents);
EventRouter.post('/event-reg-form/:eventId', EventController.addParticipant);
export default EventRouter;
