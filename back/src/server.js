import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';
import mongoose from 'mongoose';
import EventRouter from './routers/EventRouter.js';
import { envPath } from './services/configure-env-path.js';
import getEventsFromSeparateApi from './services/separateEventsApiService.js';

dotenv.config({ path: envPath });
const PORT = process.env.PORT;
const DB_URL = process.env.DB_URL;
const INTERVAL = process.env.INTERVAL;

const app = express();

app.use(express.json());
app.use(cors())
app.use('/api/v1', EventRouter);

async function startApp() {
	try {
		await mongoose.connect(DB_URL, {
			dbName: 'events_db',
		});
		app.listen(PORT, () => console.log('SERVER STARTED ON PORT: ' + PORT));
	} catch (e) {
		console.error(e);
	}
}

startApp();

setInterval(() => {
	console.log('start insertion');
	getEventsFromSeparateApi();
}, INTERVAL);
