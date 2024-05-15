//Api don't provide organizers, so i defined my own
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
	'Mia Moore',
];

function extractData(data) {
	const extractedData = [];
	const index = Math.floor(Math.random() * data.length);

	data.forEach((item) => {
		let description = "Organizer don't provide description";
		if (item.description) {
			const occurrenceIndex = description.search(/[?.!]/);
			description =
				occurrenceIndex !== -1
					? description.slice(0, occurrenceIndex + 1)
					: description;
		}
		const eventItem = {
			title: item.name,
			description,
			date: item.start_time,
			organizer: organizers[index],
			restrictions: {},
			participants: [],
		};

		extractedData.push(eventItem);
	});

	return extractedData;
}

export default extractData;
