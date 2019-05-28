var express = require('express');
var router = express.Router();
var da = require('../data_access/da');


/* GET carparts listing. */
router.get('/', function(req, res, next){
  da.findCarparts(function(err, carparts){
    var userid = req.session['userid'];
    const n = Math.floor(Math.random() * 100 + 1);
    if(userid)
      res.render('carparts/carparts', {title:'Carparts listing', carpart_list: carparts, userid: userid});
    else
      res.render('lucky', {title: 'Lucky number', number: n});
  });
});

router.post('/', function(req, res, next) {
  da.saveCarpartFromForm(req.body, function(err) {
    res.redirect('/carparts');
  });
});

router.get('/add', function(req, res){
  da.findCars(function(err, cars){
    var userid = req.session['userid'];
    const n = Math.floor(Math.random() * 100 + 1);
    if(userid)
      res.render('carparts/add', {title: 'Add Carpart', car_list: cars, userid: userid});
    else
      res.render('lucky', {title: 'Lucky number', number: n});
  });
});

router.get('/delete', function(req, res){
  da.deleteCarpart(req.query.id, function(err){
    res.redirect('/carparts');
  });
});


router.post('/updateprice', function(req, res){
  var partid = req.query.partid;
  var inout = req.body.inout;
  var price = req.body.price;
  console.log(req.query.partid, req.body.inout, req.body.price, "---1");
  console.log(partid, inout, price, "---2");
  if(inout < 3)
    da.updateInPrice(partid, price, function(err){
      res.redirect('/carparts');
    });
  else
    da.updateOutPrice(partid, price, function(err){
      res.redirect('/carparts');
    });
});


module.exports = router;
