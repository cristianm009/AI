const express = require('express');
const cors = require('cors');
const morgan = require('morgan');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(morgan('combined'));
app.use(express.json());

// In-memory data store
let transactions = [
  {
    id: '1',
    amount: -25.50,
    category: 'Food',
    date: new Date().toISOString(),
    notes: 'Lunch at cafe'
  },
  {
    id: '2',
    amount: -120.00,
    category: 'Bills',
    date: new Date(Date.now() - 86400000).toISOString(),
    notes: 'Electric bill'
  }
];

let categories = ['Food', 'Bills', 'Entertainment', 'Transportation', 'Shopping', 'Income'];

// Routes
app.get('/api/transactions', (req, res) => {
  res.json(transactions);
});

app.post('/api/transactions', (req, res) => {
  const { amount, category, date, notes } = req.body;
  
  if (!amount || !category || !date) {
    return res.status(400).json({ error: 'Amount, category, and date are required' });
  }

  const newTransaction = {
    id: Date.now().toString(),
    amount: parseFloat(amount),
    category,
    date,
    notes: notes || ''
  };

  transactions.push(newTransaction);
  res.status(201).json(newTransaction);
});

app.get('/api/categories', (req, res) => {
  res.json(categories);
});

// Update transaction
app.put('/api/transactions/:id', (req, res) => {
  const { id } = req.params;
  const { amount, category, date, notes } = req.body;
  
  if (!amount || !category || !date) {
    return res.status(400).json({ error: 'Amount, category, and date are required' });
  }

  const transactionIndex = transactions.findIndex(t => t.id === id);
  
  if (transactionIndex === -1) {
    return res.status(404).json({ error: 'Transaction not found' });
  }

  transactions[transactionIndex] = {
    ...transactions[transactionIndex],
    amount: parseFloat(amount),
    category,
    date,
    notes: notes || ''
  };

  res.json(transactions[transactionIndex]);
});

// Delete transaction
app.delete('/api/transactions/:id', (req, res) => {
  const { id } = req.params;
  const transactionIndex = transactions.findIndex(t => t.id === id);
  
  if (transactionIndex === -1) {
    return res.status(404).json({ error: 'Transaction not found' });
  }

  const deletedTransaction = transactions.splice(transactionIndex, 1)[0];
  res.json(deletedTransaction);
});

app.get('/api/balance', (req, res) => {
  const balance = transactions.reduce((sum, transaction) => sum + transaction.amount, 0);
  res.json({ balance });
});

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'OK', timestamp: new Date().toISOString() });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
