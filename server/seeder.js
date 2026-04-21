const mongoose = require('mongoose');
const dotenv = require('dotenv');
const User = require('./models/userModel');
const Product = require('./models/productModel');
const connectDB = require('./config/db');

dotenv.config();
connectDB();

const importData = async () => {
  try {
    await User.deleteMany();
    await Product.deleteMany();

    const adminUser = await User.create({
      name: 'Admin User',
      email: 'admin@site.com',
      password: 'admin123',
      isAdmin: true,
    });

    const sampleProducts = [
      {
        name: 'Medjool Dates (Premium)',
        image: 'https://res.cloudinary.com/demo/image/upload/v1652345678/dates1.jpg',
        description: 'Large, sweet and succulent Medjool dates from the finest orchards.',
        brand: 'NuttyBliss',
        category: 'Dates',
        price: 899,
        originalPrice: 999,
        countInStock: 50,
        isFeatured: true,
      },
      {
        name: 'Premium California Almonds',
        image: 'https://res.cloudinary.com/demo/image/upload/v1652345678/almonds.jpg',
        description: 'Crunchy and nutritious California almonds, perfect for snacking.',
        brand: 'NuttyBliss',
        category: 'Nuts',
        price: 499,
        originalPrice: 599,
        countInStock: 100,
        isFeatured: true,
      },
      {
        name: 'Cashew & Nut Mix (Roasted)',
        image: 'https://res.cloudinary.com/demo/image/upload/v1652345678/mix.jpg',
        description: 'A perfect blend of roasted cashews, almonds and pistachios.',
        brand: 'NuttyBliss',
        category: 'Combos',
        price: 699,
        originalPrice: 799,
        countInStock: 30,
        isFeatured: true,
      },
      {
        name: 'Peri Peri Makhana',
        image: 'https://res.cloudinary.com/demo/image/upload/v1652345678/makhana.jpg',
        description: 'Spicy and crunchy roasted foxnuts with Peri Peri seasoning.',
        brand: 'NuttyBliss',
        category: 'Makhana',
        price: 199,
        originalPrice: 249,
        countInStock: 200,
        isFeatured: true,
      }
    ];

    await Product.insertMany(sampleProducts);

    console.log('Data Imported!');
    process.exit();
  } catch (error) {
    console.error(`${error}`);
    process.exit(1);
  }
};

importData();
