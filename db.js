// db.js

const { MongoClient } = require('mongodb');

const uri = 'mongodb://localhost:27017'; // MongoDB connection URL
const dbName = 'money_tracker_webapp'; // Database name

const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

async function connectToDatabase() {
  try {
    await client.connect();
    console.log('Connected to MongoDB');
    return client.db(dbName);
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
    throw error;
  }
}

module.exports = connectToDatabase;
