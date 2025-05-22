const express = require('express');
const router = express.Router();

let measurements = [];
let measurementId = 1;

router.post('/', (req, res) => {
  const { customer_id, measurement_type, neck, chest, waist, hips, inseam } = req.body;

  const newMeasurement = {
    id: measurementId++,
    customer_id,
    customer_name: getCustomerName(customer_id),
    measurement_type,
    neck, chest, waist, hips, inseam
  };

  measurements.push(newMeasurement);
  res.status(201).json({ message: 'Measurement added successfully' });
});

router.get('/', (req, res) => {
  res.json(measurements);
});

router.put('/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const index = measurements.findIndex(m => m.id === id);
  if (index === -1) return res.status(404).json({ message: 'Measurement not found' });

  measurements[index] = { ...measurements[index], ...req.body };
  res.json({ message: 'Measurement updated successfully' });
});

router.delete('/:id', (req, res) => {
  const id = parseInt(req.params.id);
  measurements = measurements.filter(m => m.id !== id);
  res.json({ message: 'Measurement deleted successfully' });
});

function getCustomerName(id) {
  return `Customer #${id}`;
}

module.exports = router;
