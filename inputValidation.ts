// inputValidation.ts

export interface Inputs {
	heightInCm?: number;
	weightInKg?: number;
	hoursPerDay?: number[];
	target?: number;
}

export const validateInputs = (args: string[], requiredArgs: number, maxArgs: number): Inputs => {
	if (args.length < requiredArgs) throw new Error('Not enough arguments');
	if (args.length > maxArgs) throw new Error('Too many arguments');

	const inputs: Inputs = {};

	if (args[2]) { // Updated to index 2 for heightInCm in BMI calculation
		const heightInCm = Number(args[2]); // Updated to index 2
		if (isNaN(heightInCm) || heightInCm <= 0) {
			throw new Error('Invalid height provided. Please provide a non-negative number.');
		}
		inputs.heightInCm = heightInCm;
	}

	if (args[3]) { // Updated to index 3 for weightInKg in BMI calculation
		const weightInKg = Number(args[3]); // Updated to index 3
		if (isNaN(weightInKg) || weightInKg <= 0) {
			throw new Error('Invalid weight value. Please provide a positive number.');
		}
		inputs.weightInKg = weightInKg;
	}

	if (args.length > 4) { // Updated to check if more than 4 arguments for exercise calculation
		const hoursPerDay = args.slice(2, args.length - 1).map(Number);
		if (hoursPerDay.some((hours) => isNaN(hours) || hours < 0)) {
			throw new Error('Invalid daily hours provided. Please provide non-negative numbers.');
		}
		inputs.hoursPerDay = hoursPerDay;
	}

	if (args[args.length - 1]) {
		const target = Number(args[args.length - 1]);
		if (isNaN(target) || target <= 0) {
			throw new Error('Invalid target value. Please provide a positive number.');
		}
		inputs.target = target;
	}

	return inputs;
};
