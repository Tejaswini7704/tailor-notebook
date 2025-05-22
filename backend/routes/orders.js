const express = require('express');
const router = express.Router();

let orders = [];
let orderId = 1;

// Create Order
router.post('/', (req, res) => {
  const { customer_id, delivery_date, status } = req.body;

  const newOrder = {
    id: orderId++,
    customer_id,
    customer_name: getCustomerName(customer_id),  // assuming a simple name map
    order_date: new Date().toISOString().split('T')[0], // today's date
    delivery_date,
    status
  };

  orders.push(newOrder);
  res.status(201).json({ message: 'Order added successfully', order: newOrder });
});

// Get All Orders
router.get('/', (req, res) => {
  res.json(orders);
});

// Update Order
router.put('/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const index = orders.findIndex(o => o.id === id);
  if (index === -1) return res.status(404).json({ message: 'Order not found' });

  orders[index] = { ...orders[index], ...req.body };
  res.json({ message: 'Order updated successfully', order: orders[index] });
});

// Delete Order
router.delete('/:id', (req, res) => {
  const id = parseInt(req.params.id);
  orders = orders.filter(o => o.id !== id);
  res.json({ message: 'Order deleted successfully' });
});

// Dummy function for name lookup
function getCustomerName(id) {
  return `Customer #${id}`;
}

module.exports = router;
