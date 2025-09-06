const mongoose = require('mongoose');
const dotenv = require('dotenv');
const bcrypt = require('bcryptjs');
const User = require('./src/models/User');
const Product = require('./src/models/Product');

dotenv.config();
async function seed() {
  await mongoose.connect(process.env.MONGO_URI);
  await User.deleteMany();
  await Product.deleteMany();
  const hashed = await bcrypt.hash('sahabg', 10);
  const admin = new User({ name: 'Abdul Qudoos', email: 'admin@gmail.com', password: hashed, role: 'admin' });
  await admin.save();
  const products = [
    { name: 'Sample Shirt', description: 'Nice shirt', price: 29.99, countInStock: 10, category: 'Clothing' },
    { name: 'Sample Shoes', description: 'Comfortable', price: 59.99, countInStock: 5, category: 'Footwear' }
  ];
  await Product.insertMany(products);
  console.log('Seeded');
  process.exit(0);
}
seed().catch(err => { console.error(err); process.exit(1); });
