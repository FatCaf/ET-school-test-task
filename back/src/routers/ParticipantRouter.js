const ParticipantRouter = new Router();

ParticipantRouter.get('/participants', ParticipantController.getParticipants)