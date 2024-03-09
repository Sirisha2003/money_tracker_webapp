const express = require('express');
const bodyParser = require('body-parser');
const connectToDatabase = require('./db'); // Adjust the path based on your project structure

const app = express();
const port = 3000;

app.use(bodyParser.json());

let db;

(async () => {
  try {
    db = await connectToDatabase();
    app.listen(port, () => {
      console.log(`Server is running on http://localhost:${port}`);
    });
  } catch (error) {
    console.error('Error starting server:', error);
  }
})();
app.post('/addExpense', async (req, res) => {
  const { category, amount, date } = req.body;

  if (!category || isNaN(amount) || amount <= 0 || !date) {
    return res.status(400).json({ error: 'Invalid input' });
  }

  const expense = { category, amount: Number(amount), date };

  try {
    const result = await db.collection('expenses').insertOne(expense);
    res.status(201).json(result.ops[0]);
  } catch (error) {
    console.error('Error adding expense to MongoDB:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});
app.get('/getExpenses', async (req, res) => {
  try {
    const expenses = await db.collection('expenses').find().toArray();
    res.json(expenses);
  } catch (error) {
    console.error('Error retrieving expenses from MongoDB:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});
