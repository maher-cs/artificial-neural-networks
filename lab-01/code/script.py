# UQU - Computer Science -  Artificial Neural Networks - Lab 1
# Student: MHD Maher Azkoul

from random import random
import csv


def main():
    training = get_training_data()

    inputs = [data[0:3] for data in training]
    labels = [data[3] for data in training]

    perceptron = Perceptron(n=3)
    print("initial weights: ", perceptron.weights)

    perceptron.train(inputs, labels)

    print("final weights: ", perceptron.weights)
    print("epoch: ", perceptron.epoch)

    testing = get_testing_data()

    test_output = perceptron.test(testing)
    print("test output:\n", test_output)


class ActivationFunctions:

    @staticmethod
    def step(x):
        if x >= 0:
            return 1.0
        else:
            return -1.0


class Perceptron:

    def __init__(self, n,  bias=1, activation_function=ActivationFunctions.step, lrate=0.001):
        # passed parameters
        self.n = n
        self.bias = bias
        self.activation_function = activation_function
        self.lrate = lrate
        # initialized variables
        self.weights = [random() for x in range(self.n)]
        self.epoch = 0

    def new_weight(self, weight, input, label, guessed):
        return weight + ((label - guessed) * input * self.lrate)

    def guess(self, inputs):
        sum = 0
        for i, w in enumerate(self.weights):
            sum += inputs[i] * w
        sum += self.bias
        return self.activation_function(sum)

    def train(self, inputs, labels):
        error = True
        while(error):
            error = False
            for i, values in enumerate(inputs):
                guessed = self.guess(values)
                label = labels[i]
                if guessed != label:
                    self.weights = [self.new_weight(
                        weight=w, input=values[j], label=label, guessed=guessed) for j, w in enumerate(self.weights)]
                    error = True

            self.epoch += 1

    def test(self, inputs):
        return [self.guess(x) for x in inputs]


def get_training_data():
    return [[float(x) for x in row] for row in csv.reader(open("training-data.csv"))]


def get_testing_data():
    return [[float(x) for x in row] for row in csv.reader(open("testing-data.csv"))]


main()
