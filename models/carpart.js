const mongoose = require('mongoose');

const Schema = mongoose.Schema;

// Create Carpart Schema
const CarPartSchema = new Schema({
    name: String,
    description: String,
    details: {
        manufacturer: String,
        supplier: String,
        fits: String,
        inprice: Number,
        outprice: Number
}}, { collection: 'carparts' });

// Create model
const Carpart = mongoose.model('carparts', CarPartSchema);

module.exports = Carpart;