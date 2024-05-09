import fs from 'fs';
import * as tf from '@tensorflow/tfjs';

// Obtenim les dades del fitxer JSON
const data = JSON.parse(fs.readFileSync('dataAuto.json', 'utf8'));

//const filteredData = data.filter(item => item.ART_CODI === "011131");
const artCodiValues = [...new Set(data.map(item => item.ART_CODI))]; // Obtenim els valors únics de la columna ART_CODI
// Creem un array de zeros de la mida dels valors únics de ART_CODI i assignem un 1 a la posició de l'index de ART_CODI
const xs = data.map(item => { // Recoorrem tots els items del objecte data
  const oneHot = new Array(artCodiValues.length).fill(0); // Creem un array de zeros de la mida dels valors únics de ART_CODI
  oneHot[artCodiValues.indexOf(item.ART_CODI)] = 1; // Creem un array oneHot amb un 1 a la posició de l'index de ART_CODI
  return [item.PESO_ART, ...oneHot]; // Retornem un array amb el pes de l'animal i l'array oneHot
});

// Obtenim la clasificació del objecte data.
const ys = data.map(item => item.LPA_QUALITATABR);


const classifications = [...new Set(ys)]; // Obtenim els valors únics de la columna LPA_QUALITATABR
const classificationToNumber = {}; // Creem un objecte unic per cada valor de LPA_QUALITATABR
classifications.forEach((classification, index) => { // Recorrem tots els valors únics de LPA_QUALITATABR
  classificationToNumber[classification] = index; // Assignem un index a cada valor únic de LPA_QUALITATABR
});

const ysNumeric = ys.map(y => classificationToNumber[y]);

// Normalize the data
const xsMax = Math.max(...xs.map(x => x[0]));
const xsMin = Math.min(...xs.map(x => x[0]));
const artCodiMax = Math.max(...xs.map(x => x[1]));
const artCodiMin = Math.min(...xs.map(x => x[1]));

const xsNormalized = xs.map(x => [(x[0] - xsMin) / (xsMax - xsMin), (x[1] - artCodiMin) / (artCodiMax - artCodiMin)]);
const ysNormalized = ysNumeric.map(y => y / (classifications.length - 1));

// Convert normalized data to TensorFlow.js Tensors
const xTensors = tf.tensor2d(xsNormalized);
const yTensors = tf.tensor2d(ysNormalized, [ysNormalized.length, 1]);


// Create the model
const model = tf.sequential();
model.add(tf.layers.dense({ inputShape: [2], units: classifications.length, activation: 'softmax' }));
// Compile the model
model.compile({ loss: 'sparseCategoricalCrossentropy', optimizer: 'adam', metrics: ['accuracy'] });

// Train the model
await model.fit(xTensors, yTensors, { epochs: 100 });

// Test the model
const evaluation = model.evaluate(xTensors, yTensors);
const loss = evaluation[0].dataSync()[0];
const accuracy = evaluation[1].dataSync()[0];
console.log(`Test Loss: ${loss}`); // esperem que sigui baix perque el model sigui ha de estar entre 0 i 1 mes de 0.5 es dolent
console.log(`Test Accuracy: ${accuracy}`);

// Make a prediction for a new input
const inputWeight = 1.90; // Replace with your input weight
const inputArtCodi = "001027";
const oneHot = new Array(artCodiValues.length).fill(0); 
oneHot[artCodiValues.indexOf(inputArtCodi)] = 1;
const inputArtCodiNormalized = (artCodiValues.indexOf(inputArtCodi) - artCodiMin) / (artCodiMax - artCodiMin);
const inputTensor = tf.tensor2d([[inputWeight, inputArtCodiNormalized]]);
const predictedClassificationNormalized = model.predict(inputTensor);
const predictedClassificationIndex = predictedClassificationNormalized.argMax(1).dataSync()[0];
const predictedClassification = classifications[predictedClassificationIndex];

console.log(predictedClassification);
