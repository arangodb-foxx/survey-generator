'use strict';

const db = require("@arangodb").db;
const gm = require("@arangodb/general-graph");
const graphname = module.context.collectionName("survey");
const questions = module.context.collectionName("questions");
const products = module.context.collectionName("products");
const answers = module.context.collectionName("answers");

try {
  gm._drop(graphname, true);
} catch (e) {
}

try {
  db._drop(questions);
} catch (e) {
}

try {
  db._drop(products);
} catch (e) {
}

try {
  db._drop(answers);
} catch (e) {
}
