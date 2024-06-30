import * as tf from '@tensorflow/tfjs-node';
import {processCSV} from './preprocess.js'

const trainingData = await processCSV('./othello_dataset.csv');
