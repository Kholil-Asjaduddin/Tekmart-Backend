const Product = require('../models/Product');

/**
 * Mengambil produk dengan categori tertentu dari database dan mengembalikannya dalam format JSON, diurutkan dari A-Z.
 * @route POST
 * @param {String} req.body.name Nama produk
 * @param {String} req.body.description Deskripsi produk
 * @param {Number} req.body.price Harga produk
 * @param {Number} req.body.stock Stok produk
 * @param {String} req.body.imageUrl URl gambar produk
 * @param {String} req.body.category Kategori produk
 * @param {Object} res.json Status code, pesan, dan data
 * @returns {void} JSON yang berisi informasi produk yang baru ditambahkan
 */
exports.addProduct = async (req, res) => {
    try {
        const { name, description, price, stock, imageUrl, category } = req.body;
        const newProduct = new Product({ name, description, price, stock, imageUrl, category });
        await newProduct
            .save()
            .then(() => {
                res.status(201).json({
                    statusCode: 201,
                    message: 'Product added successfully',
                    data: newProduct    
                })
            });
    } catch (error) {
        res.status(500).json({
            statusCode: 500,
            message: 'Failed to add new product',
            error: error.message
            });
    }
};