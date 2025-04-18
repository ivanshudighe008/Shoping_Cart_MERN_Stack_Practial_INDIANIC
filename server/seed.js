const dotenv = require('dotenv');
const mongoose = require('mongoose');
const { faker } = require('@faker-js/faker');
dotenv.config();

// Define the Product schema
const productSchema = new mongoose.Schema({
  name: String,
  price: Number,
  image: String,
});

// Create the Product model
const Product = mongoose.model('Product', productSchema);

// Connect to MongoDB
const MONGO_URI = process.env.MONGO_URI;
mongoose.connect(MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Function to seed the database
async function seedProducts() {
  try {
    // Clear existing products
    await Product.deleteMany({});

    // Generate 10 fake products
    const products = Array.from({ length: 10 }, () => ({
      name: faker.commerce.productName(),
      price: parseFloat(faker.commerce.price()),
      image: faker.image.url({ width: 200, height: 200 }),
    }));

    // Insert the products into the database
    await Product.insertMany(products);
    console.log('Database seeded with products!');
  } catch (error) {
    console.error('Error seeding database:', error);
  } finally {
    // Close the database connection
    mongoose.connection.close();
  }
}

// Run the seeding function
seedProducts();
