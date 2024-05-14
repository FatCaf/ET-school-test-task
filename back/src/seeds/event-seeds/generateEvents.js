import fs from 'fs';

function generateRandomEvent() {
    const events = [
        { title: 'Birthday Party', description: 'A fun event for everyone!' },
        { title: 'Conference', description: 'Come join us for a day of learning.' },
        { title: 'Wedding', description: 'A celebration of love.' },
        { title: 'Music Festival', description: 'Experience live music in a beautiful setting.' },
        { title: 'Workshop', description: 'Learn new skills and meet new people.' },
        { title: 'Seminar', description: 'Connect with industry experts and gain valuable insights.' },
        { title: 'Art Exhibition', description: 'Immerse yourself in a world of art and creativity.' },
        { title: 'Book Launch', description: 'Discover new flavors and indulge in culinary delights.' },
        { title: 'Charity Gala', description: 'Witness the union of two hearts in a magical ceremony.' },
        { title: 'Food Festival', description: 'Explore the latest trends and innovations in technology.' },
        { title: 'Tech Summit', description: 'Expand your professional network and make meaningful connections.' },
        { title: 'Networking Event', description: 'Transform your mind, body, and soul in a peaceful environment.' },
        { title: 'Fitness Retreat', description: 'Engage in fun activities and improve your fitness.' }
    ];

    const organizers = [
        'John Doe',
        'Jane Smith',
        'Alice Johnson',
        'Bob Brown',
        'Eva Garcia',
        'Michael Lee',
        'Emily Davis',
        'William Martinez',
        'Olivia Taylor',
        'James Anderson',
        'Sophia Hernandez',
        'Daniel Wilson',
        'Isabella Lopez',
        'Alexander Thompson',
        'Mia Moore'
    ];
    
    const randomEvent = events[Math.floor(Math.random() * events.length)];

    const event = {
        title: randomEvent.title,
        description: randomEvent.description,
        date: new Date(Date.now() + Math.random() * 1000 * 3600 * 24 * 30), // Random date within the next 30 days
        organizer: organizers[Math.floor(Math.random() * organizers.length)],
        participants: []
    };

    // Add restrictions only for some events
    if (Math.random() > 0.5) {
        // Random date of birth restriction within the last 50 years
        event.restrictions = { dob: new Date(1950 + Math.random() * 50, Math.random() * 12, Math.random() * 30) };
    }

    return event;
}

const numEvents = 48;
const eventsArray = [];
for (let i = 0; i < numEvents; i++) {
    eventsArray.push(generateRandomEvent());
}

// Convert events array to JSON string
const eventsJSON = JSON.stringify(eventsArray, null, 2);

// Write JSON string to a file named 'events.json'
fs.writeFile('events.json', eventsJSON, 'utf8', (err) => {
    if (err) {
        console.error('Error writing JSON to file:', err);
    } else {
        console.log('Events data has been written to events.json');
    }
});
