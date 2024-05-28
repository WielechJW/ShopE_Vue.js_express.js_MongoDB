const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors'); // Upewnij się, że ten import jest obecny
const app = express();
const port = 3000;

// Middleware
app.use(express.json());
app.use(cors()); // Upewnij się, że middleware cors jest używany

// MongoDB connection
mongoose.connect('mongodb://localhost:27017/free-store', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

// Define a product model
const productSchema = new mongoose.Schema({
  name: String,
  description: String,
  price: Number,
  downloadLink: String,
});

const Product = mongoose.model('Product', productSchema);

// Define routes
app.get('/products', async (req, res) => {
  const products = await Product.find();
  res.json(products);
});

app.post('/products', async (req, res) => {
  const newProduct = new Product(req.body);
  await newProduct.save();
  res.json(newProduct);
});

// Start server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
