const express = require('express');
const router = express.Router();

let payments = [];
let paymentId = 1;

router.post('/', (req, res) => {
  const { order_id, amount, method } = req.body;

  const newPayment = {
    id: paymentId++,
    order_id,
    amount,
    method,
    payment_date: new Date().toISOString().split('T')[0]
  };

  payments.push(newPayment);
  res.status(201).json({ message: 'Payment added successfully' });
});

router.get('/', (req, res) => {
  res.json(payments);
});

router.put('/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const index = payments.findIndex(p => p.id === id);
  if (index === -1) return res.status(404).json({ message: 'Payment not found' });

  payments[index] = { ...payments[index], ...req.body };
  res.json({ message: 'Payment updated successfully' });
});

router.delete('/:id', (req, res) => {
  const id = parseInt(req.params.id);
  payments = payments.filter(p => p.id !== id);
  res.json({ message: 'Payment deleted successfully' });
});

module.exports = router;
