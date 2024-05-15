import axios from 'axios';
import dotenv from 'dotenv';
import Event from '../models/Event.js';
import { envPath } from './configure-env-path.js';
import extractData from './dataExtractionService.js';
const query = ['concerts', 'stand up', 'seminar', 'music festival', 'show'];
const start = Math.floor(Math.random() * 4);

dotenv.config({ path: envPath });
const RAPID_API_KEY = process.env.RAPID_API_KEY;
const RAPID_API_HOST = process.env.RAPID_API_HOST;
const RAPID_API_URL = process.env.RAPID_API_URL;

const options = {
	method: 'GET',
	url: RAPID_API_URL,
	params: {
		query: query[start],
		start: start,
	},
	headers: {
		'X-RapidAPI-Key': RAPID_API_KEY,
		'X-RapidAPI-Host': RAPID_API_HOST,
	},
};

async function getEventsFromSeparateApi() {
	try {
		const { data } = (await axios.request(options)).data;

		const extractedData = extractData(data);

		await Event.insertMany(extractedData)
			.then(() => {
				console.log('Insertion successful');
			})
			.catch((e) => {
				console.error(e.message);
			});
	} catch (e) {
		console.error(e.message);
	}
}

export default getEventsFromSeparateApi;
