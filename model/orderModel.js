const mongoose = require('mongoose');


const orderSchema = new mongoose.Schema({

    user: {
        type: mongoose.Types.ObjectId,
        ref: 'User',
        required: true
    },
    delivery_address:{
        type:Object,
        required:true
      },
      payment: {
        type: String,
        required: true,
        method: ['Cash on delivery']
      },
      products: [{
        productId: {
          type: mongoose.Types.ObjectId,
          ref: 'product',
          required: true
        },
        count: {
          type: Number,
          required: true
        },
        price:{
            type: Number,
            required: true
          },
          totalPrice: {
          type: Number,
          default: 0
        }
      }],
      subtotal: {
        type: Number,
        required:true
      },
      orderStatus: {
        type: String,
        default: 'pending'
      }
      ,
      orderDate: {
        type: Date,
        default: Date.now,
        required: true
      }
    })


    const Order = mongoose.model('Orders',orderSchema);
    module.exports = Order
