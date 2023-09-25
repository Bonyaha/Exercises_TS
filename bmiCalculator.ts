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