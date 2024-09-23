const mongoose = require('mongoose');

const productSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            unique: true
        },
        description: {
            type: String,
            required: true
        },
        price: {
            type: Number,
            required: true,
            default: 0
        },
        stock: {
            type: Number,
            required: true,
            default: 0
        },
        imageUrl: {
            type: String,
            required: true,
            unique: true
        },
        category: {
            type: String,
            required: true
        }
    },
    {
        timestamps: true
    }    
);

module.exports = mongoose.model('Product', productSchema);