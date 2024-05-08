import fs from 'fs';
import * as tf from '@tensorflow/tfjs';

// Obtenim les dades del fitxer JSON
const data = JSON.parse(fs.readFileSync('dataAuto.json', 'utf8'));

const filteredData = data.filter(item => item.ART_CODI === "011131");
// Extract the data
const xs = filteredData.map(item => item.PESO_ART);
const ys = filteredData.map(item => item.LPA_QUALITATABR);

// Convert classifications to numbers
const classifications = [...new Set(ys)];
const classificationToNumber = {};
classifications.forEach((classification, index) => {
  classificationToNumber[classification] = index;
});

const ysNumeric = ys.map(y => classificationToNumber[y]);

// Find the min and max of the data
const xsMax = Math.max(...xs);
const xsMin = Math.min(...xs);
const ysMax = Math.max(...ysNumeric);
const ysMin = Math.min(...ysNumeric);

// Normalize the data
const xsNormalized = xs.map(x => (x - xsMin) / (xsMax - xsMin));
const ysNormalized = ysNumeric.map(y => (y - ysMin) / (ysMax - ysMin));

// Convert normalized data to TensorFlow.js Tensors
const xTensors = tf.tensor2d(xsNormalized, [xsNormalized.length, 1]);
const yTensors = tf.tensor2d(ysNormalized, [ysNormalized.length, 1]);

// Create the model
const model = tf.sequential();
model.add(tf.layers.dense({ inputShape: [1], units: classifications.length, activation: 'softmax' }));

// Compile the model
model.compile({ loss: 'sparseCategoricalCrossentropy', optimizer: 'adam', metrics: ['accuracy'] });

// Train the model
await model.fit(xTensors, yTensors, { epochs: 20 });



const evaluation = model.evaluate(xTensors, yTensors);
const loss = evaluation[0].dataSync()[0];
const accuracy = evaluation[1].dataSync()[0];
console.log(`Test Loss: ${loss}`); // esperem que sigui baix perque el model sigui ha de estar entre 0 i 1 mes de 0.5 es dolent
console.log(`Test Accuracy: ${accuracy}`); //  

// Make a prediction
const inputWeight = 1.90; // Replace with your input weight
const inputWeightNormalized = (inputWeight - xsMin) / (xsMax - xsMin);
const inputWeightTensor = tf.tensor2d([inputWeightNormalized], [1, 1]);
const prediction = model.predict(inputWeightTensor);
const predictedClassificationIndex = prediction.argMax(-1).dataSync()[0];
const predictedClassification = classifications[predictedClassificationIndex];

console.log(predictedClassification);


