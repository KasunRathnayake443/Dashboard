const express = require('express');
const { MongoClient, ObjectId } = require('mongodb');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const port = 5000;


app.use(cors());
app.use(bodyParser.json());


const uri = "mongodb+srv://admin123:mongodbtest123@cluster0.9hmki5e.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";


const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });


app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something went wrong!');
});

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

app.get('/products', async (req, res, next) => {
  try {
    const database = await connectToDatabase();
    const products = await database.collection('products').find({}).toArray();
    res.json(products);
  } catch (e) {
    console.error('Error fetching products:', e);
    next(e); 
  }
});

app.get('/products/:id', async (req, res, next) => {
  try {
    const database = await connectToDatabase();
    const product = await database.collection('products').findOne({ _id: ObjectId(req.params.id) });
    res.json(product);
  } catch (e) {
    console.error('Error fetching product:', e);
    next(e); 
  }
});

app.post('/products/add', async (req, res, next) => {
  try {
    const database = await connectToDatabase();
    const { name, category, quantity, price } = req.body;
    const result = await database.collection('products').insertOne({ name, category, quantity, price });
    res.json(result.ops[0]); 
  } catch (e) {
    console.error('Error adding product:', e);
    next(e); 
  }
});

app.put('/products/:id', async (req, res, next) => {
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
    next(e); 
  }
});

app.delete('/products/:id', async (req, res, next) => {
  try {
    const database = await connectToDatabase();
    const result = await database.collection('products').deleteOne({ _id: ObjectId(req.params.id) });
    res.json(result);
  } catch (e) {
    console.error('Error deleting product:', e);
    next(e); 
  }
});


app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});