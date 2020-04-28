const { MongoClient } = require('mongodb');

let client = null;
let database = null;
async function initDatabase(url, databaseName) {
  client = new MongoClient(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  await client.connect();
  database = client.db(databaseName);
}

async function closeDatabase() {
  await client.close();
}

async function getCollection(collectionName) {
  if (!database) {
    throw new Error('You have to initialize the database first');
  }
  return database.collection(collectionName);
}

exports.initDatabase = initDatabase;
exports.closeDatabase = closeDatabase;
exports.getCollection = getCollection;
