const mongoose = require('mongoose');

const Schema = mongoose.Schema;

// Create Person Schema
const PersonSchema = new Schema({
    first_name: String,
    last_name: String,
    email: String,
    username: String,
    password: String,
    avatar: String,
    car: {
        manufacturer: String,
        model: String,
        year: Number,
        color: String,
        engine: String
    }}, 
    { collection: 'persons' }
);

// Create model
const Person = mongoose.model('person', PersonSchema);

module.exports = Person;