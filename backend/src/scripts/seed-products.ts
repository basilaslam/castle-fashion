import mongoose from 'mongoose';
import dotenv from 'dotenv';
import fs from 'fs';
import path from 'path';
import Product  from '../models/product.model'; // Adjust the import path as needed
import connectDB from '../_core/utils/db/db.util';

dotenv.config();

const seedProducts = async () => {
  try {
    await connectDB();
    console.log('Connected to MongoDB');

    // Read the JSON file
    const jsonPath = path.join(__dirname, '..', '..', 'data', 'products.json');
    const jsonData = fs.readFileSync(jsonPath, 'utf-8');
    const productData = JSON.parse(jsonData);

    // Clear existing products
    await Product.deleteMany({});
    console.log('Cleared existing products');

    // Prepare the products for insertion
    const productsToInsert = productData.map((product: any) => {
      // Convert $oid to ObjectId
      product._id = new mongoose.Types.ObjectId(product._id.$oid);
      
      // Convert date strings to Date objects
      if (product.createdAt) product.createdAt = new Date(product.createdAt.$date);
      if (product.updatedAt) product.updatedAt = new Date(product.updatedAt.$date);

      return product;
    });

    // Insert new products
    await Product.insertMany(productsToInsert);
    console.log('Products seeded successfully');

  } catch (error) {
    console.error('Error seeding products:', error);
  } finally {
    await mongoose.disconnect();
    console.log('Disconnected from MongoDB');
  }
};

seedProducts();