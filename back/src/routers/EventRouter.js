import { Router } from 'express';
import EventController from '../controllers/EventController.js';
const EventRouter = new Router();

EventRouter.get('/events', EventController.getEvents);
EventRouter.post('/event-reg-form/:eventId', EventController.addParticipant);
EventRouter.post('/participants/:eventId', EventController.findParticipant);
EventRouter.get('/participants/:eventId/stats', EventController.getRegStat);
export default EventRouter;
