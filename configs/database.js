const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    await mongoose.connect('mongodb+srv://gvnd:gvnd@backenddb.vzfbw.mongodb.net/NodeAPI?retryWrites=true&w=majority&appName=BackendDB');
    console.log('Terhubung ke database MongoDB');
  } catch (error) {
    console.error('Koneksi database gagal', error);
    process.exit(1);
  }
};

module.exports = connectDB;