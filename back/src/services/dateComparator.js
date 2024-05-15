export default function compareDates(minAge, dob) {
	return getAge(dob) <= minAge;
}

function getAge(dateString) {
	const birthDate = new Date(dateString);
	const today = new Date();

	let age = today.getFullYear() - birthDate.getFullYear();
	const monthDifference = today.getMonth() - birthDate.getMonth();

	if (
		monthDifference < 0 ||
		(monthDifference === 0 && today.getDate() < birthDate.getDate())
	) {
		age--;
	}
	console.log(age);
	return age;
}
