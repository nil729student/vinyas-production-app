import fs from 'fs';
import * as tf from '@tensorflow/tfjs';

// Preprocesamiento de datos
function preprocessData(data) {
  // extraiem els valors unics de cada columna
  const artCodiValues = [...new Set(data.map(item => item.ART_CODI.trim()))];
  const qualityValues = [...new Set(data.map(item => item.LPA_QUALITATABR.trim()))];

  // Creem un objecte amb els valors únics de ART_CODI com a clau i l'index com a valor
  // exemple: { '001001': 0, '001002': 1, '001003': 2, ... }
  const artCodiToIndex = {};
  artCodiValues.forEach((value, index) => {
    artCodiToIndex[value] = index;
  });

  const qualityToIndex = {};
  qualityValues.forEach((value, index) => {
    qualityToIndex[value] = index;
  });

  // Creem un array amb els índexs corresponents a cada valor de ART_CODI i LPA_QUALITATABR
  // exemple: [[0, 0], [1, 1], [2, 2], ...] on el primer valor del subarray és l'index de ART_CODI i el segon de LPA_QUALITATABR
  const xs = data.map(item => [
    artCodiToIndex[item.ART_CODI.trim()],
    qualityToIndex[item.LPA_QUALITATABR.trim()]
  ]);

  const ys = data.map(item => item.PESO_ART);

  // Normalizar pesos
  const minWeight = Math.min(...ys);
  const maxWeight = Math.max(...ys);
  const ysNormalized = ys.map(y => (y - minWeight) / (maxWeight - minWeight));

  return { xs, ys: ysNormalized, minWeight, maxWeight, artCodiValues, qualityValues };
}

// Dividir los datos en entrenamiento y prueba
function splitData(xs, ys, testSize = 0.2) {
  const numTestSamples = Math.floor(xs.length * testSize);
  const indices = Array.from(Array(xs.length).keys());
  tf.util.shuffle(indices);

  const trainIndices = indices.slice(numTestSamples);
  const testIndices = indices.slice(0, numTestSamples);

  const xTrain = trainIndices.map(i => xs[i]);
  const yTrain = trainIndices.map(i => ys[i]);
  const xTest = testIndices.map(i => xs[i]);
  const yTest = testIndices.map(i => ys[i]);

  return { xTrain, yTrain, xTest, yTest };
}

// Construcción del modelo
function createModel(inputShape) {
  const model = tf.sequential(); // Crear un model secuencial
  model.add(tf.layers.dense({ inputShape, units: 10, activation: 'relu' }));
  model.add(tf.layers.dense({ units: 1 }));

  model.compile({ loss: 'meanSquaredError', optimizer: 'adam', metrics: ['mse'] });
  return model;
}

// Entrenamiento del modelo
async function trainModel(model, xs, ys) {
  const xTensors = tf.tensor2d(xs);
  const yTensors = tf.tensor2d(ys, [ys.length, 1]);

  await model.fit(xTensors, yTensors, { epochs: 100 });

  return model;
}

// Evaluación del modelo
function evaluateModel(model, xTest, yTest, minWeight, maxWeight) {
  const xTestTensor = tf.tensor2d(xTest);
  const yTestTensor = tf.tensor2d(yTest, [yTest.length, 1]);

  const result = model.evaluate(xTestTensor, yTestTensor);
  const mse = result[1].dataSync()[0];
  console.log(`Mean Squared Error: ${mse}`);

  // Desnormalizar pesos para interpretación
  const yPredTensor = model.predict(xTestTensor);
  const yPred = yPredTensor.dataSync().map(pred => pred * (maxWeight - minWeight) + minWeight);
  const yTrue = yTest.map(trueVal => trueVal * (maxWeight - minWeight) + minWeight);

  return { mse, yPred, yTrue };
}

// Predicción con el modelo entrenado para todas las clasificaciones
async function predictWithModelForAllQualities(model, inputArtCodi, data, minWeight, maxWeight) {
  const artCodiValues = [...new Set(data.map(item => item.ART_CODI.trim()))];
  const qualityValues = [...new Set(data.map(item => item.LPA_QUALITATABR.trim()))];

  const artCodiToIndex = {};
  artCodiValues.forEach((value, index) => {
    artCodiToIndex[value] = index;
  });

  const qualityToIndex = {};
  qualityValues.forEach((value, index) => {
    qualityToIndex[value] = index;
  });

  const inputArtCodiIndex = artCodiToIndex[inputArtCodi.trim()];
  const predictions = [];

  qualityValues.forEach(quality => {
    const input = [inputArtCodiIndex, qualityToIndex[quality]];
    const inputTensor = tf.tensor2d([input]);
    const predictedWeightNormalized = model.predict(inputTensor).dataSync()[0];
    const predictedWeight = predictedWeightNormalized * (maxWeight - minWeight) + minWeight;
    predictions.push({ quality, predictedWeight });
  });

  predictions.forEach(prediction => {
    console.log(`Predicted weight for quality ${prediction.quality}: ${prediction.predictedWeight}`);
  });
}

// Entrenar el modelo y hacer una predicción
async function main() {
  const data = JSON.parse(fs.readFileSync('dataAuto.json', 'utf8'));
  const { xs, ys, minWeight, maxWeight, artCodiValues, qualityValues } = preprocessData(data);
  const { xTrain, yTrain, xTest, yTest } = splitData(xs, ys);

  const model = createModel([2]);
  const trainedModel = await trainModel(model, xTrain, yTrain);

  const evaluation = evaluateModel(trainedModel, xTest, yTest, minWeight, maxWeight);
  console.log('Evaluation:', evaluation);

  const inputArtCodi = "001001"; // Código del artículo
  await predictWithModelForAllQualities(trainedModel, inputArtCodi, data, minWeight, maxWeight);
}

main();

