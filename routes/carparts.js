var express = require('express');
var router = express.Router();
var da = require('../data_access/da');


/* GET carparts listing. */
router.get('/', function(req, res, next){
  da.findCarparts(function(err, carparts){
    var userid = req.session['userid'];
    res.render('carparts/carparts', {title:'Carparts listing', carpart_list: carparts, userid: userid});
  });
});

router.post('/', function(req, res, next) {
  da.saveCarpartFromForm(req.body, function(err) {
    res.redirect('/carparts');
  });
});

router.get('/add', function(req, res){
  var userid = req.session['userid'];
  res.render('carparts/add', {title: 'Add Carpart', userid: userid});
});

router.get('/delete', function(req, res){
  da.deleteCarpart(req.query.id, function(err){
    res.redirect('/carparts');
  });
});


module.exports = router;
