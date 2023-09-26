import express from 'express';
import { calculateBmi } from './bmiCalculator';
import { calculateExercises } from './exerciseCalculator'

const app = express();
app.use(express.json()); // Add this line to parse JSON request bodies

app.get('/hello', (_req, res) => {
	res.send('Hello Full Stack!');
});
app.get('/bmi', (req, res) => {
	const heightInCm: number = Number(req.query.height);
	const weightInKg: number = Number(req.query.weight)
	console.log(req.query.weight);
	console.log(weightInKg);

	if (isNaN(heightInCm) || isNaN(weightInKg) || heightInCm <= 0 || weightInKg <= 0) {
		res.status(400).json({ error: "malformatted parameters" });
	} else {
		const bmiResult = calculateBmi(heightInCm, weightInKg);
		res.json({ weight: weightInKg, height: heightInCm, bmi: bmiResult });
	}
});

app.post('/exercises', (req, res) => {
	const { daily_exercises, target } = req.body;

	if (!daily_exercises || !target) {
		return res.status(400).json({ error: 'parameters missing' });
	}

	if (!Array.isArray(daily_exercises) || daily_exercises.some(isNaN) || isNaN(target) || target <= 0) {
		return res.status(400).json({ error: 'malformatted parameters' });
	}

	const exerciseResult = calculateExercises(daily_exercises, target);
	return res.json(exerciseResult);
});

const PORT = 3003;

app.listen(PORT, () => {
	console.log(`Server running on port ${PORT}`);
});