var express = require('express');
var router = express.Router();
var da = require('../data_access/da');

router.post('/', function(req, res){
    da.search(req.body['search_cust'], function(err, users){
        var userid = req.session['userid'];
        da.getUserById(userid, function(err, user){
            res.render('users/users', {title:'Customer listing', user_list: users, userid: userid });
        });
    });
    da.search(req.body['search_carpart'], function(err, carparts){
        da.getCarpartById(function(err, carpart){
            res.render('carparts/carparts', {title:'Carpart listing', carpart_list: carparts });
        });
    });
});

module.exports = router;