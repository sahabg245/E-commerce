// const mongoose = require('mongoose');

// const orderSchema = new mongoose.Schema({
//   user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
//   items: [
//     {
//       product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
//       name: String,
//       qty: Number,
//       price: Number,
//       image: String,
//     },
//   ],
//   totalPrice: { type: Number, required: true },
//   status: { type: String, default: 'Pending' },
// }, { timestamps: true });

// module.exports = mongoose.model('Order', orderSchema);


const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    items: [
      {
        product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
        name: String,
        qty: Number,
        price: Number,
        image: String,
      },
    ],
    totalPrice: { type: Number, required: true },
    status: { 
      type: String, 
      enum: ['Pending', 'Placed', 'Shipped', 'Cancelled'], 
      default: 'Pending' 
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Order', orderSchema);
