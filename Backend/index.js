const express = require('express');
const { MongoClient, ObjectId } = require('mongodb');
const cors = require('cors');
const bodyParser = require('body-parser');
const multer = require('multer');
const path = require('path');

const app = express();
const port = 5000;


app.use(cors());
app.use(bodyParser.json());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));


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


const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});

const upload = multer({ storage: storage });

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

app.post('/products/add', upload.single('image'), async (req, res) => {
  try {
    const database = await connectToDatabase();
    const { name, category, quantity, price } = req.body;
    const imagePath = req.file ? `/uploads/${req.file.filename}` : null;
    const result = await database.collection('products').insertOne({ name, category, quantity, price, image: imagePath });
    res.json(result);
  } catch (e) {
    console.error('Error adding product:', e);
    res.status(500).send({ error: 'Error adding product', details: e.message });
  }
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});