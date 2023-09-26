export const calculateBmi = (heightInCm: number, weightInKg: number): string => {
	const heightInM = heightInCm / 100; // Convert height to meters
	const BMI = weightInKg / (heightInM * heightInM);

	if (BMI < 18.5) {
		return 'Underweight';
	} else if (BMI >= 18.5 && BMI <= 24.9) {
		return 'Normal (healthy weight)';
	} else if (BMI >= 25.0 && BMI <= 29.9) {
		return 'Overweight';
	} else {
		return 'Obese';
	}
}

interface Inputs {
	heightInCm: number;
	weightInKg: number;
}
const parseArguments = (args: string[]): Inputs => {
	//console.log(args.length);

	if (args.length < 4) throw new Error('Not enough arguments');

	const heightInCm: number = Number(process.argv[2]);
	const weightInKg: number = Number(process.argv[3]);

	if (isNaN(heightInCm) || heightInCm <= 0) {
		throw new Error('Invalid height provided. Please provide non-negative number.');
	}
	if (isNaN(weightInKg) || weightInKg <= 0) {
		throw new Error('Invalid weight value. Please provide a positive number.');
	}

	return {
		heightInCm,
		weightInKg
	};
}

console.log(calculateBmi(180, 74))
try {
	const { heightInCm, weightInKg } = parseArguments(process.argv);
	console.log(calculateBmi(heightInCm, weightInKg))
} catch (error: unknown) {
	let errorMessage = 'Something bad happened.'
	if (error instanceof Error) {
		errorMessage += ' Error: ' + error.message;
	}
	console.log(errorMessage);
}