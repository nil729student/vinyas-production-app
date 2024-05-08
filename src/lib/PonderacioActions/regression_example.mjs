import fs from 'fs';
import * as tf from '@tensorflow/tfjs';

// Obtenim les dades del fitxer JSON
const data = JSON.parse(fs.readFileSync('dataAuto.json', 'utf8'));

// Extraiem les dades de pes de l'animal i de la producció
const filteredData = data.filter(item => item.ART_CODI === "011127");
const xs = filteredData.map(item => item.LPA_QUALITATABR);
const ys = filteredData.map(item => item.PESO_ART);


const classifications = [...new Set(xs)];
const classificationToNumber = {};
classifications.forEach((classification, index) => {
    classificationToNumber[classification] = index;
});

const xsNumeric = xs.map(x => classificationToNumber[x]);

// busquem els valors màxims i mínims de les dades
const xsMax = Math.max(...xsNumeric);
const xsMin = Math.min(...xsNumeric);
const ysMax = Math.max(...ys);
const ysMin = Math.min(...ys);

// Normalitzem les dades perquè estiguin entre 0 i 1
const xsNormalized = xsNumeric.map(x => (x - xsMin) / (xsMax - xsMin));
const ysNormalized = ys.map(y => (y - ysMin) / (ysMax - ysMin));
// Creem els tensors: tensors 2D amb una sola columna. Exemple: [[1], [2], [3]] és un tensor 2D amb 3 files i 1 columna.
const xTensors = tf.tensor2d(xsNormalized, [xsNormalized.length, 1]);
const yTensors = tf.tensor2d(ysNormalized, [ysNormalized.length, 1]);

// creem el model
const model = tf.sequential();
model.add(tf.layers.dense({ inputShape: [1], units: 1 }));

// Compilem el model
model.compile({ loss: 'meanSquaredError', optimizer: 'sgd' });

// entranem el model amb les dades normalitzades durant 50 èpoques que son les iteracions que farà el model per aprendre
await model.fit(xTensors, yTensors, { epochs: 100 });

// Utilitzem el model per fer una predicció de la producció d'un animal d'un rang de pes de 220 a 250
// Desnormalitzem les dades de pes de l'animal
const inputClassification = "ZO 2+";
if (!classificationToNumber.hasOwnProperty(inputClassification)) {
    console.log(`Classification ${inputClassification} does not exist in the training data.`);
} else {

    // Normalitzem la classificació 
    const inputClassificationNumeric = classificationToNumber[inputClassification];
    const inputClassificationNormalized = (inputClassificationNumeric - xsMin) / (xsMax - xsMin);
    const inputClassificationTensor = tf.tensor2d([inputClassificationNormalized], [1, 1]);

    // Fem la predicció
    const predictedWeightNormalized = model.predict(inputClassificationTensor);
    const predictedWeight = predictedWeightNormalized.mul(ysMax - ysMin).add(ysMin);

    predictedWeight.print();
}