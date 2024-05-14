import dotenv from 'dotenv';
import fs from 'fs';
import mongoose from "mongoose";
import { envPath } from '../../configure-env-path.js';
import Event from '../../models/Event.js';

dotenv.config({ path: envPath });
const DB_URL = process.env.DB_URL;

function readEventsFromFile() {
    try {
        const data = fs.readFileSync('events.json', 'utf8');
        return JSON.parse(data);
    } catch (err) {
        console.error('Error reading events file:', err);
        return [];
    }
}

async function seedEvents() {
    try {
        
        await mongoose.connect(DB_URL,
         { useNewUrlParser: true, useUnifiedTopology: true, dbName: 'events_db' });
        console.log('Connected to MongoDB');

        const events = readEventsFromFile();

        await Event.insertMany(events);
        console.log(`${events.length} events inserted into MongoDB`);

    } catch (err) {
        console.error('Error:', err);
    } finally {
        mongoose.connection.close();
        console.log('Connection to MongoDB closed');
    }
}

seedEvents();