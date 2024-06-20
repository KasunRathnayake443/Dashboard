const express = require('express');
const { MongoClient } = require('mongodb');
const cors = require('cors');

const app = express();
const port = 5000; 


app.use(cors());


const uri = "mongodb+srv://admin123:mongodbtest123@cluster0.9hmki5e.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";


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
    if (!database) {
      throw new Error('Database connection failed');
    }
    const products = await database.collection('products').find({}).toArray();
    res.json(products);
  } catch (e) {
    console.error('Error fetching products:', e);
    res.status(500).send({ error: 'Error fetching products', details: e.message });
  }
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});



