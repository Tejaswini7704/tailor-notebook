const express = require('express');
const cors = require('cors');
const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json()); // 🟢 Required for parsing JSON request bodies

// Route imports
app.use('/api/customers', require('./routes/customers'));
app.use('/api/measurements', require('./routes/measurements'));
app.use('/api/orders', require('./routes/orders'));
app.use('/api/payments', require('./routes/payment'));

// Server start
app.listen(PORT, () => {
  console.log(`✅ Server running at http://localhost:${PORT}`);
});
