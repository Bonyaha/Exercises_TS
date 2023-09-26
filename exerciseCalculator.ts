import { validateInputs, Inputs } from './inputValidation';

interface ExerciseResult {
	periodLength: number;
	trainingDays: number;
	success: boolean;
	rating: number;
	ratingDescription: string;
	target: number;
	average: number;
}




export const calculateExercises = (hoursPerDay: number[], target: number): ExerciseResult => {

	const periodLength = hoursPerDay.length;
	const trainingDays = hoursPerDay.filter((hours) => hours > 0).length;
	const totalHours = hoursPerDay.reduce((acc, hours) => acc + hours, 0);
	const average = totalHours / periodLength;
	const success = average >= target;

	let rating = 1;
	let ratingDescription = 'needs improvement';

	if (success) {
		rating = 3;
		ratingDescription = 'excellent';
	} else if (average >= rating - 0.5) {
		rating = 2;
		ratingDescription = 'not too bad but could be better';
	}
	return {
		periodLength,
		trainingDays,
		success,
		rating,
		ratingDescription,
		target,
		average,
	};
}

console.log(calculateExercises([3, 0, 2, 4.5, 0, 3, 1], 2));

try {
	const inputs: Inputs = validateInputs(process.argv, 2, 12);
	const hoursPerDay = inputs.hoursPerDay || [];
	const target = inputs.target || 0;
	console.log(calculateExercises(hoursPerDay, target));
} catch (error: unknown) {
	let errorMessage = 'Something bad happened.';
	if (error instanceof Error) {
		errorMessage += ' Error: ' + error.message;
	}
	console.log(errorMessage);
}