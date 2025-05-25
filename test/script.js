const trainingData = [
    {input: [0,0], output: 0},
    {input: [0,1], output: 1},
    {input: [1,0], output: 1},
    {input: [1,1], output: 0}
]

let weights = [Math.random(), Math.random()]
let bias = Math.random()

function predict(input) {
    let sum = 0;
    for (let i = 0; i < weights.length; i++) {
    sum += weights[i] * input[i];
    }
    sum += bias;
    return sum > 0 ? 1:0
}

const learningRate = 0.1;

function train(epochs = 100) {
    for (let e = 0; e < epochs; e++) {
        for (const data of trainingData) {
            const input = data.input;
            const target = data.output;

            const prediction = predict(input);

            const error = target - prediction;

            for (let i = 0; i < weights.length; i++) {
                weights[i] += learningRate * error * input[i];
            }

            bias += learningRate * error;
        }
    }
}

function test() {
    for (const data of trainingData) {
        const input = data.input;
        const prediction = predict(input);
        console.log(`Input: ${input} → Prediction: ${prediction}`);
    }
}