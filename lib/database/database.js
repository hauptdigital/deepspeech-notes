const { MongoClient } = require('mongodb');

const collectionName = 'notes';

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

async function createIndexes() {
  const collection = await getCollection(collectionName);

  await collection.createIndex({ title: 'text', content: 'text' });
  // Clean empty notes
  await collection.createIndex({ expire: 1 }, { expireAfterSeconds: 3600 });
}

exports.initDatabase = initDatabase;
exports.closeDatabase = closeDatabase;
exports.getCollection = getCollection;
exports.createIndexes = createIndexes;
