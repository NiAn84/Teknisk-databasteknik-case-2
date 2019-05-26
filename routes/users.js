var express = require('express');
var router = express.Router();
var da = require('../data_access/da');


/* GET users listing. */
router.get('/', function(req, res, next) {
  da.findPersons(function(err, users) {
    var userid = req.session['userid'];
    const n = Math.floor(Math.random() * 100 + 1);
    if(userid)
      res.render('users/users', {title:'Customer listing', user_list: users, userid: userid });
    else
      res.render('lucky', {title: 'Lucky number', number: n});
  });
});

router.post('/', function(req, res, next) {
  da.savePersonFromForm(req.body, function(err) {
    res.redirect('/users');
  });
});

router.get('/add', function(req, res){
  var userid = req.session['userid'];
  res.render('users/add', {title: 'New Customer', userid: userid});
});

router.get('/delete', function(req, res){
  da.deleteUser(req.query.id, function(err){
    res.redirect('/users');
  });
});


module.exports = router;
