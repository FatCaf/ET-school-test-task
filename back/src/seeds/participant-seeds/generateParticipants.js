import { writeFile } from 'fs';

function generateRandomParticipant() {
	const names = [
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
		'Mia Moore',
	];

	const emailProviders = [
		'gmail.com',
		'yahoo.com',
		'hotmail.com',
		'outlook.com',
	];
	const randomName = names[Math.floor(Math.random() * names.length)];
	const randomEmailProvider =
		emailProviders[Math.floor(Math.random() * emailProviders.length)];
	const randomEmail = `${randomName
		.toLowerCase()
		.replace(' ', '_')}@${randomEmailProvider}`;
	const randomDOB = new Date(
		1950 + Math.random() * 50,
		Math.random() * 12,
		Math.random() * 30
	);
	const whereHeardOptions = ['social media', 'friend', 'found myself'];
	const randomWhereHeard =
		whereHeardOptions[Math.floor(Math.random() * whereHeardOptions.length)];

	return {
		name: randomName,
		email: randomEmail,
		dob: randomDOB,
		where_heard: randomWhereHeard,
	};
}

const numParticipants = 240;
const participantsArray = [];
for (let i = 0; i < numParticipants; i++) {
	participantsArray.push(generateRandomParticipant());
}

const participantsJSON = JSON.stringify(participantsArray, null, 2);

writeFile('participants.json', participantsJSON, 'utf8', (err) => {
	if (err) {
		console.error('Error writing JSON to file:', err);
	} else {
		console.log('Participants data has been written to participants.json');
	}
});
