'use strict';

const db = require('@arangodb').db;
const gm = require('@arangodb/general-graph');
const graphname = module.context.collectionName('survey');
if (!gm._exists(graphname)) {
  const questions = module.context.collectionName('questions');
  const products = module.context.collectionName('products');
  const answers = module.context.collectionName('answers');
  const relation = gm._relation(answers, [questions], [questions, products]);
  const g = gm._create(graphname, [relation]);
  // Insert some queries for our arango shop
  const color = g[questions].save({_key: '0', query: 'Which color do you prefer?'})._id;
  const consistency = g[questions].save({query: 'Which consistency do you like?'})._id;

  const arango = g[products].save({title: 'ArangoDB', description: `One Core. One Query Language.
    Multiple Data Models.`})._id;
  const hass = g[products].save({title: 'Hass', description: `Dozens of cultivars are grown; the 'Hass' avocado is the most common. It produces fruit year-round and accounts for 80% of cultivated avocados in the world. All 'Hass' trees are descended from a single "mother tree" raised by a mail carrier named Rudolph Hass, of La Habra Heights, California. Hass patented the productive tree in 1935. The "mother tree", of uncertain subspecies, died of root rot and was cut down in September, 2002. 'Hass' trees have medium-sized (150–250 g or 5.3–8.8 oz), ovate fruit with a black, pebbled skin. The flesh has a nutty, rich flavor with 19% oil. A hybrid Guatemalan type can withstand temperatures to −1 °C (30 °F).`})._id;
  const fuerte = g[products].save({title: 'Fuerte', description: `A Mexican/Guatemalan cross originating in Puebla, the 'Fuerte' earned its name, which means strong in Spanish, after it withstood a severe frost in California in 1913. Hardy to −3 °C (27 °F), it has medium-sized, pear-shaped fruit with a green, leathery, easy-to-peel skin. The creamy flesh of mild and rich flavor has 18% oil. The skin ripens green. Tree size is 6 by 4 m (19.7 by 13.1 ft).`})._id;

  g[answers].save({text: "I don't like fruits.", _from: color, _to: arango});
  g[answers].save({text: 'Black', _from: color, _to: hass});
  g[answers].save({text: 'Green', _from: color, _to: consistency});
  g[answers].save({text: 'Rock solid', _from: consistency, _to: arango});
  g[answers].save({text: 'Other', _from: consistency, _to: fuerte});
}
