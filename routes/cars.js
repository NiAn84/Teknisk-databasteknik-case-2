var express = require('express');
var router = express.Router();
var da = require('../data_access/da');


/* GET carparts listing. */
router.get('/', function(req, res, next){
    var userid = req.session['userid'];
    da.findCars(function(err, cars){
      const n = Math.floor(Math.random() * 100 + 1);
      if(userid)
        res.render('cars/cars', {title:'Car listing', car_list: cars, userid: userid});
      else
        res.render('lucky', {title: 'Lucky number', number: n});
    });
});

router.post('/', function(req, res, next) {
  da.saveCarFromForm(req.body, function(err) {
    res.redirect('/cars');
  });
});

router.get('/add', function(req, res){
  var userid = req.session['userid'];
  const n = Math.floor(Math.random() * 100 + 1);
  if(userid)
    res.render('cars/add', {title: 'Add Car', userid: userid});
  else
    res.render('lucky', {title: 'Lucky number', number: n});
});

router.get('/delete', function(req, res){
  da.deleteCar(req.query.id, function(err){
    res.redirect('/cars');
  });
});


module.exports = router;
