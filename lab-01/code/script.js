const fs = require("fs");

function main() {
    const training = getTrainingData();

    const inputs = training.map(data => data.slice(0,3));
    const labels = training.map(data => data[3]);

    const perceptron = createPerceptron({n: 3});
    console.log("initial weights: ", perceptron.weights());

    perceptron.train(inputs, labels);

    console.log("final weights: ", perceptron.weights());
    console.log("epoch: ", perceptron.epoch());

    const testing = getTestingData();
    
    const testOutput = perceptron.test(testing);
    console.log("test output:\n", testOutput);
}

const createPerceptron = ({ n, bias = 1, activationFunction = activationFuntions.step, lrate = 0.001 }) => {

    let weights = new Array(n).fill(0).map(w => Math.random());
    let epoch = 0;

    const newWeight = ({ weight, input, label, guessed }) => weight + (label - guessed) * input * lrate;

    const guess = (inputs) => {
        const sum = inputs.reduce((s, x, i) => s + (x * weights[i]), 0) + bias;
        return activationFunction(sum);
    }

    const train = (inputs, labels) => {
        let error = true;
        while(error) {
            error = false;
            inputs.forEach((input, i) => {
                const guessed = guess(input);
                const label = labels[i];
                if (guessed !== label) {
                    weights = weights.map((w, j) => newWeight({
                        weight: w,
                        input: input[j],
                        label,
                        guessed
                    }));
                    error = true;
                }
            });
            epoch += 1;
        }
    }

    const test = (inputs) => inputs.map((x, i) => guess(x));

    return {
        bias: () => bias,
        lrate: () => lrate,
        epoch: () => epoch,
        weights: () => weights.map(w => w),
        guess,
        train,
        test,
    }
}

const activationFuntions = {
    step: (x) => {
        if (x >= 0) {
            return 1
        } else {
            return -1
        }
    },
}

const getTrainingData = () => {
    return readCSV("training-data.csv");
}

const getTestingData = () => {
    return readCSV("testing-data.csv");
}

const readCSV = (path) => {
    return fs.readFileSync(path, {encoding: 'utf8'}).split("\n").map(line => line.split(",").map(parseFloat));
}

main();