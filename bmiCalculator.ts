import { validateInputs, Inputs } from './inputValidation';

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


console.log(calculateBmi(180, 74))

try {
	const inputs: Inputs = validateInputs(process.argv, 2, 4);
	const heightInCm = inputs.heightInCm || 0; // Provide a default value (0 in this case) if it's undefined
	const weightInKg = inputs.weightInKg || 0;
	console.log(calculateBmi(heightInCm, weightInKg));
} catch (error: unknown) {
	let errorMessage = 'Something bad happened.';
	if (error instanceof Error) {
		errorMessage += ' Error: ' + error.message;
	}
	console.log(errorMessage);
}