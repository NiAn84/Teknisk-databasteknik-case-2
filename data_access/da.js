const Person = require('../models/person');
const Carpart = require('../models/carpart');
const Car = require('../models/car');
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

// Person --------------------------------------------
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

function search(pattern, cb) {
    connect2db();
    Person.find({$or: [
                        {first_name: {$regex: pattern }},
                        {last_name:{$regex: pattern }},
                        {username: {$regex: pattern }}
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

function getAllPersons(cb) {
    connect2db();
    Person.find(function(err, users) {
        if(err) {
            console.log('Error getting users' + err);
        }
        cb(err, users);
    });
}

function getPersonByUsername(username, cb) {
    connect2db();
    Person.findOne({'username': username}, function(err, user){
        cb(err, user);
    });
}

function getUserById(userid, cb) {
    connect2db();
    Person.findOne({'_id': userid}, function(err, user){
        cb(err, user);
    });
}

function updateEmailOnUser(userid, email, cb) {
    connect2db();
    Person.updateOne({'_id': userid}, {$set: {'email': email}}, function(err){ 
    cb(err)
});
}

// Carpart --------------------------------------------

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

function searchpart(pattern, cb) {
    connect2db();
    Carpart.find({$or: [
                        {name: {$regex: pattern }},
                        {description:{$regex: pattern }}
                      ]
    }, function(err, carparts){
        cb(err, carparts);
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

function getAllCarparts(cb) {
    connect2db();
    Carpart.find(function(err, carparts) {
        if(err) {
            console.log('Error getting carparts' + err);
        }
        cb(err, carparts);
    });
}

// Update In or Out Price on parts
function updateInPrice(partid, inprice, cb) {
    connect2db();
    console.log(partid, inprice, "---3");
    Carpart.updateOne({'_id': partid}, {$set: {'details.inprice': inprice}}, function(err){ 
    cb(err);
});
}

function updateOutPrice(partid, outprice, cb) {
    connect2db();
    console.log(partid, outprice, "---3");
    Carpart.updateOne({'_id': partid}, {$set: {'details.outprice': outprice}}, function(err){ 
    cb(err);
});
}

// Car --------------------------------------------

function saveCar(p, cb) {
    connect2db();
    var p1 = new Car(p);
    p1.save(function(err){
        if(err) {
            console.log("Error creating Carp" + err)
        }
        cb(err);
        });
}

function searchcar(pattern, cb) {
    connect2db();
    Car.find({$or: [
                        {name: {$regex: pattern }},
                        {description:{$regex: pattern }}
                      ]
    }, function(err, cars){
        cb(err, cars);
    });
}

function deleteCar(id, cb) {
    connect2db();
    Car.deleteOne({"_id": id}, function (err, res) {
       if(err) {
           console.log("Error deleting car" + err);
       }
       cb(err);
    });
}

function getAllCars(cb) {
    connect2db();
    Car.find(function(err, cars) {
        if(err) {
            console.log('Error getting cars' + err);
        }
        cb(err, cars);
    });
}


module.exports = {
    // Person
    savePersonFromForm: savePerson,
    findPersons: getAllPersons,
    search: search,
    deleteUser: deleteUser,
    getUserByUsername: getPersonByUsername,
    getUserById: getUserById,
    updateEmailOnUser: updateEmailOnUser,
    // Carpart
    saveCarpartFromForm: saveCarpart,
    findCarparts: getAllCarparts,
    searchpart: searchpart,
    deleteCarpart: deleteCarpart,
    updateInPrice: updateInPrice,
    updateOutPrice: updateOutPrice,
    // Car
    saveCarFromForm: saveCar,
    findCars: getAllCars,
    searchcar: searchcar,
    deleteCar: deleteCar

};