export default function dataSorter(criteria, data) {
	let sortedData = data;

	switch (criteria) {
		case 'title':
			sortedData = data.sort((curr, next) => {
				return curr.title.localeCompare(next.title);
			});
			break;
		case 'nearest':
			sortedData = data.sort(
				(curr, next) => new Date(curr.date) - new Date(next.date)
			);
			break;
		case 'furthest':
			sortedData = data.sort(
				(curr, next) => new Date(next.date) - new Date(curr.date)
			);
			break;
		case 'organizer':
			sortedData = data.sort((curr, next) =>
				curr.organizer.localeCompare(next.organizer)
			);
			break;
	}

	return sortedData;
}
