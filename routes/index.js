var express = require('express');
var router = express.Router();


router.get('/', function (req, res){
  res.render(
      'index',
      {title:'hey hey', message:'yoyyooyy'}
  )})

module.exports = router;
