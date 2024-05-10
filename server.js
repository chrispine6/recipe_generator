// node module imports
const express = require('express');
const { MongoClient, ServerApiVersion } = require('mongodb');
const ejs = require('ejs');
const path = require('path');

// route imports
const authRoutes = require('./routes/auth.routes');
const homeRoutes = require('./routes/home.routes');

const app = express();
app.set('view engine', 'ejs');

// middleware to parse URL-encoded data
app.use(express.urlencoded({ extended: true }));

// serve static files from public
app.use(express.static(path.join(__dirname, 'public')));

// MongoDB connection script
const uri = "mongodb+srv://admin:sJTl6m5H79tugLKD@recipecluster0.gb7q7h1.mongodb.net/?retryWrites=true&w=majority&appName=recipecluster0";

console.log('MongoDB URI:', uri);

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    // Connect the client to the server (optional starting in v4.7)
    await client.connect();
    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } catch (err) {
    console.error('Error connecting to MongoDB', err);
  } finally {
    await client.close();
  }
}

run().catch(console.dir);

app.listen(3000, () => {
  console.log('server running on http://localhost:3000');
});

// api to route connection
app.use('/', authRoutes);
app.use('/home', homeRoutes);