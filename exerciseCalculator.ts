interface ExerciseResult {
	periodLength: number;
	trainingDays: number;
	success: boolean;
	rating: number;
	ratingDescription: string;
	target: number;
	average: number;
}

interface Inputs {
	hoursPerDay: number[];
	target: number;
}
const parseArguments = (args: string[]): Inputs => {
	//console.log(args.length);

	if (args.length < 4) throw new Error('Not enough arguments');
	if (args.length > 12) throw new Error('Too many arguments');

	const hoursPerDay: number[] = process.argv.slice(2, process.argv.length - 1).map(Number);
	const target: number = Number(process.argv[process.argv.length - 1]);

	if (hoursPerDay.some((hours) => isNaN(hours) || hours < 0)) {
		throw new Error('Invalid daily hours provided. Please provide non-negative numbers.');
	}
	if (isNaN(target) || target <= 0) {
		throw new Error('Invalid target value. Please provide a positive number.');
	}

	return {
		hoursPerDay,
		target
	};
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
	const { hoursPerDay, target } = parseArguments(process.argv);
	console.log(calculateExercises(hoursPerDay, target))
} catch (error: unknown) {
	let errorMessage = 'Something bad happened.'
	if (error instanceof Error) {
		errorMessage += ' Error: ' + error.message;
	}
	console.log(errorMessage);
}