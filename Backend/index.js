require('dotenv').config();

const express = require("express");
const { MongoClient, ObjectId } = require("mongodb");
const cors = require("cors");
const bodyParser = require("body-parser");
const multer = require("multer");
const path = require("path");


const app = express();
const port = 5000;

app.use(cors());
app.use(bodyParser.json());
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// use .env file to store endpoints - username password ekka mewa mehema danna ba,
// .env file eke dala import karanna
const uri = process.env.VITE_mongo_key;





const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

async function connectToDatabase() {
  try {
    await client.connect();
    console.log(
      "Connected successfully to the arragon database on the products cluster"
    );
    // db name === arragon ???
    const database = client.db("arragon");
    return database;
  } catch (e) {
    console.error("Error connecting to database:", e);
    throw e;
  }
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage: storage });

app.get("/", (req, res) => {
  res.send("Welcome to the Products API");
});

app.get("/products", async (req, res) => {
  try {
    const database = await connectToDatabase();
    const products = await database.collection("products").find({}).toArray();
    res.json(products);
  } catch (e) {
    console.error("Error fetching products:", e);
    res
      .status(500)
      .send({ error: "Error fetching products", details: e.message });
  }
});

app.post("/products/add", upload.single("image"), async (req, res) => {
  try {
    const database = await connectToDatabase();
    const { name, category, quantity, price } = req.body;
    const imagePath = req.file ? `/uploads/${req.file.filename}` : null;
    const result = await database
      .collection("products")
      .insertOne({ name, category, quantity, price, image: imagePath });
    res.json(result);
  } catch (e) {
    console.error("Error adding product:", e);
    res.status(500).send({ error: "Error adding product", details: e.message });
  }
});

app.get("/products/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const database = await connectToDatabase();
    const product = await database
      .collection("products")
      .findOne({ _id: new ObjectId(id) });

    if (product) {
      res.json(product);
    } else {
      res.status(404).send({ error: "Product not found" });
    }
  } catch (e) {
    console.error("Error fetching product:", e);
    res
      .status(500)
      .send({ error: "Error fetching product", details: e.message });
  }
});

app.put("/products/:id", upload.single("image"), async (req, res) => {
  try {
    const { id } = req.params;
    const { name, category, quantity, price } = req.body;
    const image = req.file ? `/uploads/${req.file.filename}` : undefined;

    const updateData = { name, category, quantity, price };
    if (image) updateData.image = image;

    const database = await connectToDatabase();
    const result = await database
      .collection("products")
      .updateOne({ _id: new ObjectId(id) }, { $set: updateData });

    if (result.matchedCount === 0) {
      return res.status(404).json({ message: "Product not found" });
    }

    const updatedProduct = await database
      .collection("products")
      .findOne({ _id: new ObjectId(id) });
    res.json(updatedProduct);
  } catch (error) {
    console.error("Error updating product:", error);
    res.status(500).json({ message: "Failed to update product" });
  }
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

app.delete("/products/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const database = await connectToDatabase();
    const result = await database
      .collection("products")
      .deleteOne({ _id: new ObjectId(id) });

    if (result.deletedCount === 0) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.json({ message: "Product deleted successfully" });
  } catch (error) {
    console.error("Error deleting product:", error);
    res.status(500).json({ message: "Failed to delete product" });
  }
});
