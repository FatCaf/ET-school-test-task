import cors from 'cors';
import dotenv from 'dotenv';
import express from "express";
import mongoose from "mongoose";
import { envPath } from './configure-env-path.js';
import EventRouter from './routers/EventRouter.js';
dotenv.config({ path: envPath})
const PORT = process.env.PORT;
const DB_URL = process.env.DB_URL;

const app = express();

app.use(express.json(), cors());
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