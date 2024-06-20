

const express = require('express');
const { MongoClient, ObjectId } = require('mongodb');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const port = 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Connection URI
const uri = "mongodb+srv://admin123:mongodbtest123@cluster0.9hmki5e.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

// Create a new MongoClient
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

async function connectToDatabase() {
  try {
    await client.connect();
    console.log("Connected successfully to the arragon database on the products cluster");
    const database = client.db('arragon');
    return database;
  } catch (e) {
    console.error('Error connecting to database:', e);
    throw e;
  }
}

app.get('/', (req, res) => {
  res.send('Welcome to the Products API');
});

app.get('/products', async (req, res) => {
  try {
    const database = await connectToDatabase();
    const products = await database.collection('products').find({}).toArray();
    res.json(products);
  } catch (e) {
    console.error('Error fetching products:', e);
    res.status(500).send({ error: 'Error fetching products', details: e.message });
  }
});

app.get('/products/:id', async (req, res) => {
  try {
    const database = await connectToDatabase();
    const product = await database.collection('products').findOne({ _id: ObjectId(req.params.id) });
    res.json(product);
  } catch (e) {
    console.error('Error fetching product:', e);
    res.status(500).send({ error: 'Error fetching product', details: e.message });
  }
});

app.put('/products/:id', async (req, res) => {
  try {
    const database = await connectToDatabase();
    const { name, category, quantity, price } = req.body;
    const result = await database.collection('products').updateOne(
      { _id: ObjectId(req.params.id) },
      { $set: { name, category, quantity, price } }
    );
    res.json(result);
  } catch (e) {
    console.error('Error updating product:', e);
    res.status(500).send({ error: 'Error updating product', details: e.message });
  }
});

app.delete('/products/:id', async (req, res) => {
  try {
    const database = await connectToDatabase();
    const result = await database.collection('products').deleteOne({ _id: ObjectId(req.params.id) });
    res.json(result);
  } catch (e) {
    console.error('Error deleting product:', e);
    res.status(500).send({ error: 'Error deleting product', details: e.message });
  }
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});