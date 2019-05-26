const Person = require('../models/person');
const Carpart = require('../models/carpart');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');


function connect2db() {
    mongoose.connect('mongodb://localhost:27017/shopza',
        { useNewUrlParser: true });

    mongoose.connection.once('open', function () {
        console.log("Connection to MongoDB made...");
    }).on('error', function (error) {
        console.log("Error connecting to MongoDB. Error:", error);
    });
}

function savePerson(p, cb) {
    connect2db();
    var p1 = new Person(p);
    bcrypt.hash(p1.password, 10, function(err, hash){
        p1.password = hash;
        p1.save(function(err){
            if(err) {
                console.log("Error creating user" + err)
            }
            cb(err);
        });
    });
}

function saveCarpart(p, cb) {
    connect2db();
    var p1 = new Carpart(p);
    p1.save(function(err){
        if(err) {
            console.log("Error creating Carpart" + err)
        }
        cb(err);
        });
}


function search(pattern, cb) {
    connect2db();
    Person.find({$or: [
                        {first_name: {$regex: pattern }},
                        {last_name:{$regex: pattern }}
                      ]
    }, function(err, users){
        cb(err, users);
    });
}

function deleteUser(id, cb) {
    connect2db();
    Person.deleteOne({"_id": id}, function (err, res) {
       if(err) {
           console.log("Error deleting user" + err);
       }
       cb(err);
    });
}

function deleteCarpart(id, cb) {
    connect2db();
    Carpart.deleteOne({"_id": id}, function (err, res) {
       if(err) {
           console.log("Error deleting carpart" + err);
       }
       cb(err);
    });
}

function getAllPersons(cb) {
    connect2db();
    Person.find(function(err, users) {
        if(err) {
            console.log('Error getting users' + err);
        }
        cb(err, users);
    });
}


function getAllCarparts(cb) {
    connect2db();
    Carpart.find(function(err, carparts) {
        if(err) {
            console.log('Error getting carparts' + err);
        }
        cb(err, carparts);
    });
}

function getPersonByUsername(username, cb) {
    connect2db();
    Person.findOne({'username': username}, function(err, user){
        cb(err, user);
    });
}

function getPersonById(userid, cb) {
    connect2db();
    Person.findOne({'_id': userid}, function(err, user, carpart){
        cb(err, user, carpart);
    });
}

function getCarpartById(cb) {
    connect2db();
    Carpart.findOne(function(err, carpart){
        cb(err, carpart);
    });
}




module.exports = {
    savePersonFromForm: savePerson,
    saveCarpartFromForm: saveCarpart,
    findPersons: getAllPersons,
    findCarparts: getAllCarparts,
    search: search,
    deleteUser: deleteUser,
    deleteCarpart: deleteCarpart,
    getUserByUsername: getPersonByUsername,
    getUserById: getPersonById,
    getCarpartById: getCarpartById
};