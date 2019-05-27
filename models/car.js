const mongoose = require('mongoose');

const Schema = mongoose.Schema;

// Create Car Schema
const CarSchema = new Schema({
    manufacturer: String,
    model: String,
    details: {
        year: Number,
        engine: String,
}}, { collection: 'cars' });

// Create model
const Car = mongoose.model('cars', CarSchema);

module.exports = Car;