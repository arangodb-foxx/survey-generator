'use strict';


const db = require('@arangodb').db;
const createRouter = require('@arangodb/foxx/router');
const joi = require('joi');
const router = createRouter();
module.context.use(router);

// First just use our queries:

const questions = module.context.collectionName('questions');
const products = module.context.collectionName('products');
const answers = module.context.collectionName('answers');

const questionQuery = `
FOR question IN ${questions}
FILTER question._key == @id
LET answers = (
  FOR next, answer IN OUTBOUND question ${answers} 
    RETURN {nextId: next._key, text: answer.text, isFinal: next.query == null} 
  )
  RETURN {
    query: question.query,
    answers: answers
  }`;

const productQuery = `
FOR product IN ${products}
  FILTER product._key == @id
  RETURN product
`;

// Now define the routes:
router.get('/showQuestion/:id', (req, res) => {
  let cursor = db._query(questionQuery, {id: req.pathParams.id})
  res.json(cursor.toArray());
}).pathParam('id', joi.string().description("The _key of a question."))
  .summary(`Load a question.`)
  .description(`Fetch a question and all it's possible answers from the database, by a given question _key
    Will return 404 NOT FOUND if the question does not exist.`)
  .error(404, 'Question with the given key could not be found.');

router.get('/showProduct/:id', (req, res) => {
  let cursor = db._query(productQuery, {id: req.pathParams.id})
  res.json(cursor.toArray());
}).pathParam('id', joi.string().description("The _key of a product."))
  .summary(`Load a product.`)
  .description(`Fetch the complete description of a product from the database. 
    Will return 404 NOT FOUND if the question does not exist.`)
  .error(404, 'Product with the given key could not be found.');
