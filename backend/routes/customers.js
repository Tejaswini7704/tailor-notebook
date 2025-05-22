const express = require('express');
const router = express.Router();

let customers = [];       // In-memory customer storage
let customerId = 1;       // ID counter

// CREATE Customer
router.post('/', (req, res) => {
  const { name, phone, email } = req.body;

  if (!name || !phone) {
    return res.status(400).json({ message: 'Name and phone are required.' });
  }

  const newCustomer = {
    id: customerId++,    // Assign unique ID
    name,
    phone,
    email
  };

  customers.push(newCustomer);
  res.status(201).json({ message: '✅ Customer added successfully', customer: newCustomer });
});

// READ all customers
router.get('/', (req, res) => {
  res.json(customers);
});

// UPDATE customer by ID
router.put('/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const updatedCustomer = req.body;

  const index = customers.findIndex(c => c.id === id);
  if (index === -1) {
    return res.status(404).json({ message: 'Customer not found' });
  }

  customers[index] = { id, ...updatedCustomer };
  res.json({ message: '✏️ Customer updated successfully', customer: customers[index] });
});

// DELETE customer by ID
router.delete('/:id', (req, res) => {
  const id = parseInt(req.params.id);

  const index = customers.findIndex(c => c.id === id);
  if (index === -1) {
    return res.status(404).json({ message: 'Customer not found' });
  }

  customers.splice(index, 1);
  res.json({ message: '🗑️ Customer deleted successfully' });
});

module.exports = router;
